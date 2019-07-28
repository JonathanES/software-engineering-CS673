import {put, takeEvery} from 'redux-saga/effects'

 function *handleTaskOfDayDemand(action){
     yield put({type: 'DEMAND_TASK_OF_DAY', taskOfDay: action.taskOfDay, selectedDate: action.selectedDate});
 }

function *handleCalendarProjectDemand(action){
    yield put({type: 'DEMAND_VIEW_CALENDAR_PROJECT', selectedDate: action.selectedDate});
}

function *handleCalendarCategoriesDemand(){
    yield put({type: 'DEMAND_VIEW_CALENDAR_CATEGORIES'});
}

  function *calendarSaga(){
     yield takeEvery('USER_DEMAND_TASK_OF_DAY', handleTaskOfDayDemand);
     yield takeEvery('USER_DEMAND_VIEW_CALENDAR_PROJECT', handleCalendarProjectDemand);
     yield takeEvery('USER_DEMAND_VIEW_CALENDAR_CATEGORIES', handleCalendarCategoriesDemand);
 }



export default calendarSaga;