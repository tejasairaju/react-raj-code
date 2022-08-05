import React from "react";
import style from "./ChoosePackageBody.module.css";
import { RiArrowDropLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Head from "../CreateAccountNav/CreateAccount";

export const ChoosePackageBody = () => {
  return (
    <div className={style.container}>
      <Head pack='pack' pay='pay' />

      <div className={style.packageBody}>
        <div className={style.packageBodyHead}>
          <div className={style.head}>
            <RiArrowDropLeftLine
              size={35}
              style={{ marginRight: "8px", color: "#5E5873" }}
            />
            <h4> Payment Gateway</h4>
          </div>
       
            <p className={style.changePlan}>Change Package</p>
          
        </div>
        <span className={style.subHead}>Make payments to proceed</span>
        <br />
        <br />

        <span className={style.package}>Bronze Package</span>
        <h3 className={style.price}>£ 1500</h3>
        <div className={style.total}>
          <p className={style.left}>ESG-DISCLOSURES - BRONZE PACKAGE</p>
          <div className={style.subTotal}>
            <p>£ 1500</p>
            <p>MONTHLY / RECURRING</p>
            <div className={style.column}>
              <p>Subtotal</p>
              <p>£1500.00</p>
            </div>
            <div className={style.column2}>
              <p>Sales tax (10%)</p>
              <p>£150:00</p>
            </div>
            <div className={style.column}>
              <p>Total due</p>
              <p>£1650.00</p>
            </div>
            <Link to="/CardPay">
              <button className={style.MakePayment}>Make Payment</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
