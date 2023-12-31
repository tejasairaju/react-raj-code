import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { getColor } from '../../utils/utils.js';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import './ViewMyTaskList.css';
import actions from '../../actions/MyTaskDashboardAction.js';
import { getDataFormat } from '../../utils/utils.js';

const ViewMyTaskList = (props) => {
  const { status = '' } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const { taskList = null, reportList = null } = useSelector((state) => state.mytask);

  useEffect(() => {
    dispatch(actions.getDisclosuresList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
    dispatch(actions.getReportList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
  }, []);

  const headers = ['Name', 'Start Date', 'End Date', 'Status', 'Action'];

  useEffect(() => {
    if ((reportList || []).length === 0) {
      dispatch(actions.getReportList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
    }
  }, []);

  if (status === 'completed') {
    headers.pop();
  }

  const redirectToViewDisclosures = (report) => {
    // navigate(`/report/${task.report.id}/disclosures/${task.disclosure.id, { state: {...task}}}`)
    navigate(`/task/report/${report.id}/disclosures`, { state: { report: { ...report } } });
  };

  return (
    <>
      <div className='main__top-wrapper view-task-list-contianer'>
        <h1 className={`main__title ${getColor(status)} custom-title`}>View Disclosure and Answer Questions</h1>
      </div>
      <br />
      <div className='scrollable'>
        {reportList && reportList.length > 0 ? (
          <table className='default-flex-table'>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reportList && reportList.length > 0 ? (
                (reportList || []).map((report, index) => {
                  // if(_toLower(task.status) === _toLower(status) || _toLower(status) === 'disclosures') {
                  return (
                    <tr key={index}>
                      <td>{report.name}</td>
                      <td>{getDataFormat(report.start_date)}</td>
                      <td>{getDataFormat(report.end_date)}</td>
                      <td>{report.status == 'Custom' ? 'Bespoke' : report.status}</td>
                      <td>
                        <a onClick={() => redirectToViewDisclosures(report)} className={`answer-redirect-link cursor-pointer`}>
                          View Disclosures
                        </a>
                      </td>
                    </tr>
                  );
                  // }
                })
              ) : (
                <tr>
                  <td colSpan={5}>
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
export default ViewMyTaskList;
