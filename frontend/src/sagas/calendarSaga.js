import {put, takeEvery} from 'redux-saga/effects'

 function *handleTaskOfDayDemand(action){
     yield put({type: 'DEMAND_TASK_OF_DAY', taskOfDay: action.taskOfDay});
 }

  function *calendarSaga(){
     yield takeEvery('USER_DEMAND_TASK_OF_DAY', handleTaskOfDayDemand);
 }



export default calendarSaga;