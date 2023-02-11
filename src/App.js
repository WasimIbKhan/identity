import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom';
import './App.css';
import { initializeApp } from "firebase/app";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReduxThunk from "redux-thunk";
import Login from './Pages/login'
import Home from './Pages/home'
import Community from './Pages/community'
import NavigationTab from './components/NavigationTab'
import ApiKeys from './constants/ApiKeys';
import authReducer from './store/reducer/auth'
import identitiesReducer from './store/reducer/identities';
import communitiesReducer from './store/reducer/community'
import AppLayout from './components/layout/AppLayout';
import 'boxicons/css/boxicons.min.css';

const rootReducer = combineReducers({
  auth: authReducer,
  indentities: identitiesReducer,
  communities: communitiesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const AppNavigator = () => {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="community" element={Community} />
          </Route>
      </Routes>
    </Router>
  );

};

const Dashboard = () => {
  return(
    <div className='header_container'>
      <NavigationTab/>
      <Outlet />
    </div>
  )
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
