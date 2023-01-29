import * as React from 'react';
import { useEffect} from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import store from "./Store";
import Header from './component/Header/Header';
import Home from "./component/Home/Home";
import Profile from "./component/Layout/Profile";
import Comments from "./component/Layout/Comments";
import { useSelector } from "react-redux";
import { loadUser } from "./actions/userAction"; 
import Login from "./component/User/Login";
import Register from "./component/User/Register";
import CreatePost from "./component/Layout/CreatePost";
import CreatePostMobile from "./component/Layout/CreatePostMobile";
import Dashboard from "./component/Admin/Dashboard";
import PostList from "./component/Admin/PostList";
import UserList from "./component/Admin/UserList";
import { getTrends, saveScheduledPosts } from "./actions/postAction";
import Trend from "./component/Trend/Trend";
import Update from "./component/Update/Update";
import dayjs from 'dayjs';
import AlarmIcon from '@mui/icons-material/Alarm';
import SnoozeIcon from '@mui/icons-material/Snooze';
import TextField from '@mui/material/TextField';
import ClockIcon from '@mui/icons-material/AccessTime';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import Stack from '@mui/material/Stack';

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka", "Lato"],
      },
    });

    store.dispatch(loadUser());
    store.dispatch(getTrends());
    store.dispatch(saveScheduledPosts());
  },[]);

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/updates" element={<Update/>} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/comment/:id" element={<Comments/>} />
        <Route path="/createPost" element={<CreatePost/>}/>
        <Route path="/trendPost" element={<Trend/>}/>
        <Route path="/createPostMobile" element={<CreatePostMobile/>}/>
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/postList" element={<PostList/>}/>
        <Route path="/admin/userList" element={<UserList/>}/>
      </Routes>
    </Router>
  );
}

export default App;

// import React, { Component } from "react";
// import "./App.css";

// const reduceOne = (prevState, groupName, otherGroupName) => {
//   prevState[groupName].wasClicked
//     ? prevState[groupName].count = prevState[groupName].count - 1
//     : prevState[groupName].count = prevState[groupName].count + 1;
//   prevState[groupName].wasClicked = !prevState[groupName].wasClicked;
//   if (prevState[otherGroupName].wasClicked) {
//     prevState[otherGroupName].count = prevState[otherGroupName].count - 1;
//     prevState[otherGroupName].wasClicked = false;
//   }
//   return prevState;
// };

// const reducer = action =>
//   (prevState, props) =>
//     action.type === "TOGGLE_LIKE"
//       ? reduceOne(prevState, "like", "dislike")
//       : reduceOne(prevState, "dislike", "like");

// class App extends Component {
//   state = {
//     like: {
//       count: 0,
//       wasClicked: false,
//     },
//     dislike: {
//       count: 0,
//       wasClicked: false,
//     },
//   };

//   toggleLike = () => this.setState(reducer({ type: "TOGGLE_LIKE" }));
//   toggleDislike = () => this.setState(reducer({ type: "TOGGLE_DISLIKE" }));

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <h1 className="App-title">Like - Dislike</h1>
//         </header>
//         <p className="App-intro">
//           <button className="like-button" onClick={this.toggleLike}>
//             Like | {this.state.like.count}
//           </button>
//           <button className="dislike-button" onClick={this.toggleDislike}>
//             Dislike | {this.state.dislike.count}
//           </button>
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
