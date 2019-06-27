/* eslint-disable indent */
import firebase from 'firebase/app';
import '@firebase/firestore';
import { call, fork, put, takeLatest, all } from 'redux-saga/effects';
import {
  ADD_PLAN_EVENT_REQUEST,
  GET_PLAN_EVENT_REQUEST,
  GET_PLAN_EVENTS_REQUEST,
  GET_PLAN_EVENTS_BY_CLIENT_ID_REQUEST,
  DELETE_PLAN_EVENT_REQUEST,
} from 'containers/PlanEventsPage/constants';
import Moment from 'moment/moment';
import { extendMoment } from 'moment-range';

import {
  addPlanEventSuccess,
  addPlanEventFailure,
  getPlanEventSuccess,
  getPlanEventFailure,
  getPlanEventsSuccess,
  getPlanEventsFailure,
  deletePlanEventSuccess,
  deletePlanEventFailure,
} from './actions';

import { reduxSagaFirebase } from '../../firebase';
const moment = extendMoment(Moment);

const firestore = new firebase.firestore(); // eslint-disable-line

function* addPlanEventSaga(action) {
  try {
    const {
      planId,
      adminId,
      start,
      manuallyAdded = false,
    } = action.planEventInfo;
    const response = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `plans/${planId}`,
    );
    const activePlan = response.data();
    if (activePlan && activePlan.startDate) {
      const planEventsSnap = yield call(
        reduxSagaFirebase.firestore.getCollection,
        firestore
          .collection('planEvents')
          .where(
            'start',
            '>=',
            !manuallyAdded
              ? moment()
                  .startOf('day')
                  .utc()
                  .format()
              : moment
                  .utc(start)
                  .startOf('day')
                  .format(),
          )
          .where(
            'start',
            '<=',
            !manuallyAdded
              ? moment()
                  .endOf('day')
                  .utc()
                  .format()
              : moment
                  .utc(start)
                  .endOf('day')
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
        const startDate = start && moment.utc(start);
        const now = moment().utc();
        yield call(reduxSagaFirebase.firestore.addDocument, 'planEvents', {
          planId,
          clientId: activePlan.clientId,
          adminId,
          title: `Meal #${todaysPlanEvents.length + 1}`,
          start: startDate ? startDate.format() : now.format(),
          end: startDate
            ? startDate.add(15, 'minutes').format()
            : now.add(15, 'minutes').format(),
          createdAt: now.format(),
          manuallyAdded,
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
    const { clientId, startDate, endDate } = action.planEventInfo;
    const start = moment(startDate)
      .utc()
      .format();
    const end = moment(endDate)
      .utc()
      .format();

    const user = yield call(
      reduxSagaFirebase.firestore.getDocument,
      `users/${clientId}`,
    );
    if (user.data()) {
      const users = yield call(
        reduxSagaFirebase.firestore.getCollection,
        firestore
          .collection('users')
          .where('profile.roles', 'array-contains', 'admin'),
      );
      const admins = usersTransformer(users);
      const response = yield call(
        reduxSagaFirebase.firestore.getCollection,
        firestore.collection('planEvents').where('clientId', '==', clientId),
      );
      const planEvents = transformerFilter(response, start, end, admins);
      yield put(getPlanEventSuccess(planEvents));

      yield fork(
        reduxSagaFirebase.firestore.syncCollection,
        firestore.collection('planEvents').where('clientId', '==', clientId),
        {
          successActionCreator: getPlanEventsSuccess,
          transform: snap => transformerFilter(snap, start, end, admins),
        },
      );
    } else {
      const err = {
        error: 'Invalid user',
      };
      yield put(getPlanEventsFailure(err));
    }
  } catch (error) {
    yield put(getPlanEventsFailure(error));
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

function* deletePlanEventSaga(action) {
  try {
    const { id } = action.planEventInfo;
    yield call(reduxSagaFirebase.firestore.deleteDocument, `planEvents/${id}`);
    yield put(deletePlanEventSuccess());
  } catch (error) {
    yield put(deletePlanEventFailure(error));
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

const transformerFilter = (snapshot, start, end, admins) => {
  const response = [];
  snapshot.forEach(snap => {
    const event = snap.data();
    if (event && moment(event.start).range(start, end)) {
      // eslint-disable-next-line no-underscore-dangle
      const admin = admins.find(user => user.id === snap.adminId);
      response.push({
        id: snap.id,
        title: event.title,
        start: moment
          .utc(event.start)
          .local()
          .format(),
        end: moment
          .utc(event.end)
          .local()
          .format(),
        manuallyAdded: event.manuallyAdded,
        createdAt: new Date(event.createdAt),
        addedBy: admin && admin.displayName,
      });
    }
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
    takeLatest(DELETE_PLAN_EVENT_REQUEST, deletePlanEventSaga),
  ]);
}
