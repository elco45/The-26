import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_PLAN_REQUEST,
  GET_PLAN_REQUEST,
  GET_PLANS_REQUEST,
  GET_PLANS_BY_CLIENT_ID_REQUEST,
  GET_ACTIVE_PLANS_BY_CLIENT_ID_REQUEST,
  UPDATE_PLAN_REQUEST,
  DELETE_PLAN_REQUEST,
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
  deletePlanSuccess,
  deletePlanFailure,
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
          startDate: moment
            .utc(startDate)
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .format(),
          planType,
          endDate: moment
            .utc(startDate)
            .add(plantT.durationDays - 1, 'days')
            .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
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

function* getActivePlansByClientIdSaga(action) {
  try {
    const { clientId } = action.planInfo;
    const activePlan = yield call(
      reduxSagaFirebase.firestore.getCollection,
      firestore
        .collection('plans')
        .where('clientId', '==', clientId)
        .where('endDate', '>=', moment.utc(new Date()).format()),
    );
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore.collection('planTypes'),
    );
    const planTypes = planTypesTransformer(snapshot);
    const plans = plansTransformer(activePlan, planTypes);
    yield put(getPlansSuccess(plans));
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
          .set({ hour: 23, minute: 59, second: 59, millisecond: 59 })
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
      newPlan.planTypeDuration = planTypes[plan.planType].durationDays;
      newPlan.planTypeFoodCount = planTypes[plan.planType].dailyFoodCount;
      return newPlan;
    });
    return newPlans;
  }
  return plans;
};

function* deletePlanSaga(action) {
  try {
    const { id } = action.planInfo;
    yield call(reduxSagaFirebase.firestore.deleteDocument, `plans/${id}`);
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getCollection,
      firestore.collection('planEvents').where('planId', '==', id),
    );
    const planEvents = [];
    snapshot.forEach(planEvent => {
      planEvents.push({ ...planEvent.data(), id: planEvent.id });
    });
    // eslint-disable-next-line func-names
    yield* planEvents.map(function*(planEvent) {
      yield call(
        reduxSagaFirebase.firestore.deleteDocument,
        `planEvents/${planEvent.id}`,
      );
    });

    yield put(deletePlanSuccess());
  } catch (error) {
    yield put(deletePlanFailure(error));
  }
}

export default function* plansRootSaga() {
  yield all([
    takeLatest(ADD_PLAN_REQUEST, addPlanSaga),
    takeLatest(GET_PLAN_REQUEST, getPlanSaga),
    takeLatest(GET_PLANS_REQUEST, getPlansSaga),
    takeLatest(GET_PLANS_BY_CLIENT_ID_REQUEST, getPlansByClientIdSaga),
    takeLatest(
      GET_ACTIVE_PLANS_BY_CLIENT_ID_REQUEST,
      getActivePlansByClientIdSaga,
    ),
    takeLatest(UPDATE_PLAN_REQUEST, updatePlanSaga),
    takeLatest(DELETE_PLAN_REQUEST, deletePlanSaga),
  ]);
}
