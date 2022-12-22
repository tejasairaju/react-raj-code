import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewBespokeFramework.css';
import Requests from '../../Requests';
import Popup from '../../components/Common/Popup/Popup.jsx';
import MoreAction from '../../Components/MoreAction/MoreAction.jsx';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getDataFormat, getErrorMessage } from '../../utils/utils';

const { Get } = Request;

const ViewBespokeFramework = () => {
  const navigate = useNavigate();
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const [apiData, setApiData] = useState({});
  const [statusData, setStatusData] = useState({});
  
  useEffect(() => {
    getFramework();
  }, []);

  const getFramework = async () => {
    try {
      setStatusData({ type: 'loading', message: '' });
      const response = await Requests.Get(`/templates/`, {
        template_type: 'Custom',
        organization: orgDetails.name
      });
      setStatusData({ type: '', message: '' });
      setApiData({ ...response });
    } catch (e) {
      let error = getErrorMessage(e);
      setStatusData({ ...error });
    }
  };

  const onCloseHandler = () => {};

  const deleteFrameworkHandler = async ({ id = '' }) => {
    try {
      const res = await Requests.Delete(`/templates/${id}`, {
        template_type: 'Custom',
        organization: orgDetails.name
      });
      getFramework();
    } catch (e) {
      console.log(e);
    }
  };

  const headers = ['Name', 'Created On', 'Template Type', 'Action'];

  return (
    <>
      <div className='main__top-wrapper'>
        <h1 className='main__title custom-title'>Edit Framework</h1>
      </div>
      <div id='viewFramework' className='view-framework-container'>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <table className='default-flex-table'>
          <thead>
            <tr>
              {headers.map((header) => (
                <th>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(apiData.results || []).map((val, index) => {
              return (
                <tr>
                  <td>{val.name}</td>
                  <td>{getDataFormat(val.created_at)}</td>
                  <td>{val.template_type == 'Custom' ? 'Bespoke' : val.template_type}</td>
                  {/* <td>{val.status}</td> */}
                  <td>
                    <MoreAction viewBespokeFramework={true} value={val} index={index} state={{ ...val }} deleteCallback={() => deleteFrameworkHandler(val)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default ViewBespokeFramework;
