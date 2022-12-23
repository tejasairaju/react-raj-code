import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Chart from 'chart.js/auto';
import { useDBStatus } from '../../Components/IsDBReady/IsDBReady.jsx';
import './dashboard.css';

const SystemAdminDashboard = (props) => {
  const navigate = useNavigate();
  const isDbReady = useDBStatus();

  const [frameWorkData, setFrameWorkData] = useState({});
  const [organizationData, setOrganizationData] = useState({});
  const [statusData, setStatusData] = useState({});

  useEffect(() => {
    var chartBar = null;
    var chartLine = null;

    const getChart = async () => {
      const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
      const data = {
        labels: labels,
        datasets: [
          {
            label: 'Client Subscriptions',
            backgroundColor: 'hsl(252, 82.9%, 67.8%)',
            borderColor: 'hsl(252, 82.9%, 67.8%)',
            data: [0, 10, 5, 2, 20, 30, 45]
          }
        ]
      };

      const configLineChart = {
        type: 'line',
        data,
        options: {}
      };

      const configBarChart = {
        type: 'bar',
        data,
        options: {}
      };

      // chartLine = new Chart(
      //     document.getElementById("chartLine"),
      //     configLineChart
      // );

      // chartBar = new Chart(
      //     document.getElementById("chartBar"),
      //     configBarChart
      // );
    };

    const getFramework = async () => {
      try {
        setStatusData({ type: 'loading', message: '' });
        const response = await axios
          .get(`${process.env.API_BASE_URL}/esgadmin/frameworks`)
          .then(({ data }) => data);
        setStatusData({ type: '', message: '' });
        console.log(response);
        setFrameWorkData(response);
      } catch (e) {
        setStatusData({ type: 'error', message: e.message });
      }
    };
    const getOrganization = async () => {
      try {
        setStatusData({ type: 'loading', message: '' });
        const response = await axios
          .get(`${process.env.API_BASE_URL}/organizations/`)
          .then(({ data }) => data);
        setStatusData({ type: '', message: '' });
        setOrganizationData(response);
      } catch (e) {
        setStatusData({ type: 'error', message: e.message });
      }
    };

    getOrganization();
    getFramework();
    getChart();
  }, []);

  return (
    <>
      {isDbReady && (
        <div style={{ margin: 'auto' }} className='container'>
          <div id='main' className='grid grid-cols-3 gap-6 justify-evenly'>
            <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <br />

              <a
                onClick={() => {
                  navigate(`/manageframework`);
                }}
              >
                <h1
                  className='mb-2 text-7xl font-bold tracking-tight 
        text-gray-900 dark:text-white text-center box-color-green'
                >
                  <span className='box-color-green'>{frameWorkData.count}</span>
                </h1>
              </a>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-indigo-900'>
                <span className='box-color-green'>Total Framework</span>
              </p>
              <a
                onClick={() => {
                  navigate(`/manageframework`);
                }}
                className='inline-flex items-center py-2 px-3 text-sm font-medium
     text-center text-white rounded-lg hover:bg-blue-800 
     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
     dark:hover:bg-blue-700 dark:focus:ring-blue-800 view-arrow'
              >
                View
                <svg
                  aria-hidden='true'
                  className='ml-2 -mr-1 w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </div>

            <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <br />

              <a
                onClick={() => {
                  navigate(`/manageclient`);
                }}
              >
                <h1
                  className='mb-2 text-7xl font-bold tracking-tight 
        text-gray-900 dark:text-white text-center '
                >
                  <span className='box-color-blue'>
                    {organizationData.count}
                  </span>
                </h1>
              </a>
              <p className='color-green mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-emerald-700 box-color-blue'>
                <span className='box-color-blue'>Total Client</span>
              </p>

              <a
                onClick={() => {
                  navigate(`/manageclient`);
                }}
                className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 view-arrow'
              >
                View
                <svg
                  aria-hidden='true'
                  className='ml-2 -mr-1 w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </div>

            <div className='p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <br />

              <a
                onClick={() => {
                  navigate(`/manageclient`);
                }}
              >
                <h1
                  className='mb-2 text-7xl font-bold tracking-tight 
    text-gray-900 dark:text-white text-center box-color-red'
                >
                  <span className='box-color-red'>5</span>
                </h1>
              </a>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-rose-900 box-color-red'>
                <span className='box-color-red'>Onboarding Pending </span>
              </p>

              <a
                onClick={() => {
                  navigate(`/manageclient`);
                }}
                className='inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:focus:ring-blue-800 view-arrow'
              >
                View
                <svg
                  aria-hidden='true'
                  className='ml-2 -mr-1 w-4 h-4'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                    clip-rule='evenodd'
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <br />
          <br />
          {/* <div id="main1" className="grid grid-cols-2 gap-6 justify-evenly">

                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <div className="py-3 px-5 bg-gray-50 text-center">Subscription</div>
                        <canvas className="p-10" id="chartBar"></canvas>
                    </div>

                    <div className="shadow-lg rounded-lg overflow-hidden">
                        <div className="py-3 px-5 bg-gray-50 text-center">Sales</div>
                        <canvas className="p-10" id="chartLine"></canvas>
                    </div>

                </div> */}
        </div>
      )}

      {/* <div className="main__content-wrapper">

<div className="framework__row-wrapper">

    <div className="framework__row ">
        <div className="framework__col-wrapper blue box">
            <div className="number">
                88
            </div>
            <div className="text">
                Clients
            </div>
        </div>
    </div>

    <div className="framework__row ">
        <div className="framework__col-wrapper green box">
            <div className="number">
                11
            </div>
            <div className="text">
                Frameworks
            </div>
        </div>
    </div>

    <div className="framework__row">
        <div className="framework__col-wrapper brown box">
            <div className="number">
                33
            </div>
            <div className="text">
                Subscription Expired
            </div>
        </div>
    </div>

    <div className="framework__row">
        <div className="framework__col-wrapper brown box">
            <div className="number">
                14
            </div>
            <div className="text">
                Onboarding Pending
            </div>
        </div>
    </div>
</div>
 
<div className="shadow-lg rounded-lg overflow-hidden">
  <div className="py-3 px-5 bg-gray-50">Bar chart</div>
  <canvas className="p-10" id="chartBar"></canvas>
</div>

</div> */}
    </>
  );
};
export default SystemAdminDashboard;
