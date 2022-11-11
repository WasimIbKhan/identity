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
        <Route index element={<Login />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path={'home-tab'} element={<Outlet />}>
            <Route index element={<Home />} />
            <Route path="community" element={Community} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );

};

const Dashboard = () => {
  return(
    <div>
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
