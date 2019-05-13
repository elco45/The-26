import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_PLAN_EVENT_REQUEST,
  GET_PLAN_EVENT_REQUEST,
  GET_PLAN_EVENTS_REQUEST,
  GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST,
} from 'containers/PlanEventsPage/constants';
import moment from 'moment/moment';
import {
  addPlanEventSuccess,
  addPlanEventFailure,
  getPlanEventSuccess,
  getPlanEventFailure,
  getPlanEventsSuccess,
  getPlanEventsFailure,
} from './actions';

import { reduxSagaFirebase } from '../../firebase';

const firestore = new firebase.firestore(); // eslint-disable-line

function* addPlanEventSaga(action) {
  try {
    const { planId, adminId } = action.planEventInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `plans/${planId}`,
    );
    const activePlan = response.data();

    if (activePlan && activePlan.startDate) {
      const planEventsSnap = yield call(
        reduxSagaFirebase.firestore.getCollection,
        firestore.collection('planEvents').where(
          'start',
          '>=',
          moment()
            .utc()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .format(),
        ),
      );
      const todaysPlanEvents = transformer(planEventsSnap);

      const planTypeSnap = yield call(
        reduxSagaFirebase.firestore.getDocument,
        `planTypes/${activePlan.planType}`,
      );
      const planType = planTypeSnap.data();

      if (todaysPlanEvents.length < planType.dailyFoodCount) {
        yield call(reduxSagaFirebase.firestore.addDocument, 'planEvents', {
          planId,
          clientId: activePlan.clientId,
          adminId,
          start: moment()
            .utc()
            .format(),
          end: moment()
            .utc()
            .add(15, 'minutes')
            .format(),
          updatedAt: moment()
            .utc()
            .format(),
        });
        yield put(addPlanEventSuccess({ clientId: activePlan.clientId }));
      } else {
        yield put(
          addPlanEventFailure({
            code: 'invalid/daily-limit-exceed',
          }),
        );
      }
    } else {
      yield put(
        addPlanEventFailure({
          code: 'invalid/no-such-plan',
        }),
      );
    }
  } catch (error) {
    yield put(addPlanEventFailure(error));
  }
}

function* getPlanEventSaga(action) {
  try {
    const { id } = action.planEventInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `planEvents/${id}`,
    );
    yield put(getPlanEventSuccess(response.data()));
  } catch (error) {
    yield put(getPlanEventFailure(error));
  }
}

function* getPlanEventsByClientIdSaga(action) {
  try {
    const { clientId, start, end } = action.planEventInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getCollection,
      firestore
        .collection('planEvents')
        .where('clientId', '==', clientId)
        .where('start', '>=', start)
        .where('end', '<=', end),
    );
    const planEvents = transformer(response);
    yield put(getPlanEventSuccess(planEvents));

    yield fork(
      reduxSagaFirebase.firestore.syncCollection,
      firestore
        .collection('planEvents')
        .where('clientId', '==', clientId)
        .where('start', '>=', start)
        .where('end', '<=', end),
      {
        successActionCreator: getPlanEventsSuccess,
        transform: transformer,
      },
    );
  } catch (error) {
    yield put(getPlanEventFailure(error));
  }
}

function* getPlanEventsSaga() {
  try {
    const snapshot = yield call(
      reduxSagaFirebase.firestore.getDocument,
      firestore.collection('planEvents'),
    );
    const planEvents = transformer(snapshot);
    yield put(getPlanEventsSuccess(planEvents));
  } catch (error) {
    yield put(getPlanEventsFailure(error));
  }
}

const transformer = snapshot => {
  const response = [];
  snapshot.forEach(snap => {
    response.push({
      _id: snap.id,
      ...snap.data(),
    });
  });
  return response;
};

export default function* planEventsRootSaga() {
  yield all([
    takeLatest(ADD_PLAN_EVENT_REQUEST, addPlanEventSaga),
    takeLatest(GET_PLAN_EVENT_REQUEST, getPlanEventSaga),
    takeLatest(GET_PLAN_EVENTS_REQUEST, getPlanEventsSaga),
    takeLatest(
      GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST,
      getPlanEventsByClientIdSaga,
    ),
  ]);
}
