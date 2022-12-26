import React, { useEffect, useState } from 'react';
import './MyTaskDashboard.css';
import _toLower from 'lodash/toLower';
import Requests from '../../Requests';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getColor } from '../../utils/utils.js';
import actions from '../../actions/MyTaskDashboardAction.js';

const MyTaskDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { userId = 'fc16d19f-0bbd-4890-b62a-d514381f1c40' } = useParams();
  const [myTaskCount, setMyTaskCount] = useState({ disclosures: 0, completed: 0, pending: 0 });
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const mytask = useSelector((state) => state.mytask);
  useEffect(() => {
    dispatch(actions.getDisclosuresList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
    dispatch(actions.getReportList({ userId: loginDetails.user_id, orgName: orgDetails.name }));
  }, []);

  // const getColor = (status) => {
  //     switch (status) {
  //         case 'Disclosures': return 'color_blue';
  //         case 'Completed': return 'color_green';
  //         case 'Pending': return 'color_red';
  //     }
  // }

  const renderCard = (status, count) => (
    <div
      onClick={() => {
        if (status === 'Frameworks') {
          navigate(`/task/reports`);
        }
      }}
      className={`welcome__task__box2 ${getColor(status)}`}
    >
      <div className='welcome__task__numbers'>
        <h1 className={`welcome__task__box_content ${status === 'Reports' ? 'cursor-pointer' : null}`}>{count || 0}</h1>
      </div>
      <div>
        <h4 className='welcome__task__bottom_content'>{status}</h4>
      </div>
    </div>
  );

  return (
    <>
      <div className='main__top-wrapper'>
        <div className='leftheading'>
          <h1 className='main__title custom-title'>
            <b>My Tasks</b>
          </h1>
        </div>

        {loginDetails.user_role === 'client_admin' && (
          <div className='welcome__task__right__heading'>
            <h1 className='welcome__task__heading'>
              <a className='rightlink__color cursor-pointer' onClick={() => navigate('/')}>
                <u>ESG KPIs</u>
              </a>
            </h1>
            <span className='welcome__task__top_line'>|</span>
            <h1 className='welcome__task__heading'>
              <a className='rightlink__color cursor-pointer' onClick={() => navigate('/clientadmin')}>
                <u>Admin Dashboard</u>
              </a>
            </h1>
            <span className='welcome__task__top_line'>|</span>
            <h1 className='welcome__task__heading'>
              <b>My Tasks</b>
            </h1>
          </div>
        )}
      </div>
      <div className='welcome__task__container2 items-center h-screen'>
        {/* {renderCard('Frameworks', mytask.reportCount)}
        {renderCard('Disclosures', mytask.disclosures)}
        {renderCard('Completed', mytask.completed)}
        {renderCard('Pending', mytask.pending)} */}
        {renderCard('Disclosures', mytask.disclosures)}
        {renderCard('Pending', mytask.pending)}
        {renderCard('Completed', mytask.completed)}
        {renderCard('Reports', mytask.reportCount)}
      </div>
    </>
  );
};

export default MyTaskDashboard;
