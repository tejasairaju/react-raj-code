import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './MoreAction.css';

const MoreAction = (props) => {
    const {value, index} = props;
    const [isOpen, setIsopen] = useState(false);
    const navigate = useNavigate();
    const onNavigateHandler = (url) => {
        setIsopen(false);
        navigate(url);
        
    }
    return (<div onClick={() => setIsopen(false)} className='more-action-contianer'>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => {setIsopen(!isOpen); e.stopPropagation();} }><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active": "inactive"}`}>
            <div onClick={() => {navigate(`/customeronboardbyadmin`, {state: {clientDetails: value, isEditable: true, isView: false}})}}><a>Edit</a></div>
            {/* <div><a onClick={() => { }}>Create</a></div> */}
            <div><a onClick={() =>navigate(`/customeronboardbyadmin`, {state: {clientDetails: value,isEditable: false, isView: true}}) }>View</a></div>
        </div>
    </div>)
}

export default MoreAction;