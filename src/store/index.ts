import { applyMiddleware, compose, createStore, Store } from "redux";
import { isBrowserEnv, isProductionEnv } from "../helpers/utils";
import { StoreConfig } from "../types/store";
import { ReduxLogger } from "./middlewares/logger";
import { rootReducer } from "./rootReducer";
import { rootSaga, sagaMiddleware } from "./rootSaga";

/**
 * Create and configure redux store
 * @param args - configuration
 * @param args.reducers - root reducer for the app
 * @param args.sagaMiddleware - saga middleware
 * @param args.hotReloadDir - component to be hot reloaded for this case path of the directory that contains the root reducer
 * @param args.otherMiddlewares - other middlewares
 * @returns store
 */
const configureStore = (args: StoreConfig) : Store => {
  const { reducers, sagaMiddleware, hotReloadDir, otherMiddlewares } = args;

  // integrate redux dev-tools extension
  const composedEnhancer =
    (isBrowserEnv && !isProductionEnv
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null)
      ?? compose;

  const store = createStore(
    reducers,
    composedEnhancer(applyMiddleware(sagaMiddleware, ...otherMiddlewares))
  );

  sagaMiddleware.run(rootSaga);

  // hot reloading. webpack provide `module` object which is only accessible in dev
  if (!isProductionEnv && !!(module as any).hot && hotReloadDir) {
    (module as any).hot.accept(hotReloadDir);
  }

  return store;
};

const reduxLogger = ReduxLogger.getLogger("debug", true);
const store = configureStore({
  reducers: rootReducer,
  rootSaga,
  sagaMiddleware,
  otherMiddlewares: [reduxLogger],
  hotReloadDir: "./rootReducer",
});

export { configureStore, store };
