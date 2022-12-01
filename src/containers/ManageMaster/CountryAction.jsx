import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import './ManageMaster.css';

const CountryAction = (props) => {
    const {value, index, onEdit = () => {}, onActive=() =>{}, onBlock=() => {}, isSector=false} = props;
    const [isOpen, setIsopen] = useState(false);
    const navigate = useNavigate();
const onNavigateHandler = (url) => {
        setIsopen(false);
        navigate(url);
        
    }
    return (<div onClick={() => setIsopen(false)}>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => {setIsopen(!isOpen); e.stopPropagation();} }><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active": "inactive"}`}>
            {/* <div onClick={() => { }}><a>View</a></div> */}
            <div><a onClick={() => onEdit()}>Edit</a></div>
            <div><a onClick={() => onActive()}>Activate</a></div>
            <div><a onClick={() => onBlock()}>Block</a></div>
            {isSector&&<div><a onClick={() => {navigate('/subsector', {state: { sector: {...value}}})}}>Add Subsector</a></div>}
            
        </div>
    </div>)
}

export default CountryAction;