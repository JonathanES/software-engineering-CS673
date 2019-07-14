import {put, takeEvery, actionChannel} from 'redux-saga/effects'




function* handleProjectDemand(){
    yield put({type: "IS_PROJECT_DEMAND"});
}

// function* handleViewProjectsDemand(){
//     yield put({type: 'VIEW_PROJECT'})
function* handleViewProjectsDemand(action){
    yield put({type: 'VIEW_PROJECT', projectID: action.projectID});
}

function* handleAddProjectDemand(action){
    yield put({type: 'PROJECTFORM_DEMAND', projectForm: action.projectForm});
}

 function *projectSaga(){
    yield takeEvery('USER_IS_PROJECT_DEMAND', handleProjectDemand);
    yield takeEvery('USER_VIEW_PROJECT', handleViewProjectsDemand);
    yield takeEvery('USER_PROJECTFORM_DEMAND', handleAddProjectDemand);

}

export default projectSaga;