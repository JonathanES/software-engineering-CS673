import {put, takeEvery} from 'redux-saga/effects'

function *handleCategoryCreationDemand(){
    yield put({type: 'ADD_CATEGORY_DEMAND'});
}

 function *categorySaga(){
    yield takeEvery('USER_ADD_CATEGORY_DEMAND', handleCategoryCreationDemand);
}

export default categorySaga;