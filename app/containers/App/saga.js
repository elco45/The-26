import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, take, takeLatest, all } from 'redux-saga/effects';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  PASS_RESET_REQUEST,
  GET_USER_REQUEST,
  GET_USERS_REQUEST,
  UPDATE_USER_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_EMAIL_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from 'containers/App/constants';
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  signUpSuccess,
  signUpFailure,
  passResetSuccess,
  passResetFailure,
  syncUser,
  sync,
  getUserSuccess,
  getUserFailure,
  getUsersSuccess,
  getUsersFailure,
  updateUserSuccess,
  updateUserFailure,
  updateProfileSuccess,
  updateProfileFailure,
  updateEmailSuccess,
  updateEmailFailure,
  updatePasswordSuccess,
  updatePasswordFailure,
} from './actions';

import { reduxSagaFirebase, reduxSagaFirebaseClone } from '../../firebase';

const firestore = new firebase.firestore(); // eslint-disable-line

function* signUpSaga(action) {
  try {
    const { email, name, roles = [], password } = action.credential;
    const response = yield call(
      reduxSagaFirebaseClone.auth.createUserWithEmailAndPassword,
      email,
      password,
    );
    const { uid, metadata } = response.user;
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`, {
      email,
      displayName: name,
      profile: {
        roles,
        createdAt: metadata.creationTime,
      },
    });
    yield call(reduxSagaFirebaseClone.auth.sendEmailVerification, {});

    yield put(signUpSuccess());
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

function* loginSaga(action) {
  try {
    const { email, password } = action.credential;

    const response = yield call(
      reduxSagaFirebase.auth.signInWithEmailAndPassword,
      email,
      password,
    );
    const { uid, emailVerified } = response.user;

    const getUser = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `users/${uid}`,
    );
    const user = getUser.data();
    if (
      emailVerified ||
      (user &&
        user.profile &&
        user.profile.roles &&
        user.profile.roles.includes('admin'))
    ) {
      yield put(loginSuccess());
      yield put(syncUser({ ...user, uid }));
    } else {
      const error = {
        code: 'auth/user-not-verified',
      };
      yield put(loginFailure(error));
    }
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* logoutSaga() {
  try {
    yield call(reduxSagaFirebase.auth.signOut);
    yield put(logoutSuccess());
  } catch (error) {
    yield put(logoutFailure(error));
  }
}

function* passResetSaga(action) {
  try {
    const { email } = action.credential;

    yield call(reduxSagaFirebase.auth.sendPasswordResetEmail, email);
    yield put(passResetSuccess());
  } catch (error) {
    yield put(passResetFailure(error));
  }
}

function* getUserSaga(action) {
  try {
    const { uid } = action.userInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `users/${uid}`,
    );

    yield put(getUserSuccess(response.data()));
  } catch (error) {
    yield put(getUserFailure(error));
  }
}

function* getUsersSaga(action) {
  try {
    const { role } = action.collection;
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore
        .collection('users')
        .where('profile.roles', 'array-contains', role),
    );
    const users = [];
    snapshot.forEach(user => {
      users.push({
        _id: user.id,
        ...user.data(),
      });
    });
    yield put(getUsersSuccess(users));
  } catch (error) {
    yield put(getUsersFailure(error));
  }
}

function* updateUserSaga(action) {
  try {
    const { uid, email, displayName, profile } = action.userInfo;
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`, {
      email,
      displayName,
      profile,
    });

    yield put(updateUserSuccess());
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* updateProfileSaga(action) {
  try {
    const { displayName, photoURL } = action.userInfo;
    yield call(reduxSagaFirebase.auth.updateProfile, {
      displayName,
      photoURL,
    });

    yield put(updateProfileSuccess());
  } catch (error) {
    yield put(updateProfileFailure(error));
  }
}

function* updateEmailSaga(action) {
  try {
    const { email } = action.userInfo;
    yield call(reduxSagaFirebase.auth.updateEmail, email);

    yield put(updateEmailSuccess());
  } catch (error) {
    yield put(updateEmailFailure(error));
  }
}

function* updatePasswordSaga(action) {
  try {
    const { password } = action.userInfo;
    yield call(reduxSagaFirebase.auth.updatePassword, password);

    yield put(updatePasswordSuccess());
  } catch (error) {
    yield put(updatePasswordFailure(error));
  }
}

function* syncUserSaga() {
  const channel = yield call(reduxSagaFirebase.auth.channel);
  while (true) {
    const { user } = yield take(channel);
    yield put(sync(true));
    if (user) {
      const getUser = yield call(
        reduxSagaFirebase.firestore.getDocument,
        `users/${user.uid}`,
      );
      const userInfo = getUser.data();
      yield put(syncUser({ ...userInfo, uid: user.uid }));
    } else {
      yield put(sync(false));
    }
  }
}

const usersTransformer = snapshot => {
  const users = [];
  snapshot.forEach(user => {
    users.push({
      _id: user.id,
      ...user.data(),
    });
  });
  return users;
};

function* syncUsersSaga() {
  yield fork(
    reduxSagaFirebase.firestore.syncCollection,
    firestore
      .collection('users')
      .where('profile.roles', 'array-contains', 'client'),
    {
      successActionCreator: getUsersSuccess,
      transform: usersTransformer,
    },
  );
}

export default function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield fork(syncUsersSaga);
  yield all([
    takeLatest(SIGNUP_REQUEST, signUpSaga),
    takeLatest(LOGIN_REQUEST, loginSaga),
    takeLatest(LOGOUT_REQUEST, logoutSaga),
    takeLatest(PASS_RESET_REQUEST, passResetSaga),
    takeLatest(GET_USER_REQUEST, getUserSaga),
    takeLatest(GET_USERS_REQUEST, getUsersSaga),
    takeLatest(UPDATE_USER_REQUEST, updateUserSaga),
    takeLatest(UPDATE_PROFILE_REQUEST, updateProfileSaga),
    takeLatest(UPDATE_EMAIL_REQUEST, updateEmailSaga),
    takeLatest(UPDATE_PASSWORD_REQUEST, updatePasswordSaga),
  ]);
}
