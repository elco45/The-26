import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_PLAN_TYPE_REQUEST,
  GET_PLAN_TYPE_REQUEST,
  GET_PLAN_TYPES_REQUEST,
  UPDATE_PLAN_TYPE_REQUEST,
} from 'containers/PlanTypesPage/constants';
import * as moment from 'moment/moment';
import {
  addPlanTypeSuccess,
  addPlanTypeFailure,
  getPlanTypeRequest,
  getPlanTypeSuccess,
  getPlanTypeFailure,
  getPlanTypesSuccess,
  getPlanTypesFailure,
  updatePlanTypeSuccess,
  updatePlanTypeFailure,
} from './actions';

import { reduxSagaFirebase } from '../../firebase';

const firestore = new firebase.firestore(); // eslint-disable-line

function* addPlanTypeSaga(action) {
  try {
    const {
      name,
      description = '',
      price,
      durationDays,
      dailyFoodCount,
    } = action.planTypeInfo;
    yield call(reduxSagaFirebase.firestore.addDocument, 'planTypes', {
      name,
      description,
      price,
      durationDays,
      dailyFoodCount,
      createdAt: moment()
        .utc()
        .format(),
      updatedAt: moment()
        .utc()
        .format(),
    });
    yield put(addPlanTypeSuccess());
  } catch (error) {
    yield put(addPlanTypeFailure(error));
  }
}

function* getPlanTypeSaga(action) {
  try {
    const { id } = action.planTypeInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `planTypes/${id}`,
    );
    yield put(getPlanTypeSuccess(response.data()));
  } catch (error) {
    yield put(getPlanTypeFailure(error));
  }
}

function* getPlanTypesSaga() {
  try {
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore.collection('planTypes'),
    );
    const planTypes = planTypesTransformer(snapshot);
    yield put(getPlanTypesSuccess(planTypes));
  } catch (error) {
    yield put(getPlanTypesFailure(error));
  }
}

function* updatePlanTypeSaga(action) {
  try {
    const {
      id,
      name,
      description,
      price,
      durationDays,
      dailyFoodCount,
    } = action.planTypeInfo;
    yield call(reduxSagaFirebase.firestore.updateDocument, `planTypes/${id}`, {
      name,
      description,
      price,
      durationDays,
      dailyFoodCount,
      updatedAt: moment()
        .utc()
        .format(),
    });
    yield put(updatePlanTypeSuccess());
    yield put(getPlanTypeRequest({ id }));
  } catch (error) {
    yield put(updatePlanTypeFailure(error));
  }
}

const planTypesTransformer = snapshot => {
  const planTypes = [];
  snapshot.forEach(planType => {
    planTypes.push({
      _id: planType.id,
      ...planType.data(),
    });
  });
  return planTypes;
};

function* syncPlanTypesSaga() {
  yield fork(
    reduxSagaFirebase.firestore.syncCollection,
    firestore.collection('planTypes'),
    {
      successActionCreator: getPlanTypesSuccess,
      transform: planTypesTransformer,
    },
  );
}

export default function* planTypesRootSaga() {
  yield fork(syncPlanTypesSaga);
  yield all([
    takeLatest(ADD_PLAN_TYPE_REQUEST, addPlanTypeSaga),
    takeLatest(GET_PLAN_TYPE_REQUEST, getPlanTypeSaga),
    takeLatest(GET_PLAN_TYPES_REQUEST, getPlanTypesSaga),
    takeLatest(UPDATE_PLAN_TYPE_REQUEST, updatePlanTypeSaga),
  ]);
}
