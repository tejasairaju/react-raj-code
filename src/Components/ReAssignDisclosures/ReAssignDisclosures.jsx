import React, { useState, useEffect } from 'react';
import Requests from '../../Requests/index.js';
import _get from 'lodash/get';
import './ReAssignDisclosures.css'
// import actions from '../../../actions/SignUpActions.js'
import { useDispatch, useSelector } from 'react-redux';
// import Popup from '../Common/Popup/Popup.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
import axios from 'axios';
import { useMemo } from 'react';

const ReAssignDisclosures = (props) => {
    const dispatch = useDispatch();
    const [statusData, setStatusData] = useState({});
    const { disclosure = {}, reportId='', setIsOpenReAssign = () => {} } = props
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {
        try {
            const response = await Requests.Get(`/users/?organization=${orgDetails.name || 'sprint2'}`);
            setUserList([...response.results]);
        } catch (e) {
            setUserList([]);
        }
    }

    const onClickReAssignHandler = async (user) => {
        const payload = {}; let params = null;
        payload['disclosure_id'] = disclosure.id;
        payload['disclosure_type'] = "Standard";
        payload['assigned_to'] = user.id;
        params = [payload];
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.post(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures/assign?organization=${orgDetails.name || 'sprint2'}`, params).then(({ data }) => data);
            setStatusData({ type: 'success', message: 'Disclosures assigned successfully' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    return (<>{<div className='reassign-disclosure-container'>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} />}
        <div className='reassign-disclosure_inner'>
            <div className='reassign-disclosure-block'>
                <div className='reassign-popup-close'><img onClick={() => setIsOpenReAssign(false)} src="../../../../assets/icons/close.svg" width='30px' height='30px' /></div>
                <div className='reassign-disclosure-body'>
                    <h5 class="detalis__information-title">
                        If you want to reassign, select the user from the list below:
                    </h5>
                    <div class="modal__text-wrapper">
                        <div class="modal__content-wrapper">
                            <ul class="table__titles-list">
                                <li class="table__titles-list-item">
                                    Name
                                </li>
                                <li class="table__titles-list-item">
                                    Designation
                                </li>
                                <li class="table__titles-list-item">
                                    Action
                                </li>
                            </ul>
                            <div class="table__row-wrapper">
                                {(userList || []).map((user, index) => <ul class="table__row-list">
                                    <li class="table__row-list-item">
                                        <p class="row__item-info username" id="">
                                            {user.first_name} {user.last_name}
                                        </p>
                                        <p class="row__item-info designation" id="">
                                            {user.role}
                                        </p>
                                        <a onClick={() => onClickReAssignHandler(user)} class="detalis__reassign row__item-info action" id="">
                                            Reassign
                                        </a>
                                    </li>
                                </ul>)
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    }</>
    );
}

export default ReAssignDisclosures;