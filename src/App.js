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
import Persona from './pages/persona'
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
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path='signup' element={<Signup />} />
                <Route path='/dashboard' element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path='started' element={<Blank />} >
                    </Route>
                    <Route path='community' element={<Community />} >
                    </Route>
                    <Route path='persona' element={<Outlet />} >
                      <Route index element={<Persona />} />
                      <Route path='edit-persona' element={<Blank />} />
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
