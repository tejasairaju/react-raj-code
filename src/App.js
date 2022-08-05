import React from 'react'
import CreateAccount from './component/createAccount/creratBody'
import  {ChoosePackageBody}  from './component/choosePackage/ChoosePackageBody'
import CardPaymentBody from './component/choosePackage/CardPayment/CardPaymentBody'
import { BrowserRouter ,Routes, Route  } from 'react-router-dom'
import PaymentSuccess from './component/choosePackage/PaymentSuccess/PaymentSuccess'
import Login from './component/Login/Login'
import SelectPackage from './component/choosePackage/SelectPackage/SelectPackage'

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={
      <CreateAccount  />

        } />
        <Route path='/SelectPrice' element={
      <SelectPackage />

        } />
         <Route path='/ChoosePackage' element={
      <ChoosePackageBody  />

        } />
     
     <Route path='/CardPay' element={
      <CardPaymentBody />

        } />
        <Route path='/PaymentSuccess' element={
      <PaymentSuccess />

        } />

<Route path='/Login' element={
      <Login />

        } />
        <Route path='/LoginPass' element={
      <Login pass='pass' />

        } />
      
      </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App