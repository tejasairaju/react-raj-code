import React from "react";
import style from "./SelectPackage.module.css";
import Head from "../../CreateAccountNav/CreateAccount";
import { RiArrowDropLeftLine } from "react-icons/ri";
import bottomBox from '../../../assets/Illustration.svg'
const SelectPackage = () => {
  return (
    <div className={style.container}>
      <Head pack="pack" />
      <div className={style.body}>
        <div className={style.head}>
          <RiArrowDropLeftLine
            size={35}
            style={{ marginRight: "8px", color: "#5E5873" }}
          />
          <h4>Your favorite package to Select</h4>
        </div>
        <span className={style.subHead}>
          Select readymade or custom packages
        </span>
        <div className={style.card}>
          <div className={style.card1}>
            <div>
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="72" height="72" rx="16" fill="#F8F8F8" />
                <path
                  d="M36 17C30.9609 17 26.1282 19.0018 22.565 22.565C19.0018 26.1282 17 30.9609 17 36C17 41.0391 19.0018 45.8718 22.565 49.435C26.1282 52.9982 30.9609 55 36 55L36 36V17Z"
                  fill="#3F87C2"
                />
                <path
                  d="M36 55C41.0391 55 45.8718 52.9982 49.435 49.435C52.9982 45.8718 55 41.0391 55 36C55 30.9609 52.9982 26.1282 49.435 22.565C45.8718 19.0018 41.0391 17 36 17L36 36L36 55Z"
                  fill="#57ACF1"
                />
              </svg>
            </div>
            <h3 className={style.cardTitle}>Bronze</h3>
            <p className={style.CardsubHead}>A simple start for everyone</p>
            <div className={style.price}>
              <p>£</p>
              <h5>1500</h5>
              <h4>/month</h4>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Admin+5 users a month</h5>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Unlimited forms and surveys</h5>
            </div>
            <button className={style.cardButton}>Subscribe</button>
          </div>
          <div className={style.card2}>
            <div>
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="72" height="72" rx="16" fill="#F8F8F8" />
                <rect
                  x="17"
                  y="17"
                  width="18.4865"
                  height="38"
                  fill="#3F87C2"
                />
                <rect
                  x="35.4863"
                  y="17"
                  width="19.5135"
                  height="38"
                  fill="#57ACF1"
                />
                <rect
                  x="35.4863"
                  y="35.4863"
                  width="19.5135"
                  height="19.5135"
                  fill="#81B8E4"
                />
              </svg>
            </div>
            <h3 className={style.cardTitle}>Silver</h3>
            <p className={style.CardsubHead2}>For small to medium businesses</p>
            <div className={style.price}>
              <p>£</p>
              <h5>1800</h5>
              <h4>/month</h4>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Admin+10 users a month</h5>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Unlimited forms and surveys</h5>
            </div>
            <button className={style.cardButton2}>Subscribe</button>
          </div>
          <div className={style.card3}>
            <div>
              <svg
                width="72"
                height="72"
                viewBox="0 0 72 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="72" height="72" rx="16" fill="#F8F8F8" />
                <path
                  d="M57.1634 46.6464L57.1727 46.6413H57.1546L46.5283 40.8833L35.8844 35.1152L25.24 40.8833L14.6138 46.6413H14.5957L14.605 46.6464L14.5957 46.6515H14.6138L25.24 52.4094L35.8844 58.1775L46.5283 52.4094L57.1546 46.6515H57.1727L57.1634 46.6464Z"
                  fill="#81B8E4"
                />
                <path
                  d="M57.1634 24.5312L57.1727 24.5265H57.1546L46.5283 18.7681L35.8844 13L25.24 18.7681L14.6138 24.5265H14.5957L14.605 24.5312L14.5957 24.5362H14.6138L25.24 30.2946L35.8844 36.0627L46.5283 30.2946L57.1546 24.5362H57.1727L57.1634 24.5312Z"
                  fill="#3F87C2"
                />
                <path
                  d="M14.6133 24.0625V47.1151L35.8839 35.589L14.6133 24.0625Z"
                  fill="#57ACF1"
                />
                <path
                  d="M57.155 24.0625V47.1151L35.8848 35.589L57.155 24.0625Z"
                  fill="#57ACF1"
                />
              </svg>
            </div>
            <h3 className={style.cardTitle}>Gold</h3>
            <p className={style.CardsubHead}>Solution for big organizations</p>
            <div className={style.price}>
              <p>£</p>
              <h5>2875</h5>
              <h4>/month</h4>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Admin+25 users a month</h5>
            </div>
            <div className={style.CardContent}>
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="3.69593"
                  cy="3.9786"
                  rx="3.16078"
                  ry="3.17489"
                  stroke="#6E6B7B"
                  stroke-width="0.793722"
                />
              </svg>
              <h5>Unlimited forms and surveys</h5>
            </div>
            <button className={style.cardButton}>Subscribe</button>
          </div>
        </div>
        <div className={style.box}>
            <div className={style.content}>
                <h5>Do you need custom purchase ?</h5>
                <p>You can contact us and we will get back to you </p>
                <button className={style.boxButton}>Contact us</button>
            </div>

            <img src={bottomBox} alt='bottomBox' />

        </div>
      </div>
    </div>
  );
};

export default SelectPackage;
