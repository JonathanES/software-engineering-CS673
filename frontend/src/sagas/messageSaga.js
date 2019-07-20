import {put, takeEvery} from 'redux-saga/effects'

function* handleMessageDemand(){
    yield put({type: "MESSAGE_DEMAND"});
}

function *handleGroupCreationDemand(){
    yield put({type: 'ADD_GROUP_DEMAND'});
}

function *handleGetGroupsDemand(action){
    yield put({type: 'GET_GROUPS_DEMAND', listOfGroups: action.listOfGroups});
}

function *handleGetGroupId(action){
    yield put({type: 'ADD_USER_TO_GROUP_DEMAND', groupId: action.groupId});
}

function *messageSaga(){
    yield takeEvery('USER_MESSAGE_DEMAND', handleMessageDemand);
    yield takeEvery('USER_ADD_GROUP_DEMAND', handleGroupCreationDemand);
    yield takeEvery('USER_GET_GROUPS_DEMAND', handleGetGroupsDemand);
    yield takeEvery('USER_ADD_USER_TO_GROUP_DEMAND', handleGetGroupId);
}

export default messageSaga;