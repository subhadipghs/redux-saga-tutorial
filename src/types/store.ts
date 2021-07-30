import { RootStateOrAny } from "react-redux";
import { Middleware } from "redux";
import { SagaMiddleware } from "redux-saga";
import { AllEffect, ForkEffect } from "redux-saga/effects";
import { store } from "../store";


export type RootState = ReturnType<typeof store.getState>

export type StoreConfig = {
  reducers: RootStateOrAny,
  sagaMiddleware: SagaMiddleware<object>,
  hotReloadDir?: string,
  otherMiddlewares: Middleware[];
  rootSaga: () => Generator<AllEffect<Generator<ForkEffect<never>, void, unknown>>, void, unknown>,
};

export type ActionType<T = any> = {
  type: T,
  payload: Record<string, any>
}


export enum AsyncStatus {
  idle = 'idle',
  error = 'error',
  completed = 'completed',
  fetching = 'fetching',
  requested = 'requested'
}

