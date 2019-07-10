import {put, takeEvery, actionChannel} from 'redux-saga/effects'




function* handleProjectDemand(){
    yield put({type: "IS_PROJECT_DEMAND"});
}

function* handleViewProjectsDemand(){
    yield put({type: 'VIEW_PROJECT'})
}

 function *projectSaga(){
    yield takeEvery('USER_IS_PROJECT_DEMAND', handleProjectDemand);
    yield takeEvery('USER_VIEW_PROJECT', handleViewProjectsDemand);

}

export default projectSaga;