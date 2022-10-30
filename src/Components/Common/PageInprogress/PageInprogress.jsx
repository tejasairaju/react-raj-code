import React, { useState, useEffect } from 'react';
import Requests from '../../../Requests';
import _get from 'lodash/get';
import './PageInprogress.css'
import actions from '../../../actions/SignUpActions.js'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useMemo } from 'react';

const PageInprogress = (props) => {
    const { is_db_created = false, name = '' } = useSelector(state => _get(state, 'signup.orgDetails', {}));
    const dispatch = useDispatch();

    useMemo(() => {
        if (!is_db_created) {
            setTimeout(() => getDBStatus(), 2000)
        }
    });

    const getDBStatus = async () => {
        try {
            const response = await Requests.Get(`/organizations/${name}`, name).then(({ data }) => data);
            dispatch(actions.updateDbStatus(response.is_payment_done));
        } catch (error) {
            dispatch(actions.updateDbStatus(false));
        }
    }
    return (<>{!is_db_created ? <div className='pageinprogress-container'>
        <div className='pageinprogress_inner'>
            <div className='pageinprogress-block'>
                <div className='pageinprogress-body'>
                    <div className='flex flex-center'><img src="assets/icons/spinner-loader.svg" alt="loading..." width={'100px'} /></div>
                    <div className={`inprogress-message`}>Please wait while we set things up for you... this might take a few seconds.</div>
                </div>
            </div>
        </div>
    </div>
        : null}</>
    );
}

export default PageInprogress;