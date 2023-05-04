import './App.scss';
import 'boxicons/css/boxicons.min.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Blank from './pages/Blank';
import { initializeApp } from "firebase/app";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import Login from './pages/login'
import Signup from './pages/signup';
import Home from './pages/home'
import Community from './pages/community'
import CommunityPage from './pages/CommunityPage';
import CreateCommunity from './pages/CreateCommunity';
import CreateCommunityPost from './pages/CreateCommunityPost'
import SearchedIdentity from './pages/SearchedIdentity'
import Identity from './pages/Identity'
import EditProfile from './pages/EditIdentity';
import CreateIdentity from './pages/CreateIdentity';
import CreatePost from './pages/CreatePost'
import PostScreen from './pages/PostScreen'
import SearchPage from './pages/SearchPage';
import Showcase from './pages/ShowCase';
import NotificationPage from './pages/Notification';
import ApiKeys from './constants/ApiKeys';
import authReducer from './store/reducer/auth'
import identitiesReducer from './store/reducer/identities';
import communitiesReducer from './store/reducer/community'
import relationshipsReducer from './store/reducer/relationships'
import postsReducer from './store/reducer/post'
import homeReducer from './store/reducer/home'

const rootReducer = combineReducers({
  auth: authReducer,
  identities: identitiesReducer,
  relationships: relationshipsReducer,
  communities: communitiesReducer,
  posts: postsReducer,
  home: homeReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const AppNavigator = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='/dashboard' element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='search' element={<Outlet />} >
                      <Route index element={<SearchPage />} />
                      <Route path='searched-user' element={<SearchedIdentity />} />
                    </Route>
                    <Route path='community' element={<Outlet />} >
                      <Route index element={<Community />} />
                      <Route path="community-screen" element={<CommunityPage />} />
                      <Route path="create-community" element={<CreateCommunity />} />
                      <Route path='create-community-post' element={<CreateCommunityPost />} />
                    </Route>
                    <Route path='identity' element={<Outlet />} >
                      <Route index element={<Identity />} />
                      <Route path='edit-identity' element={<EditProfile />} />
                      <Route path='create-identity' element={<CreateIdentity />} />
                      <Route path='create-post' element={<CreatePost />} />
                      <Route path='showcase' element={<Showcase />} />
                      <Route path='post' element={<PostScreen />} />
                    </Route>
                    <Route path='notifications' element={<Outlet />} >
                      <Route index element={<NotificationPage />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

function App() {
  // Initialize Firebase
  initializeApp(ApiKeys.FirebaseConfig)
  return (
     <Provider store={store}>
       <AppNavigator />
     </Provider>
  );
 }

 
export default App;
