import React from 'react'
import logo from '../../assets/Account_info.png'
import style from './CreateAccount.module.css'
import {BiHomeAlt} from 'react-icons/bi'
import {AiOutlineUser} from 'react-icons/ai'
import {RiArrowDropRightLine} from 'react-icons/ri'
import { FiCreditCard } from 'react-icons/fi'


const CreateAccount = ({acc,pack, pay, login}) => {
  console.log(acc,pack);
  return (
    <div className={style.container}>
     
        <img className={pay ? style.img : style.fullImage} src={logo} alt='logo' />
    
        <div className={style.menu}>
          <div className={style.head}>
            <div className={ style.icon}>
              <BiHomeAlt size={25} className={ acc ?  style.icon1 : style.accontIcon} />

              <div>
              <p className={style.title}>Account</p>
              <span className={style.suntitle}>Enter username</span>

              </div>
              <RiArrowDropRightLine size={25} style={{marginLeft: '8px'}} /> 
            </div>
            <div className={style.icon}>
              <AiOutlineUser size={25} className={ pack ? style.icon2 : style.packageIcon} />

              <div>
              <p className={style.title}>Choose Package</p>
              <span className={style.suntitle}>Enter Information</span>

              </div>
              <RiArrowDropRightLine size={25} style={{marginLeft: '8px'}}  /> 
             
            </div>

            <div className={style.icon}>
              <FiCreditCard size={25} className={login ? style.icon3 : style.loginIcon}/>

              <div>
              <p className={style.title}>Login</p>
              <span className={style.suntitle}>System</span>

              </div>
           
            </div>
            <div></div>
            <div></div>
          </div>
          <hr />

           </div>
    
    </div>


  )
}

export default CreateAccount