import React from "react";
import style from "./body.module.css";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Head from '../CreateAccountNav/CreateAccount'

const CreratBody = () => {
  return (
    <div className={style.container}>
        <Head acc='account' pay='pay' />
      <div className={style.body}>
        <div className={style.topBody}>
          <RiArrowDropLeftLine
            size={35}
            style={{ marginRight: "8px", color: "#5E5873" }}
          />
          <div>
            <h4 className={style.bodyTitle}>Account Information</h4>
            <p className={style.bodySubtitle}>
              Enter your username, password details
            </p>
          </div>
        </div>
        <div className={style.bodyInputs}>
          <div className={style.row}>
            <div className={style.input}>
              <label>First Name</label>
              <input type="text" />
            </div>
            <div className={style.input}>
              <label>Last Name</label>
              <input type="text" />
            </div>
          </div>

          <div className={style.row2}>
            <div className={style.input}>
              <label>Company Email id</label>
              <input type="text" />
            </div>
            <div className={style.input}>
              <label>Mobile Number</label>
              <input type="text" />
            </div>
          </div>

          <div className={style.row3}>
            <div className={style.input}>
              <label>Password</label>
              <input type="text" />
            </div>
            <div className={style.input}>
              <label>Confirm Password</label>
              <input type="text" />
            </div>
          </div>

          <div className={style.row4}>
            <div className={style.input}>
              <label>Company Name</label>
              <input type="text" />
            </div>
            <div className={style.input}>
              <label>Company Location</label>
              <input type="text" />
            </div>
          </div>

          <div className={style.btn}>
                <Link to="/ChoosePackage">
              <button className={style.btn2}>next</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreratBody;
