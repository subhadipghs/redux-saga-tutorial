import { AsyncStatusT, Post, PostsAction } from "./posts.types";

export const setStatus = (status: AsyncStatusT) => ({
  type: PostsAction.START_FETCHING,
  payload: {
    status
  }
})


export const setPosts = (posts: Post) => ({
  type: PostsAction.POST_FETCH_SUCCESS,
  payload: {
    posts
  }
})


export const setPostsError = (message: string) => ({
  type: PostsAction.POST_FETCH_FAILURE,
  payload: {
    message
  }
})