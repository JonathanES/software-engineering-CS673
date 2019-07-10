import {put, takeEvery} from 'redux-saga/effects'

function *handleLogin(action){
    yield put({type: "LOGIN", username: action.username, userId: action.userId});
    if (typeof action.username !== "undefined"){
        yield put({type: "LOGIN_DEMAND", username: action.username})
    }
}


function *userSaga(){
    yield takeEvery('USER_LOGIN', handleLogin);
}

export default userSaga;