import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './MoreAction.css';
import axios from "axios";

const MoreAction = (props) => {
    const { value, index, viewListFramework = false, viewDisclosures = false, viewBespokeFramework=false,viewBespokeDisclosures=false,viewReport=false, ...rest } = props;
    const [isOpen, setIsopen] = useState(false);
    const { orgDetails = {} } = useSelector(state => state.signup);
    const { loginDetails = {} } = useSelector(state => state.signup);
    const navigate = useNavigate();
    const onNavigateHandler = (url) => {
        setIsopen(false);
        navigate(url);
    }

    const generateReport = async (id , name) => {
        try {
            axios.post(
                `${process.env.API_BASE_URL}/reports/${id}/publish?organization=${orgDetails.name}`, 
                {responseType: 'blob'} // !!!
              ).then((response) => {
                // window.open(URL.createObjectURL(new Blob(response.data)));
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', name+'.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
              })
            
        } catch (e) {
            console.log(e)
        }
    }

    const onRedirectWithState = (url) => {
        navigate(url, {
            state: {
                ...rest.state
            }
        });
        setIsopen(false);
    }
    return (<div onClick={() => setIsopen(false)} className='more-action-contianer'>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => { setIsopen(!isOpen); e.stopPropagation(); }}><img src='../../assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active" : "inactive"}`}>
            {viewListFramework && <>
                <div onClick={() => onNavigateHandler(`/createframe?id=${value.id}&isEdit=${true}`)}><a>Edit Framework</a></div>
                <div><a onClick={() => { navigate(`/createdisclosures?id=${value.id}`) }}>Create Disclosures</a></div>
                <div><a onClick={() => { navigate(`/viewdisclosures?id=${value.id}`) }}>View Disclosures</a></div>
            </>}
            {viewDisclosures &&
                <>
                    <div onClick={() => onRedirectWithState(`/createquestions`)}><a>Create Questions</a></div>
                    <div><a onClick={() => { onRedirectWithState(`/viewQuestions`) }}>View Questions</a></div>
                </>
            }
              {viewBespokeFramework &&
                <>
                    <div onClick={() => onRedirectWithState(`/template?isEditable=true`)}><a>Edit Framework</a></div>
                    {/* <div onClick={() => onRedirectWithState(`/template/${value.id}/bespoke/disclosures`)}><a>View Disclosures</a></div> */}
                    <div onClick={() => onRedirectWithState(`/view/bespoke/${value.id}/disclosures`, value.name)}><a>View Disclosures</a></div>
                    
                </>
            }
            {
                viewBespokeDisclosures && 
                <>
                    <div onClick={() => onRedirectWithState(`/template/${value.template_id}?isEditable=true`)}><a>Edit Disclosure</a></div>
                    <div onClick={() => onRedirectWithState(`/template/${value.template_id}/disclosures/${value.id}/questions`)}><a>View Questions</a></div>
                </>
            }
            {
                viewReport && 
                <>
                    <div onClick={() => onRedirectWithState(`/report/${value.id}/disclosures`)}><a>Assign Disclosures</a></div>
                    <div onClick={() => generateReport(value.id, value.name)}><a>Generate Reports</a></div>
                </>
            }
        </div>
    </div>)
}

export default MoreAction;