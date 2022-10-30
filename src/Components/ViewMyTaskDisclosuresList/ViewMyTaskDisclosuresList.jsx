import React, { useState, useEffect } from "react";
import axios from 'axios';
import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { getColor } from "../../utils/utils.js";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Requests from "../../Requests/index.js";
import moment from 'moment';
import _get from 'lodash/get';
import './ViewMyTaskDisclosuresList.css';

const ViewMyTaskDisclosuresList = (props) => {
    const { userId  = 'a190f7b4-b6ff-4caa-ba43-180e54e329bf', reportId = '720bce88-bc36-44a8-b0c6-7209445f6c3b', status ='' } = useParams();
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [disclosureData, setDisclosureData] = useState(null);
    const navigate = useNavigate();

    // const userId= 'fc16d19f-0bbd-4890-b62a-d514381f1c40';

    // const { taskList = null, reportList = null } = useSelector(state => state.mytask);

    useEffect(() => {
        getReportDisclosures();
    }, []);

    const getReportDisclosures = async() => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/users/${userId}/tasks?organization=${orgDetails.name||'sprint2'}&report_id=${reportId}`).then(({data}) => data);
            setDisclosureData([...response.results]);
        } catch(e) {
            setDisclosureData([])
        }
    }
    const headers = [
        'Name',
        'Status',
        'Action'
       ];

    if(status ==='completed') {
        headers.pop(); 
    }

    const redirectToAnswerQuestion = (task) => {
        navigate(`/report/${reportId}/disclosures/${task.disclosure.id}/answers`, { state: {report: task.report}})
        // navigate(`/users/${userId}/report/${task.id}/disclosures`)
    }

    return (<>

            <div class="main__top-wrapper view-task-list-contianer">
                <h1 class={`main__title ${getColor(status)}`}>
                My Task - Disclosures
                </h1>
            </div>
            <br/>
            <table className="default-flex-table">
                <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                </thead>
                <tbody>
                        {(disclosureData || []).map((item, index) => {
                            // if(_toLower(task.status) === _toLower(status) || _toLower(status) === 'disclosures') {
                            return (<tr key={index}>
                                <td>{item.disclosure.name}</td>
                                <td>{item.status}</td>
                                <td><a onClick={() => redirectToAnswerQuestion(item)} className={`answer-redirect-link`}>Answer</a></td>
                            </tr>);
                            // }
                        })}
                    </tbody>
            </table>
    </>)
}
export default ViewMyTaskDisclosuresList;