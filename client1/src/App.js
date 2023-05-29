import React,{ useContext, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar';
import RegisterPage from './pages/registerPage/registerPage'
import AuthPage from './pages/authPage/authPage'
import MainPage from './pages/mainPage/mainPage';
import { MyContext } from './context/my-context/my-context';

const App=()=> {
  const {isReady, login}=useContext(MyContext)
  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem("nurbekaka"))
    if(data&&data.token){
      login(data.token, data.userId)
    }
  },[])

  if(isReady===1){
    return <AuthPage/>
  }
  if(isReady===2){
    return <RegisterPage/>
  }

  return (
    <div className="App">
      <Navbar/>
      <MainPage/>
 
      
    </div>
  );
}

export default App;
