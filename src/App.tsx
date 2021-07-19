import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { PostsAction } from './store/posts/posts.types';
import { RootState } from './types/store';

function App() {

  const dispatch = useDispatch()

  const { post, status } = useSelector((state : RootState) => state.posts)

  const getPost = () => {
    dispatch({ type: PostsAction.POST_FETCH_REQUESTED })
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <button onClick={getPost}><code>Request Post</code></button>
        </p>
        <p>{status}</p>
        <p>{JSON.stringify(post, null, 2)}</p>
      </header> 
    </div>
  );
}

export default App;
