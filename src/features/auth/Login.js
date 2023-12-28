import React from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginUser, clearState } from "./auth.slice";
import { ToastContainer, toast } from "react-toastify";
import {useCounter} from './useCounter';
import "react-toastify/dist/ReactToastify.css";
import './login.css'

export function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [checked, setChecked] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isSuccess, isError, error } = useSelector((state) => state.auth);

  const onChangeInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitLogin = async (e) => {
    const { username, password } = user;
    e.preventDefault();
    dispatch(loginUser({ username, password }));
    if (isSuccess) {
      navigate("/products");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate(location.state?.path || "/products");
    }

    if (isError) {
      toast.error(error, {
        theme: "colored",
      });
      dispatch(clearState());
    }
  });

  const {count, setCount} = useCounter();
  const [leftNavState, setLefNavState] = React.useState('');
  const leftNavClassName = "left_nav " + leftNavState;

  const [isPasswordShown, setIsPasswordShown] = React.useState(false);
  console.log('checked', checked)
  
  return (
    <div className="container-fluid ps-md-0">
      <div className={leftNavClassName}>
        Lef Nav
      </div>
      <div className="row g-0">
        <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
        <div className="col-md-8 col-lg-6">
          <div className="login d-flex align-items-center py-5">
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto">
                  <button onClick={() => {
                    setLefNavState('hidden')
                  }}>hide nav</button>
                  <ToastContainer />
                  <div>{count}</div>
                  <button
                    onClick={() => {
                      setCount(prev => prev + 1, console.log('test'))
                    }}
                  >
                    add
                  </button>
                  <h3 className="login-heading mb-4">Welcome back!</h3>
                  <form onSubmit={onSubmitLogin}>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="herzliyaaa"
                        name="username"
                        value={user.username}
                        onChange={onChangeInput}
                      />
                      <label htmlFor="floatingInput">Username</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type={isPasswordShown ? "text" : "password"}
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={onChangeInput}
                      />
                      <div
                      className="password_display_toggle"
                      onClick={() => setIsPasswordShown(
                        prevState => {
                          return !prevState
                        }
                      )

                      }>{isPasswordShown ? 'hide' : 'show'}</div>
                      <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={checked}
                        id="rememberPasswordCheck"
                        onChange={() => {
                          setChecked(prevState => {
                            return !prevState
                          })
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="rememberPasswordCheck"
                      >
                        Remember password
                      </label>
                    </div>

                    <div className="d-grid">
                      <button
                        className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2"
                        type="submit"
                      >
                        Sign in
                      </button>

                      <div className="text-center">
                        <NavLink className="small" href="#">
                          Forgot password?
                        </NavLink>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
