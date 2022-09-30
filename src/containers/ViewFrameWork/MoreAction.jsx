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
    return (<div onClick={() => setIsopen(false)}>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => {setIsopen(!isOpen); e.stopPropagation();} }><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active": "inactive"}`}>
            <div onClick={() => onNavigateHandler(`/createframe?id=${value.id}&isEdit=${true}`)}><a>Edit Framework</a></div>
            <div><a onClick={() => { navigate(`/createdisclosures?id=${value.id}`) }}>Create Disclosures</a></div>
            <div><a onClick={() => { navigate(`/viewdisclosures?id=${value.id}`)}}>View Disclosures</a></div>
        </div>
    </div>)
}

export default MoreAction;