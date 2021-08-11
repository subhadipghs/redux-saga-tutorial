import { AsyncStatus } from "../../types/store";

export type Post = {
  userId: number;
  body: string;
  title: string;
  postId: number;
};

export interface PostsStateT {
  status: AsyncStatusT;
  number: number;
  post: Post | null;
  error: string | null;
  fetchedAt: Date | null;
}

export type AsyncStatusT =
  | AsyncStatus.idle
  | AsyncStatus.fetching
  | AsyncStatus.completed
  | AsyncStatus.error
  | AsyncStatus.requested;

export enum PostsAction {
  START_FETCHING = "start-fetching",
  POST_FETCH_SUCCESS = "post-fetch-success",
  POST_FETCH_FAILURE = "post-fetch-failure",
  POST_FETCH_REQUESTED = "post-fetch-requested",
  POST_SET_WATCH_NUMBER = "post-set-watch-number",
  POST_GET_WATCH_NUMBER = "post-get-watch-number",
}
