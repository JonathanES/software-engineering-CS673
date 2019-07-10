import {put, takeEvery} from 'redux-saga/effects'

function* handleMessageDemand(){
    yield put({type: "MESSAGE_DEMAND"});
}

function *handleGroupCreationDemand(){
    yield put({type: 'ADD_GROUP_DEMAND'});
}


function *messageSaga(){
    yield takeEvery('USER_MESSAGE_DEMAND', handleMessageDemand);
    yield takeEvery('USER_ADD_GROUP_DEMAND', handleGroupCreationDemand);
}

export default messageSaga;