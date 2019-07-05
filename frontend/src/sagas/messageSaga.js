import {put, takeEvery} from 'redux-saga/effects'

function* handleMessageDemand(){
    yield put({type: "MESSAGE_DEMAND"});
}


function *messageSaga(){
    yield takeEvery('USER_MESSAGE_DEMAND', handleMessageDemand);
}

export default messageSaga;