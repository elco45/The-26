import { call, fork, put, take, takeEvery } from 'redux-saga/effects';
import {
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  LOGOUT_REQUEST,
  PASS_RESET_REQUEST,
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
} from './actions';

import { reduxSagaFirebase } from '../../firebase';

function* signUpSaga(action) {
  try {
    const { email, name, roles = {}, password } = action.credential;
    const response = yield call(
      reduxSagaFirebase.auth.createUserWithEmailAndPassword,
      email,
      password,
    );

    const { uid } = response.user;
    yield call(reduxSagaFirebase.database.update, `users/${uid}`, {
      email,
      profile: {
        name,
        roles,
      },
    });
    yield call(reduxSagaFirebase.auth.sendEmailVerification, {});

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
    const { emailVerified } = response.user;
    if (emailVerified) {
      yield put(loginSuccess());
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
    const data = yield call(reduxSagaFirebase.auth.signOut);
    yield put(logoutSuccess(data));
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

function* syncUserSaga() {
  const channel = yield call(reduxSagaFirebase.auth.channel);

  while (true) {
    const { user } = yield take(channel);

    yield put(sync());
    if (user && user.emailVerified) {
      yield put(syncUser(user));
    } else {
      yield put(syncUser(null));
    }
  }
}

export default function* loginRootSaga() {
  yield fork(syncUserSaga);
  yield takeEvery(SIGNUP_REQUEST, signUpSaga);
  yield takeEvery(LOGIN_REQUEST, loginSaga);
  yield takeEvery(LOGOUT_REQUEST, logoutSaga);
  yield takeEvery(PASS_RESET_REQUEST, passResetSaga);
}
