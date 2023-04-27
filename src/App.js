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
import SearchedIdentity from './pages/SearchedIdentity'
import Persona from './pages/persona'
import EditProfile from './pages/EditProfile';
import CreateIdentity from './pages/CreateIdentity';
import CreatePost from './pages/CreatePost'
import PostScreen from './pages/PostScreen'
import SearchPage from './pages/SearchPage';
import ApiKeys from './constants/ApiKeys';
import authReducer from './store/reducer/auth'
import identitiesReducer from './store/reducer/identities';
import communitiesReducer from './store/reducer/community'
import postsReducer from './store/reducer/post'

const rootReducer = combineReducers({
  auth: authReducer,
  identities: identitiesReducer,
  communities: communitiesReducer,
  posts: postsReducer
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
                    <Route path='community' element={<Community />} >
                    </Route>
                    <Route path='identity' element={<Outlet />} >
                      <Route index element={<Persona />} />
                      <Route path='edit-identity' element={<EditProfile />} />
                      <Route path='create-identity' element={<CreateIdentity />} />
                      <Route path='create-post' element={<CreatePost />} />
                      <Route path='post' element={<PostScreen />} />
                    </Route>
                    <Route path='menu' element={<Blank />} >
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
