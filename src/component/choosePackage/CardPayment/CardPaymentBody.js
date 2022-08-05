import React from "react";
import style from "./CardPaymentBody.module.css";
import { RiArrowDropLeftLine } from "react-icons/ri";
import Head from "../../CreateAccountNav/CreateAccount";
import { Link } from "react-router-dom";

const CardPaymentBody = () => {
  return (
    <div className={style.container}>
      <Head pack="pack" />

      <div className={style.body}>
        <div className={style.cardPayBodyHead}>
          <div className={style.head}>
            <RiArrowDropLeftLine
              size={35}
              style={{ marginRight: "8px", color: "#5E5873" }}
            />
            <h4> Payment Gateway</h4>
          </div>
        </div>
        <p className={style.subHead}>Make payments to proceed</p>
        <div className={style.payForm}>
          <button className={style.applePay}>
            <svg
              width="59"
              height="24"
              viewBox="0 0 59 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.0393 3.0942C10.3572 3.90485 9.26599 4.54424 8.17474 4.4529C8.03833 3.3568 8.57259 2.1922 9.19779 1.47288C9.87982 0.639391 11.0734 0.0456708 12.0396 0C12.1533 1.14177 11.7099 2.2607 11.0393 3.0942ZM12.0282 4.66984C10.4482 4.5785 9.09548 5.57184 8.34525 5.57184C7.58364 5.57184 6.43556 4.71551 5.18517 4.73834C3.55966 4.76118 2.04782 5.68601 1.21802 7.1589C-0.487058 10.1047 0.7747 14.4662 2.42294 16.8639C3.23001 18.0514 4.19622 19.353 5.46935 19.3073C6.67427 19.2617 7.15169 18.5195 8.60669 18.5195C10.0731 18.5195 10.4936 19.3073 11.7668 19.2845C13.0854 19.2617 13.9152 18.0971 14.7222 16.9096C15.643 15.5623 16.0181 14.2493 16.0408 14.1808C16.0181 14.1579 13.4946 13.1874 13.4718 10.2645C13.4491 7.82112 15.4611 6.65652 15.552 6.58801C14.4153 4.89819 12.642 4.71551 12.0282 4.66984ZM21.1561 1.35871V19.1589H23.9069V13.0733H27.7149C31.1933 13.0733 33.6372 10.6755 33.6372 7.20457C33.6372 3.73359 31.2388 1.35871 27.8059 1.35871H21.1561ZM23.9069 3.68792H27.0784C29.4655 3.68792 30.8295 4.9667 30.8295 7.21598C30.8295 9.46527 29.4655 10.7555 27.067 10.7555H23.9069V3.68792ZM38.6615 19.2959C40.3893 19.2959 41.9921 18.4167 42.7196 17.0238H42.7765V19.1589H45.3227V10.2988C45.3227 7.72978 43.2766 6.07421 40.1279 6.07421C37.2065 6.07421 35.0468 7.75262 34.9672 10.059H37.4452C37.6499 8.96289 38.6615 8.24358 40.0483 8.24358C41.7307 8.24358 42.6741 9.0314 42.6741 10.4814V11.4634L39.2413 11.6689C36.0471 11.863 34.3193 13.176 34.3193 15.4596C34.3193 17.7659 36.1039 19.2959 38.6615 19.2959ZM39.4004 17.1836C37.934 17.1836 37.0019 16.4757 37.0019 15.3911C37.0019 14.2721 37.8999 13.6213 39.6164 13.5186L42.6741 13.3245V14.3292C42.6741 15.9962 41.2646 17.1836 39.4004 17.1836ZM48.7215 24C51.4042 24 52.6659 22.9724 53.7685 19.8554L58.5996 6.24548H55.8032L52.5636 16.7612H52.5068L49.2671 6.24548H46.3912L51.0518 19.2046L50.8017 19.9924C50.3811 21.3283 49.6991 21.8421 48.4828 21.8421C48.2668 21.8421 47.8462 21.8192 47.6757 21.7964V23.9315C47.8349 23.9772 48.5169 24 48.7215 24Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
        <p className={style.or}>
          <span>Or pay with card</span>
        </p>

        <div className={style.input}>
          <label>Email</label>
          <input type="text" />
        </div>

        <div className={style.input}>
          <label>Country or region</label>
          <input type="text" />
        </div>
        <div className={style.validation}>
          <input className={style.validation1} />
          <input className={style.validation2} />
        </div>

        <div className={style.input}>
          <label>Name on card</label>
          <input type="text" />
        </div>
        <div className={style.input}>
          <label>Country or region</label>
          <input type="text" />
        </div>

        <Link to="/PaymentSuccess">
          <button className={style.cardPay}>Pay £1650.00</button>
        </Link>
      </div>
    </div>
  );
};

export default CardPaymentBody;
