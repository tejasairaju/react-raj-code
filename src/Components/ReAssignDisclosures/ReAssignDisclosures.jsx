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
    const { disclosure = {}, reportId = '', setIsOpenReAssign = () => { } } = props
    const { orgDetails = {} } = useSelector(state => state.signup);
    const { loginDetails = {} } = useSelector(state => state.signup);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async () => {
        try {
            const response = await Requests.Get(`/users/`, { organization: orgDetails.name });
            if(response) {
                let userList = [...response.results];
                userList = (userList || []).filter(item =>  item.id !== loginDetails.user_id);
                setUserList([...userList]);
            }
            
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
            const response = await Requests.Post(`/reports/${reportId}/disclosures/assign`, params, {organization: orgDetails.name});
            setStatusData({ type: 'success', message: 'Disclosures assigned successfully' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }
    const headers = ['Name', 'Designation', 'Action']

    return (<>{<div className='reassign-disclosure-container'>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} />}
        <div className='reassign-disclosure_inner'>
            <div className='reassign-disclosure-block'>
                <div className='reassign-popup-close'><img onClick={() => setIsOpenReAssign(false)} src="../../../../assets/icons/close.svg" width='30px' height='30px' /></div>
                <div className='reassign-disclosure-body'>
                    <h5 className="detalis__information-title">
                        If you want to reassign, select the user from the list below:
                    </h5>
                    <div className="modal__text-wrapper">
                        <div className="modal__content-wrapper">
                        <table className="default-flex-table">
                    <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                    {(userList.length > 0) ? <>{(userList || []).map((user, index)=> {
                            return (<tr>
                                <td>{user.first_name} {user.last_name}</td>
                                <td>{user.role}</td>
                                <td><a onClick={() => onClickReAssignHandler(user)} className="detalis__reassign row__item-info action" id="">
                                            Reassign
                                        </a></td>
                               
                            </tr>)
                        })}</> : <tr><td colspan="3">
                            <div className='no-data-found'>No Data Found.</div></td></tr> }
                    </tbody>
                </table>
                           
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