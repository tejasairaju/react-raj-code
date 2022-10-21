import React from "react";
import './MyTaskDashboard.css';


const MyTaskDashboard = () => {


    return (<><div class="main__top-wrapper">
        <div class="leftheading">
            <h1 class="main__title">
                <b>Welcome to my tasks</b>
            </h1>
        </div>

        <div class="welcome__task__right__heading">
            <h1 class="welcome__task__heading">
                <a href=""><u>ESG KPIs</u></a>
            </h1>
            <span class="welcome__task__top_line">|</span>
            <h1 class="welcome__task__heading">
                <a href="/admindashboard.html"><u>Admin Dashboard</u></a>
            </h1>
            <span class="welcome__task__top_line">|</span>
            <h1 class="welcome__task__heading">
                <b>My Tasks</b>
            </h1>
        </div>
    </div>
    </>)
}

export default MyTaskDashboard;