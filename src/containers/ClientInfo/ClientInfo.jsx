import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import MoreAction from './MoreAction.jsx';
import moment from 'moment';
import _get from 'lodash/get';
import { getLogo } from '../../utils/utils.js';

import './ClientInfo.css';

const ClientInfo = (props) => {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    const getFramework = async () => {
      try {
        setStatusData({ type: 'loading', message: '' });
        const response = await axios.get(`${process.env.API_BASE_URL}/organizations/`).then(({ data }) => data);
        setStatusData({ type: '', message: '' });
        setClientData(response);
      } catch (e) {
        setStatusData({ type: 'error', message: e.message });
      }
    };

    getFramework();
  }, []);

  const headers = ['Logo', 'Organisation', 'Location / Head Quarters', 'Admin Email', 'Package', 'Users Limit', 'License From', 'Status', 'Action'];

  return (
    <>
      <div className='main__top-wrapper'>
        <h1 className='main__title custom-title'>Client Info</h1>
        <button
          className='main__button'
          onClick={() => {
            navigate(`/client/onboard`);
          }}
        >
          ADD
        </button>
      </div>
      <br />
      <div className='client-info-list-container'>
        {clientData && clientData.results && clientData.results.length > 0 ? (
          <table className='default-flex-table'>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {clientData && clientData.results && clientData.results.length > 0 ? (
                clientData.results.map((val, index) => {
                  return (
                    <tr>
                      {/* <td><img src={val.logo} alt="logo" width='28px' height='28px' /></td> */}
                      <td>{getLogo(val)}</td>
                      <td>
                        <div className='word-text-break'>{val.name}</div>
                      </td>
                      <td>
                        {!_isEmpty(val.location) && !_isEmpty(val.headquarters) ? val.location + '/' + val.headquarters : !_isEmpty(val.location) ? val.location : val.headquarters}{' '}
                      </td>
                      <td>
                        <div className='word-text-break'>{val.email}</div>
                      </td>
                      <td>{val.subscription.name}</td>
                      <td>{val.subscription.max_users}</td>
                      <td>{val.subscription.start_date}</td>
                      <td>{val.status}</td>
                      <td>
                        <MoreAction value={val} index={index} deleteCallback={() => {}} />
                        {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={9}>
                    <div className='flex justify-center w-full'>No records found</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <div className='flex justify-center w-full'>No records found</div>
        )}
      </div>
    </>
  );
};
export default ClientInfo;
