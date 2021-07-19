import { ActionType, AsyncStatus } from "../../types/store"
import { PostsAction, PostsStateT } from "./posts.types"


const postInitialState : PostsStateT = {
  status: AsyncStatus.idle,
  post: null,
  error: '',
  fetchedAt: null
}


const postsReducer = (state : PostsStateT = postInitialState, action: ActionType<string>) => {
  switch(action.type) {

    /** When user request */
    case PostsAction.POST_FETCH_REQUESTED: {
      return {
        ...state,
        status: AsyncStatus.requested
      }
    }
    
    /** Start fetching the posts */
    case PostsAction.START_FETCHING: {
      return {
        ...state,
        status: AsyncStatus.fetching
      }
    }

    /** fetching complete */
    case PostsAction.POST_FETCH_SUCCESS: {
      return {
        ...state,
        post: action.payload.posts,
        status: AsyncStatus.completed,
        fetchedAt: new Date().toLocaleDateString()
      }
    }

    /** posts fetch failure */
    case PostsAction.POST_FETCH_FAILURE: {
      return {
        ...state,
        error: action.payload.message,
        status: AsyncStatus.error
      }
    }

    default: {
      return state
    }
  }
}



export { postsReducer }