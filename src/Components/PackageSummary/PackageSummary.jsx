import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _get from 'lodash/get';
import _toUpper from 'lodash/toUpper';
import './PackageSummary.css';

const PackageSummary = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = _get(location, 'state', {});
    const { packageDetails: item } = state || {};
    return (<>
        <div className="paymnet-summary-container">
            <div className="paymnet-header-container">
                <div>Payment Gateway</div>
                <div>Change Package</div>
            </div>
            <div className="paymnet-summary-block">
                <div className="pay-amount-block">
                    <h3 className="package__item-title bronze">

                        {item.name} Package
                    </h3>
                    <p className="package__item-price">
                        <span>
                            {item.price}
                        </span>
                        ($)
                    </p>
                    <h5 className="package__item-title bronze">
                        ESG-DISCLOSURES-{_toUpper(item.name)}-PACKAGE
                    </h5>
                </div>
                <div className="">
                <p className="package__item-price">
                        <span>
                            {item.price}
                        </span>
                        ($)
                    </p>
                    <div className="flex">
                        <span>MONTHLY RECURRYING</span>
                    </div>
                    <div className="flex">
                        <span>Subtotal</span>
                        <span>{item.price}</span>
                    </div>
                    <div className="flex">
                        <span>sales tax (10%)</span>
                        <span>$100</span>
                    </div>
                    <div className="flex">
                        <span>Total Due</span>
                        <span>{item.price + 100}</span>
                    </div>
                    <button onClick={() => navigate('/checkout', {state: {price: item.price + 100}})} className="main__button m-l-1">
                        Make Payment
                    </button>
                </div>
            </div>

        </div></>);
}

export default PackageSummary;