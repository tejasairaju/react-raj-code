import React from 'react'
import style from './PaymentSuccess.module.css'
import Head from '../../CreateAccountNav/CreateAccount'
import { RiArrowDropLeftLine } from 'react-icons/ri'
import footer from '../../../assets/footer.svg'

const PaymentSuccess = () => {
  return (
    <div className={style.container}>
        <Head  pack="pack" />
        <div className={style.body}>
        <div className={style.PaymentBodyHead}>
          <div className={style.head}>
            <RiArrowDropLeftLine
              size={35}
              style={{ marginRight: "8px", color: "#5E5873" }}
            />
            <h4> Payment Gateway</h4>
          </div>
        </div>
        <p className={style.subHead}>Make payments to proceed</p>
        <div className={style.content}>
        <svg width="243" height="243" viewBox="0 0 243 243" fill="none" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="121.246" cy="121.07" rx="76.1056" ry="76.0213" fill="#3F87C2"/>
<ellipse opacity="0.3" cx="121.25" cy="121.071" rx="121.205" ry="121.071" fill="#3F87C2"/>
<path d="M81.7871 119.663L108.565 146.411L162.121 92.915" fill="#3F87C2"/>
<path d="M81.7871 119.663L108.565 146.411L162.121 92.915" stroke="white" stroke-width="4.1372" stroke-linecap="round" stroke-linejoin="round"/>

</svg>
<div>

<h4>Payment Successful</h4>
<p>Thank you! Your payment is complete</p>
</div>

        </div>

        <footer>
            <img src={footer} alt='footer' />
        </footer>
        </div>

    </div>
  )
}

export default PaymentSuccess