/**
 * @fileinfo
 *
 * This file contains a middleware for logging state changes in redux store
 * Anytime a new action is dispatch we'll log that details in the console for tracking state changes in store
 *
 */

import { Middleware } from "redux";
import { ActionType } from "../../types/store";

class ReduxLogger {
  private static instance: Middleware<{}>;

  private constructor(private level: string, private timestamp: boolean) {}

  public static getLogger(level: string, timestamp = false) {
    if (!ReduxLogger.instance)
      ReduxLogger.instance = new ReduxLogger(level, timestamp).getMiddleware();
    return ReduxLogger.instance;
  }

  private getMiddleware(): Middleware<{}> {
    return (store) => (next) => (action: ActionType) => {
      const state = store.getState();
      console.group(
        `Action: ${action.type} ${this.timestamp ? "at " + new Date() : ""}`
      );
      switch (this.level) {
        case "info":
          console.debug(state);
          break;

        case "warn":
          console.warn(state);
          break;

        case "debug":
          console.log(state);
          break;

        case "error":
          console.error(state);
          break;

        default:
          console.log(state);
      }
      console.groupEnd();
      next(action);
    };
  }
}

export { ReduxLogger };
