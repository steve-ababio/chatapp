import React from 'react';
import { BrowserRouter,Route} from 'react-router-dom';
import Homepage from './pages/home/home';
import Signin from './pages/auth/signin/signin';
import Signup from './pages/auth/signup/signup';
import './App.css';
import Textchat from './pages/chat/textchat';
import ProtectedRoute from './components/protectedroute/protectedroute';
import AuthContext from './context/maincontext';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter> 
        <Route path="/signup" component={Signup}/>
        <Route component={Homepage} exact path="/"/>
        <Route path = "/login" component={Signin}/>
        <AuthContext>
           <ProtectedRoute path="/dashboard" component={Textchat} />
        </AuthContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
