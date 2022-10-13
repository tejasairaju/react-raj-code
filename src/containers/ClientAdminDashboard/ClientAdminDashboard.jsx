import React from "react";
import './ClientAdminDashboard.css';

const ClientAdminDashboard = () => {

    return (
        <>
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    Welcome to client admin
                </h1>
                <div class="framework__row right font12 ">
                    <a href="#" class="right rightlink__color">ESG KPIs</a>
                    <p class="right">| Admin Dasboard |</p> <a href="/welcome-to-mytasks.html" class="right rightlink__color">My Tasks</a>
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