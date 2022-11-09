import React from "react";
import { useNavigate } from "react-router-dom";
import './ESGKpiDashboard.css';

const ESGKpiDashboard = () => {
    const navigate = useNavigate();

    return (<>
     <div class="main__top-wrapper">
                <h1 class="main__title">
                    ESG KPI
                 </h1>
                <div class="framework__row right font12 ">
                    <a onClick={() => navigate('/')} class="right">ESG KPIs</a>
                    <a onClick={() => navigate('/clientadmin')} class="right rightlink__color cursor-pointer">| Admin Dasboard |</a>
                    <a onClick={() => navigate('/task')} class="right rightlink__color cursor-pointer">My Tasks</a>
                </div>
            </div>
    <div className="esg-kpi-container">
        <img src="../../assets/images/esg-kpi.png" alt='esg-kpi' width={'100%'}/>
        </div></>)
}

export default ESGKpiDashboard;