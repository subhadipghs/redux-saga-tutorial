import { applyMiddleware, createStore } from "redux"
import { ReduxLogger } from "./middlewares/logger"
import { rootReducer } from "./rootReducer"
import { rootSaga, sagaMiddleware } from "./rootSaga"


const reduxLogger = ReduxLogger.getLogger('debug', true)

const store = createStore(
  rootReducer, 
  applyMiddleware(reduxLogger, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export { store }