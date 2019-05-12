import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_PLAN_REQUEST,
  GET_PLAN_REQUEST,
  GET_PLANS_REQUEST,
  GET_PLANS_BY_CLIENT_ID_REQUEST,
  UPDATE_PLAN_REQUEST,
} from 'containers/PlansPage/constants';
import moment from 'moment/moment';
import {
  addPlanSuccess,
  addPlanFailure,
  getPlanRequest,
  getPlanSuccess,
  getPlanFailure,
  getPlansSuccess,
  getPlansFailure,
  updatePlanSuccess,
  updatePlanFailure,
} from './actions';

import { reduxSagaFirebase } from '../../firebase';

const firestore = new firebase.firestore(); // eslint-disable-line

function* addPlanSaga(action) {
  try {
    const {
      startDate,
      planType,
      clientId,
      createdBy,
      discount = [],
    } = action.planInfo;
    const activePlan = yield call(
      reduxSagaFirebase.firestore.getCollection,
      firestore
        .collection('plans')
        .where('clientId', '==', clientId)
        .where('endDate', '>=', moment.utc(startDate).format()),
    );
    if (activePlan.size === 0) {
      const planTypeResponse = yield call(
        reduxSagaFirebase.firestore.getDocument,
        `planTypes/${planType}`,
      );
      const plantT = planTypeResponse.data();
      if (plantT) {
        yield call(reduxSagaFirebase.firestore.addDocument, 'plans', {
          startDate: moment.utc(startDate).format(),
          planType,
          endDate: moment
            .utc(startDate)
            .add(plantT.durationDays - 1, 'days')
            .format(),
          clientId,
          discount,
          createdBy,
          updatedBy: createdBy,
          createdAt: moment()
            .utc()
            .format(),
          updatedAt: moment()
            .utc()
            .format(),
        });
        yield put(addPlanSuccess());
      } else {
        yield put(
          addPlanFailure({
            code: 'invalid/no-such-plan-type',
          }),
        );
      }
    } else {
      const plans = plansTransformer(activePlan);
      yield put(
        addPlanFailure({
          code: 'invalid/client-already-have-plan',
          endDate: plans[0].endDate,
        }),
      );
    }
  } catch (error) {
    yield put(addPlanFailure(error));
  }
}

function* getPlanSaga(action) {
  try {
    const { id } = action.planInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `plans/${id}`,
    );
    yield put(getPlanSuccess(response.data()));
  } catch (error) {
    yield put(getPlanFailure(error));
  }
}

function* getPlansByClientIdSaga(action) {
  try {
    const { clientId } = action.planInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getCollection,
      firestore
        .collection('plans')
        .where('clientId', '==', clientId)
        .orderBy('endDate'),
    );
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore.collection('planTypes'),
    );
    const planTypes = planTypesTransformer(snapshot);

    const plans = plansTransformer(response, planTypes);
    yield put(getPlanSuccess(plans));
    yield fork(
      reduxSagaFirebase.firestore.syncCollection,
      firestore
        .collection('plans')
        .where('clientId', '==', clientId)
        .orderBy('endDate'),
      {
        successActionCreator: getPlansSuccess,
        transform: snap => plansTransformer(snap, planTypes),
      },
    );
  } catch (error) {
    yield put(getPlanFailure(error));
  }
}

const planTypesTransformer = snapshot => {
  const planTypes = {};
  snapshot.forEach(planType => {
    planTypes[planType.id] = {
      ...planType.data(),
    };
  });
  return planTypes;
};

function* getPlansSaga() {
  try {
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore.collection('plans'),
    );
    const plans = plansTransformer(snapshot);
    yield put(getPlansSuccess(plans));
  } catch (error) {
    yield put(getPlansFailure(error));
  }
}

function* updatePlanSaga(action) {
  try {
    const {
      id,
      startDate,
      planType,
      discount = [],
      updatedBy,
    } = action.planInfo;
    const planTypeResponse = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `planTypes/${planType}`,
    );
    if (planTypeResponse) {
      yield call(reduxSagaFirebase.firestore.updateDocument, `plans/${id}`, {
        startDate: moment.utc(startDate).format(),
        planType,
        endDate: moment
          .utc(startDate)
          .add(planTypeResponse.durationDays - 1, 'days')
          .format(),
        discount,
        updatedBy,
        updatedAt: moment()
          .utc()
          .format(),
      });
      yield put(updatePlanSuccess());
      yield put(getPlanRequest({ id }));
    }
  } catch (error) {
    yield put(updatePlanFailure(error));
  }
}

const plansTransformer = (snapshot, planTypes = null) => {
  const plans = [];
  snapshot.forEach(plan => {
    plans.push({
      _id: plan.id,
      ...plan.data(),
    });
  });
  if (planTypes) {
    const newPlans = plans.map(plan => {
      const newPlan = plan;
      newPlan.planTypeName = planTypes[plan.planType].name;
      return newPlan;
    });
    return newPlans;
  }
  return plans;
};

// function* syncPlansSaga() {
//   yield fork(
//     reduxSagaFirebase.firestore.syncCollection,
//     firestore.collection('plans'),
//     {
//       successActionCreator: getPlansSuccess,
//       transform: plansTransformer,
//     },
//   );
// }

export default function* plansRootSaga() {
  // yield fork(syncPlansSaga);
  yield all([
    takeLatest(ADD_PLAN_REQUEST, addPlanSaga),
    takeLatest(GET_PLAN_REQUEST, getPlanSaga),
    takeLatest(GET_PLANS_REQUEST, getPlansSaga),
    takeLatest(GET_PLANS_BY_CLIENT_ID_REQUEST, getPlansByClientIdSaga),
    takeLatest(UPDATE_PLAN_REQUEST, updatePlanSaga),
  ]);
}
