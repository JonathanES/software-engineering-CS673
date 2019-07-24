import {put, takeEvery} from 'redux-saga/effects'

 function *handleUpdateTaskDemand(action){
     yield put({type: 'UPDATE_TASK_DEMAND', task: action.task});
 }

  function *taskSaga(){
     yield takeEvery('USER_UPDATE_TASK_DEMAND', handleUpdateTaskDemand);
 }



export default taskSaga;