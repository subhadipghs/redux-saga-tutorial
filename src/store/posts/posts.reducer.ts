import { ActionType, AsyncStatus } from "../../types/store";
import { PostsAction, PostsStateT } from "./posts.types";

const postInitialState: PostsStateT = {
  status: AsyncStatus.idle,
  number: 0,
  post: null,
  error: "",
  fetchedAt: null,
};

const postsReducer = (
  state: PostsStateT = postInitialState,
  action: ActionType<string>
) => {
  switch (action.type) {
    /** When user request */
    case PostsAction.POST_FETCH_REQUESTED: {
      return {
        ...state,
        status: AsyncStatus.requested,
      };
    }

    /** Start fetching the posts */
    case PostsAction.START_FETCHING: {
      return {
        ...state,
        status: AsyncStatus.fetching,
      };
    }

    /** fetching complete */
    case PostsAction.POST_FETCH_SUCCESS: {
      return {
        ...state,
        post: action.payload.posts,
        status: AsyncStatus.completed,
        fetchedAt: new Date().toLocaleDateString(),
      };
    }

    /** posts fetch failure */
    case PostsAction.POST_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.message,
        status: AsyncStatus.error,
      };
    }

    case PostsAction.POST_SET_WATCH_NUMBER: {
      return {
        ...state,
        number: action.payload.number,
        status: AsyncStatus.completed,
      };
    }

    case PostsAction.POST_GET_WATCH_NUMBER: {
      return {
        ...state,
        status: AsyncStatus.fetching,
      };
    }

    default: {
      return state;
    }
  }
};

export { postsReducer };
