import { RootStateOrAny } from "react-redux";
import { store } from "../store";


export type StoreConfig = {
  reducers: RootStateOrAny,
  middlewares: any[];
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


export type RootState = ReturnType<typeof store.getState>