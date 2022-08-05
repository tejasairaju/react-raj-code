import React from "react";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Head from "../CreateAccountNav/CreateAccount";
import style from "./Login.module.css";

const Login = ({ pass }) => {
  return (
    <div className={style.container}>
      <Head login="login" pay='pay' />
      <div className={style.body}>
        <div className={style.head}>
          <RiArrowDropLeftLine
            size={35}
            style={{ marginRight: "8px", color: "#5E5873" }}
          />
          <h4>Your Login Details</h4>
        </div>
        <p className={style.subHead}>Enter your username, password details</p>
        <div className={style.inputBox}>
          <label>Your company email id</label>
          <input type="text" placeholder="johndoe@gmail.com" />
        </div>
        {pass && (
          <div className={style.inputBox1}>
            <label>Password</label>
            <input type="password" />
          </div>
        )}

        <div className={style.rememberBox}>
          <input type="checkbox" />
          <p>Remember me</p>
        </div>
        <div className={style.btn}>
          <Link to="/LoginPass">
            <button className={style.btn2}>next</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
