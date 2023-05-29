import React, { useState, useContext } from "react";
import services from "../../services/services";
import { MyContext } from "../../context/my-context/my-context";

const AuthPage = () => {
  const { login, IsActive } = useContext(MyContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    IsActive(1)
    try {
      const data = await services.loginService({ ...form });
      console.log("data>>>", data);
      login(data.data.token, data.data.userId);
      IsActive(null)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="auth-page">
          <h3>Авторизация</h3>
          <form className="from from-login" onSubmit={loginHandler}>
            <div className="row">
              <div className="input-field col s12">
                <input
                  onChange={changeHandler}
                  type="email"
                  name="email"
                  className="validate"
                  id="email"
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={changeHandler}
                  type="password"
                  name="password"
                  className="validate"
                  id="email"
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row">
              <button
                type="submit"
                className="waves-effect waves-ligth btn blue"
              >
                Войти
              </button>
              <span onClick={()=>IsActive(2)} className="btn-outline btn-reg">Нет аккаунта ?</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
