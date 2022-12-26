import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { getColor } from '../../utils/utils.js';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import Axios from 'axios';
import Requests from '../../Requests/index.js';
import moment from 'moment';
import _get from 'lodash/get';
import './ViewMyTaskDisclosuresList.css';

const ViewMyTaskDisclosuresList = (props) => {
  const { reportId = '', status = '' } = useParams();
  const { state = {} } = useLocation();
  const { name } = _get(state, 'report', {});
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const [disclosureData, setDisclosureData] = useState(null);
  const navigate = useNavigate();

  // const userId= 'fc16d19f-0bbd-4890-b62a-d514381f1c40';

  // const { taskList = null, reportList = null } = useSelector(state => state.mytask);

  useEffect(() => {
    getReportDisclosures();
  }, []);

  const getReportDisclosures = async () => {
    try {
      const response = await Requests.Get(`/users/${loginDetails.user_id}/tasks`, { organization: orgDetails.name, report_id: reportId });
      setDisclosureData([...response.results]);
    } catch (e) {
      setDisclosureData([]);
    }
  };
  const headers = ['Name', 'Status', 'Action'];

  if (status === 'completed') {
    headers.pop();
  }

  const redirectToAnswerQuestion = (task) => {
    navigate(`/report/${reportId}/disclosures/${task.disclosure.id}/answers`, { state: { report: task.report } });
    // navigate(`/users/${userId}/report/${task.id}/disclosures`)
  };

  return (
    <>
      <div className='main__top-wrapper view-task-list-contianer'>
        <h1 className={`main__title ${getColor(status)}`}>My Task - Disclosures</h1>
        <h1 className={`main__title`}>
          Report Name: <b>{name}</b>
        </h1>
      </div>
      <br />
      <div className='scrollable'>
        {disclosureData && disclosureData.length > 0 ? (
          <table className='default-flex-table'>
            <thead>
              <tr>
                {headers.map((header) => (
                  <th>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {disclosureData && disclosureData.length > 0 ? (
                (disclosureData || []).map((item, index) => {
                  // if(_toLower(task.status) === _toLower(status) || _toLower(status) === 'disclosures') {
                  return (
                    <tr key={index}>
                      <td>{item.disclosure.name}</td>
                      <td>{item.status}</td>
                      <td>
                        <a onClick={() => redirectToAnswerQuestion(item)} className={`answer-redirect-link`}>
                          Answer
                        </a>
                      </td>
                    </tr>
                  );
                  // }
                })
              ) : (
                <tr>
                  <td colSpan={3}>
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
      <div className='create-question-main-btn'>
        <button onClick={() => navigate(-1)} className='main__button m-l-1 cancel-btn'>
          Back
        </button>
      </div>
    </>
  );
};
export default ViewMyTaskDisclosuresList;
