import axios, { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import { AsyncStatus } from "../../types/store"
import { setPosts, setPostsError, setStatus } from "./posts.action"
import { Post, PostsAction } from "./posts.types"


function* fetchPost() {
  try {
    yield put(setStatus(AsyncStatus.fetching))
    const post : AxiosResponse = yield call(axios.get, 'https://jsonplaceholder.typicode.com/posts/1')

    if (!post.data) {
      yield put(setPostsError("Something went wrong"))
    }
    yield put(setPosts(post.data as Post))
    
  } catch (error) {
    yield put(setPostsError("Request failed"))
  } 
}


function* postSaga() {
  yield takeLatest(PostsAction.POST_FETCH_REQUESTED, fetchPost)
}


export { postSaga }