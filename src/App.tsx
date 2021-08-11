import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PostsAction } from "./store/posts/posts.types";
import { RootState } from "./types/store";

function App() {
  const dispatch = useDispatch();

  const { post, status, number } = useSelector(
    (state: RootState) => state.posts,
    shallowEqual
  );

  const getPost = () => {
    dispatch({ type: PostsAction.POST_FETCH_REQUESTED });
  };

  useEffect(() => {
    dispatch({ type: PostsAction.POST_GET_WATCH_NUMBER });
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={getPost}>
            <code>Request Post</code>
          </button>
        </p>
        <p>{status}</p>
        <p>{JSON.stringify(post, null, 2)}</p>
        <p>{number ?? "Not available"}</p>
      </header>
    </div>
  );
}

export default App;
