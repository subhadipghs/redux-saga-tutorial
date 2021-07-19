import { AsyncStatus } from "../../types/store";

export type Post = {
  userId: number,
  body: string,
  title: string,
  postId: number,
}

export interface PostsStateT {
  status: AsyncStatusT,
  post: Post | null,
  error: string | null,
  fetchedAt: Date | null,
}

export type AsyncStatusT =  AsyncStatus.idle | AsyncStatus.fetching | AsyncStatus.completed | AsyncStatus.error | AsyncStatus.requested

export enum PostsAction {
  START_FETCHING = 'start-fetching',
  POST_FETCH_SUCCESS = 'post-fetch-success',
  POST_FETCH_FAILURE = 'post-fetch-failure',
  POST_FETCH_REQUESTED = 'post-fetch-requested'
}
