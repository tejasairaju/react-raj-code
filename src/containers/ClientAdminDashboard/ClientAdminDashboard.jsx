import React from "react";
import { useNavigate } from "react-router-dom";
import './ClientAdminDashboard.css';

const ClientAdminDashboard = () => {
const  navigate =useNavigate();
    return (
        <>
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    Welcome to client admin
                </h1>
                <div class="framework__row right font12 ">
                    <a onClick={() => navigate('/')} class="right rightlink__color cursor-pointer">ESG KPIs</a>
                    <a onClick={() => navigate('/clientadmin')} class="right rightlink__color">| Admin Dasboard |</a> 
                    <a onClick={() => navigate('/task')} class="right rightlink__color cursor-pointer">My Tasks</a>
                </div>
            </div>
            <div class="client-main__content-wrapper admindashboard__content-wrapper">

                <div class="framework__row-wrapper ">

                    <div class="framework__row  ">
                        <div class="framework__col-wrapper content-wrapper blue admin__box">

                            <div class="number">
                                8
                            </div>
                            <div class="text">
                                tasks
                            </div>
                        </div>
                    </div>

                    <div class="framework__row ">
                        <div class="framework__col-wrapper content-wrapper green admin__box">
                            <div class="number">
                                23
                            </div>
                            <div class="text">
                                user issues
                            </div>
                        </div>
                    </div>

                    <div class="framework__row">
                        <div class="framework__col-wrapper content-wrapper brown admin__box">
                            <div class="number">
                                33
                            </div>
                            <div class="text">
                                frameworks
                            </div>
                        </div>
                    </div>
                </div>

                <div class="framework__row-wrapper ">
                    <div class="framework__row content-wrapper admin__box adminimg__box ">
                        <img src="assets/images/splinechart1.png" width="100%" />
                    </div>
                    <div class="framework__row content-wrapper admin__box adminimg__box">
                        <img src="assets/images/splinechart1.png" width="100%" />
                    </div>
                </div>
                <div class="framework__row-wrapper">
                    <div class="content-wrapper box adminimg__box">
                        <img src="assets/images/splinechart2.png" width="100%" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientAdminDashboard;