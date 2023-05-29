import React, {useState,useContext} from "react";
import "./registerPage.css";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";


const RegisterPage = () => {
  const {IsActive}=useContext(MyContext)

  const [form,setForm] = useState({
    email:"",
    password:"",
  })
  const changeHandler=(event)=>{
    setForm({...form, [event.target.name]:event.target.value})
    console.log("form>>", form)
  }
  const ragisterHandler=async(e)=>{
    e.preventDefault()
    try {
      const data=await services.registerService({...form},{
        headers:{
          'Content-Type': 'application/json'
        }
      })
      console.log("data>>>", data);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="container">
        <div className="auth-page">
          <h3>Регистрация</h3>
          <form className="from from-login" onSubmit={ragisterHandler}>
            <div className="row">
              <div className="input-field col s12">
                <input 
                type="email" 
                name="email" 
                onChange={changeHandler}
                className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input 
                onChange={changeHandler}
                type="password" 
                name="password" 
                className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <button type="submit" className="waves-effect waves-ligth  btn blue" >
                Регистрация
                </button>
              <span onClick={()=>IsActive(1)} className="btn-outline btn-reg">Уже есть аккаунт ?</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
