import {put, takeEvery} from 'redux-saga/effects'

 function *handleUpdateMilestoneDemand(action){
     yield put({type: 'UPDATE_MILESTONE_DEMAND', task: action.task});
 }

  function *milestoneSaga(){
     yield takeEvery('USER_UPDATE_MILESTONE_DEMAND', handleUpdateMilestoneDemand);
 }



export default milestoneSaga;
