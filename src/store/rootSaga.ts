import createSagaMiddleware from "@redux-saga/core"
import { all } from "redux-saga/effects";
import { postSaga } from "./posts/posts.saga"

const sagaMiddleware = createSagaMiddleware()

function *rootSaga() {
  yield all([
    postSaga()
  ]);
}


export { sagaMiddleware, rootSaga }