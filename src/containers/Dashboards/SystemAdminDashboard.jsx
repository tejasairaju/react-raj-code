import React, { useState, useEffect } from "react";
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Chart from 'chart.js/auto';

import './dashboard.css';

const SystemAdminDashboard = (props) => {
    const navigate = useNavigate();


    const [frameWorkData, setFrameWorkData] = useState({});
    const [organizationData, setOrganizationData] = useState({});
    const [statusData, setStatusData] = useState({});


    useEffect(() => {
        var chartBar = null;
        var chartLine = null;

        const getChart = async () => {
            const labels = ["January", "February", "March", "April", "May", "June"];
            const data = {
              labels: labels,
              datasets: [
                {
                  label: "Client Subscriptions",
                  backgroundColor: "hsl(252, 82.9%, 67.8%)",
                  borderColor: "hsl(252, 82.9%, 67.8%)",
                  data: [0, 10, 5, 2, 20, 30, 45],
                },
              ],
            };
          
            const configLineChart = {
              type: "line",
              data,
              options: {},
            };
          

            const configBarChart = {
                type: "bar",
                data,
                options: {},
              };

            chartLine = new Chart(
              document.getElementById("chartLine"),
              configLineChart
            );
            
            chartBar = new Chart(
                document.getElementById("chartBar"),
                configBarChart
            );
        }

        const getFramework = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                console.log(response);
                setFrameWorkData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
        const getOrganization = async () => {
 
                try {
                    setStatusData({ type: 'loading', message: '' });
                    const response = await axios.get(`${process.env.API_BASE_URL}/organizations/`).then(({ data }) => data);
                    setStatusData({ type: '', message: '' });
                    setOrganizationData(response);
                } catch (e) {
                    setStatusData({ type: 'error', message: e.message });
                }
            }
 

        getOrganization();
        getFramework();
        getChart();
    }, []);



   

    return (<>
  

 <div class="container mx-auto">
   
 <div id="main" class="grid grid-cols-3 gap-6 justify-evenly"> 

  <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <br/>
    
    <a onClick={() => { navigate(`/manageframework`) }}>
        <h1 class="mb-2 text-7xl font-bold tracking-tight 
        text-gray-900 dark:text-white text-center ">{frameWorkData.count}</h1>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-indigo-900">
        Total Framework Count
    </p>
    <a onClick={() => { navigate(`/manageframework`) }} 
    class="inline-flex items-center py-2 px-3 text-sm font-medium
     text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 
     focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
      dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        View
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" 
        fill="currentColor" viewBox="0 0 20 20" 
        xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" 
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>

<div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
<br/>

    <a onClick={() => { navigate(`/manageclient`) }}>
        <h1 class="mb-2 text-7xl font-bold tracking-tight 
        text-gray-900 dark:text-white text-center ">{organizationData.count}</h1>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-emerald-700">
        Total Client 
    </p>

    <a onClick={() => { navigate(`/manageclient`) }} 
    class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        View
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div>


<div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
 

<br/>

<a onClick={() => { navigate(`/manageclient`) }}>
    <h1 class="mb-2 text-7xl font-bold tracking-tight 
    text-gray-900 dark:text-white text-center ">5</h1>
</a>
<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center text-rose-900">
Onboarding Pending 
</p>

<a onClick={() => { navigate(`/manageclient`) }} 
class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    View
    <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
</a>


</div>

</div>
  
  <br/>
  <br/>
  
  <div id="main1" class="grid grid-cols-2 gap-6 justify-evenly"> 

<div class="shadow-lg rounded-lg overflow-hidden">
  <div class="py-3 px-5 bg-gray-50 text-center">Subscription</div>
  <canvas class="p-10" id="chartBar"></canvas>
</div>

<div class="shadow-lg rounded-lg overflow-hidden">
  <div class="py-3 px-5 bg-gray-50 text-center">Sales</div>
  <canvas class="p-10" id="chartLine"></canvas>
</div>

</div>


</div>

 

 {/* <div class="main__content-wrapper">

<div class="framework__row-wrapper">

    <div class="framework__row ">
        <div class="framework__col-wrapper blue box">
            <div class="number">
                88
            </div>
            <div class="text">
                Clients
            </div>
        </div>
    </div>

    <div class="framework__row ">
        <div class="framework__col-wrapper green box">
            <div class="number">
                11
            </div>
            <div class="text">
                Frameworks
            </div>
        </div>
    </div>

    <div class="framework__row">
        <div class="framework__col-wrapper brown box">
            <div class="number">
                33
            </div>
            <div class="text">
                Subscription Expired
            </div>
        </div>
    </div>

    <div class="framework__row">
        <div class="framework__col-wrapper brown box">
            <div class="number">
                14
            </div>
            <div class="text">
                Onboarding Pending
            </div>
        </div>
    </div>
</div>
 
<div class="shadow-lg rounded-lg overflow-hidden">
  <div class="py-3 px-5 bg-gray-50">Bar chart</div>
  <canvas class="p-10" id="chartBar"></canvas>
</div>

</div> */}

    </>)
}
export default SystemAdminDashboard;