import React, { useState, useEffect } from "react";
import axios from 'axios';
import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { getColor } from "../../utils/utils.js";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import './ViewMyTaskList.css';

const ViewMyTaskList = (props) => {
    const { status  = '' } = useParams();
    const navigate = useNavigate();

    const { taskList = null } = useSelector(state => state.mytask);
    const headers = [
        'Report',
        'Disclosure',
        'Status',
        'Action'
       ];

    if(status ==='completed') {
        headers.pop(); 
    }

    const redirectToAnswerQuestion = (task) => {
        navigate(`/report/${task.report.id}/disclosures/${task.disclosure.id}`)
    }

    return (<>

            <div class="main__top-wrapper view-task-list-contianer">
                <h1 class={`main__title ${getColor(status)}`}>
                {status} - MY Task List
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
                        {(taskList || []).map((task, index) => {
                            if(_toLower(task.status) === _toLower(status) || _toLower(status) === 'disclosures') {
                            return (<tr key={index}>
                                <td>{task.report.name}</td>
                                <td>{task.disclosure.name}</td>
                                <td>{task.status}</td>
                                {task.status!=='completed'&&<td><a onClick={() => redirectToAnswerQuestion(task)} className={`answer-redirect-link`}>Answer</a></td>}
                            </tr>)
                            }
                        })}
                    </tbody>
            </table>
    </>)
}
export default ViewMyTaskList;