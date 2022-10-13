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
                <div><a className="change-package-link" onClick={() => navigate(-1)}>Change Package</a></div>
            </div>
            <div className="paymnet-summary-block">
                <div className="pay-amount-block">
                    <h3 className="package__item-title bronze">

                        {_get(item, 'name', '')} Package
                    </h3>
                    <p className="package__item-price">
                        <span>
                            {_get(item, 'price', 0)}
                        </span>
                        ($)
                    </p>
                    <h5 className="package__item-title bronze">
                        ESG-DISCLOSURES-{_toUpper(_get(item, 'name', ''))}-PACKAGE
                    </h5>
                </div>
                <div className="">
                    <p className="package__item-price">
                        <span>
                            {_get(item, 'price', 0)}
                        </span>
                        ($)
                    </p>
                    <div className="flex">
                        <span><b>MONTHLY RECURRYING</b></span>
                        <br /><br />
                    </div>
                    <div className="flex">
                        <span>Subtotal</span>
                        <span>{_get(item, 'price', 0)}($)</span>
                    </div>
                    <div className="flex">
                        <span>sales tax (10%)</span>
                        <span>100($)</span>
                    </div>
                    <div className="flex">
                        <span><b>Total Due</b></span>
                        <span><b>{_get(item, 'price', 0) + 100}($)</b></span>
                    </div>
                    <button onClick={() => navigate('/checkout', { state: { price: _get(item, 'price', 0) + 100 } })} className="m-l-1 main-btn package-make-pymt-btn">
                        Make Payment
                    </button>
                </div>
            </div>
            <div className="package-summary-page-next-btn">
            <button onClick={() => navigate('/', { state: { price: _get(item, 'price', 0) + 100 } })} className="m-l-1 main-btn ">
                NEXT
            </button>
            </div>
        </div></>);
}

export default PackageSummary;