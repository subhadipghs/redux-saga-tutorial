import axios, { AxiosResponse } from "axios";
import { END, eventChannel } from "redux-saga";
import { call, put, select, take, takeLatest } from "redux-saga/effects";
import { AsyncStatus, RootState } from "../../types/store";
import { setPosts, setPostsError, setStatus } from "./posts.action";
import { postsSelector } from "./posts.selector";
import { Post, PostsAction, PostsStateT } from "./posts.types";

function* fetchPost() {
  try {
    yield put(setStatus(AsyncStatus.fetching));
    const post: AxiosResponse = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts/1"
    );

    if (!post.data) {
      yield put(setPostsError("Something went wrong"));
    }
    yield put(setPosts(post.data as Post));
  } catch (error) {
    yield put(setPostsError("Request failed"));
  }
}

function randomNumberGenerator(previous: number = 0) {
  return eventChannel((emitter) => {
    const id = setInterval(() => {
      try {
        // emit a random number
        const rand = Math.random();
        console.log(`Emitting Random Number ✅ ${rand} ${previous}`);
        if (rand < previous) {
          throw new Error(`Sorry only increasing number is allowed`);
        }
        emitter(rand);
      } catch (error) {
        // close the channel
        console.log(`🔐 Closing the channel ${error.message}`);
        emitter(END);
      }
    }, 1000);
    // unsubscribe
    return () => {
      emitter(END);
      clearInterval(id);
    };
  });
}

function* watchRandomNumber() {
  const { number }: PostsStateT = yield select(postsSelector);
  const chann: number = yield call(randomNumberGenerator, number);
  try {
    while (true) {
      const rand: number = yield take(chann);
      yield put({
        type: PostsAction.POST_SET_WATCH_NUMBER,
        payload: { number: rand },
      });
    }
  } catch (error) {
    console.log(`🔼 error watching random number ${error.message}`);
  } finally {
    console.log(`🔚 Watch End`);
  }
}

function* postSaga() {
  yield takeLatest(PostsAction.POST_FETCH_REQUESTED, fetchPost);
}

function* randSaga() {
  yield takeLatest(PostsAction.POST_GET_WATCH_NUMBER, watchRandomNumber);
}

export { postSaga, randSaga };
