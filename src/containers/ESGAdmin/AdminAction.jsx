import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
 

const AdminAction = (props) => {
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
            <div onClick={() => { }}><a>View</a></div>
            <div><a onClick={() => { }}>Edit</a></div>
            <div><a onClick={() => { }}>Activate</a></div>
            <div><a onClick={() => { }}>Block</a></div>
        </div>
    </div>)
}

export default AdminAction;