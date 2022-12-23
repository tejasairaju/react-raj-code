import React, { useEffect, useState } from "react";
import _toLower from 'lodash/toLower';
import Requests from "../../Requests";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getColor } from "../../utils/utils.js";
import actions from '../../actions/MyTaskDashboardAction.js'
import './ClientAdminDashboard.css';

const ClientAdminDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { userId = 'fc16d19f-0bbd-4890-b62a-d514381f1c40' } = useParams();
    const [myReportCount, setReportCount] = useState({});
    const { orgDetails = {}, loginDetails ={} } = useSelector(state => state.signup);
    //const mytask = useSelector(state => state.mytask);
    useEffect(() => {
        getOrganisation();
        // dispatch(actions.getDisclosuresList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
        // dispatch(actions.getReportList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
        
    }, []);

    const getOrganisation = async (id = "") => {
        try {
            const orgInfo = await Requests.Get(`/organizations/${orgDetails.name}`);
            const resp = {

                "reports": orgInfo.stats.reports,
                "completed" : orgInfo.stats.tasks.completed,
                "pending":orgInfo.stats.tasks.pending
            }
            setReportCount(resp);
        }catch (e) {
            // setFrameworkdetails({});
        }
    }

    const renderCard = (status, count) => (<div onClick={() => {
        if (status === 'Frameworks') {
            navigate(`/task/reports`)
        }
    }
    } class={`welcome__task__box2 ${getColor(status)}`}>
        <div className="welcome__task__numbers">
            <h1 class={`welcome__task__box_content ${status === 'Reports' ? 'cursor-pointer': null}`}>{count || 0}</h1>
        </div>
        <div>
            <h4 className="welcome__task__bottom_content">{status}</h4>
        </div>
    </div>);

    return (<>
        <div className="main__top-wrapper">
            <div className="leftheading">
                <h1 className="main__title custom-title">
                    <b>Admin Dashboard</b>
                </h1>
            </div>

            {(loginDetails.user_role === 'client_admin') &&<div className="welcome__task__right__heading">
                <h1 className="welcome__task__heading">
                    <a className="rightlink__color cursor-pointer" onClick={() => navigate('/')}><u>ESG KPIs</u></a>
                </h1>
                <span className="welcome__task__top_line">|</span>
                <h1 className="welcome__task__heading">
                
                    <b>Admin Dashboard</b>
                </h1>
                <span className="welcome__task__top_line">|</span>
                <h1 className="welcome__task__heading">
                <a className="rightlink__color cursor-pointer" onClick={() => navigate('/task')}><u>My Tasks</u></a>
                    
                </h1>
            </div>}
        </div>
        <div className="welcome__task__container2">
            {console.log(myReportCount)}
        {renderCard('Frameworks', myReportCount.reports)}
        {renderCard('Total Task', (myReportCount.completed+myReportCount.pending))}
        {renderCard('Completed', myReportCount.completed)}
        {renderCard('Pending', myReportCount.pending)} 
        {/* {renderCard('Completed', myReportCount.tasks.completed)}
        {renderCard('Pending', myReportCount.tasks.pending)}   */}
             
            
        </div>
    </>)
}

export default ClientAdminDashboard;