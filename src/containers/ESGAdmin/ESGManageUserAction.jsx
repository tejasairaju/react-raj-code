import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Requests from "../../Requests";
import axios from 'axios';

const ESGManageUserAction = (props) => {
    const {value, index, getClientUsers = () => {}} = props;

    const [isOpen, setIsopen] = useState(false);
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [statusData, setStatusData] = useState({});

    const navigate = useNavigate();
    const onNavigateHandler = (url) => {
        setIsopen(false);
        navigate(url);
        
    }


    const onUpdateUser = async (inputValue,active_status) => {
        
        console.log(inputValue,active_status);
        let user_status = "Active"
        //Active, Invited, Disabled
        if(active_status ==1){
            user_status = "Active";
        }
        else{
            user_status = "Disabled";
        }
        try {
            inputValue.status =  user_status;
            const response = await Requests.Put(`/esgadmin/administrators/`+inputValue.id,
            inputValue);
                navigate('/adminuser');
            setStatusData({ type: 'success', message: 'Thanks! Successfully Updated' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }


    }

    const deleteUser = async (value) => {
        try {
            const response = await Requests.Delete(`/esgadmin/administrators/${value.id}`);
            getClientUsers();
        }catch(e) {

        }
    }


    return (<div className="more-action-contianer" onClick={() => setIsopen(false)}>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => {setIsopen(!isOpen); e.stopPropagation();} }><img src='../../assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active": "inactive"}`}>
        <div><a onClick={() => { navigate(`/esg/users/invite`, {state: {userDetails: value, isView: true}}) }}>View</a></div>
            <div><a onClick={() => { navigate(`/esg/users/invite`, {state: {userDetails: value, isEditable: true}}) }}>Edit</a></div>
            <div><a onClick={() => onUpdateUser(value, 1)}>Activate</a></div>
            <div><a onClick={() => onUpdateUser(value, 0)}>Block</a></div>
            {/* <div><a onClick={() => deleteUser(value, 0)}>Delete</a></div> */}
        </div>
    </div>)
}

export default ESGManageUserAction;