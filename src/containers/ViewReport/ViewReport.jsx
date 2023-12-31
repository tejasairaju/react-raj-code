import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _toLower from 'lodash/toLower';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { getColor } from '../../utils/utils.js';
import { Routes, Route, Link, Outlet, useNavigate, useParams } from 'react-router-dom';
import Requests from '../../Requests/index.js';
import MoreAction from '../../Components/MoreAction/MoreAction.jsx';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import './ViewReport.css';
import { useDispatch, useSelector } from 'react-redux';
import { getDataFormat } from '../../utils/utils.js';

const ViewReport = (props) => {
  const { status = '' } = useParams();
  const navigate = useNavigate();
  const { search } = _get(window, 'location', '?');
  const queryValue = queryString.parse(search);
  const { isAssignDisClosure = false } = queryValue;
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const [reportList, setReportList] = useState([]);
  const [statusData, setStatusData] = useState({});

  const mytask = useSelector((state) => state.mytask);
  useEffect(() => {
    getDisclosures();
  }, []);

  const getDisclosures = async () => {
    try {
      setStatusData({ type: 'loading', message: '' });
      const response = await axios.get(`${process.env.API_BASE_URL}/reports/?organization=${orgDetails.name}`).then(({ data }) => data);

      setStatusData({ type: '', message: '' });
      const sortResult = response && response.results;
      setReportList(sortResult);
      // return response.disclosures || [];
      // return listDisclosures.results || [];
    } catch (e) {
      setStatusData({ type: '', message: '' });
      // return [];
    }
  };

  const headers = ['Name', 'Start Date', 'End Date', 'Status', 'Action'];

  if (status === 'completed') {
    headers.pop();
  }

  const redirectToViewDisclosures = (report) => {
    // navigate(`/report/${task.report.id}/disclosures/${task.disclosure.id, { state: {...task}}}`)
    navigate(`/task/report/${report.id}/disclosures`);
  };

  const deleteReportHandler = async ({ id = '' }) => {
    try {
      const res = await Requests.Delete(`/reports/${id}`, {
        organization: orgDetails.name
      });
    } catch (e) {
      console.log(e);
    }
    getDisclosures();
  };

  return (
    <>
      <div className='main__top-wrapper view-task-list-contianer'>
        <h1 className={`main__title custom-title`}>{isAssignDisClosure ? 'Assign Disclosures' : 'Publish Reports'}</h1>
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
                        <MoreAction viewReport={true} value={report} isAssignDisClosure={isAssignDisClosure} deleteCallback={() => deleteReportHandler(report)} name={'report'} />
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
export default ViewReport;
