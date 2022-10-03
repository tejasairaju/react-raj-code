import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './MoreAction.css';

const MoreAction = (props) => {
    const { value, index, viewListFramework = false, viewDisclosures = false, ...rest } = props;
    const [isOpen, setIsopen] = useState(false);
    const navigate = useNavigate();
    const onNavigateHandler = (url) => {
        setIsopen(false);
        navigate(url);
    }

    const onRedirectWithState = (url) => {
        navigate(url, {
            state: {
                ...rest.state
            }
        });
        setIsopen(false);
    }
    return (<div onClick={() => setIsopen(false)}>
        <div tabindex={index} className={`frametoggler`} onClick={(e) => { setIsopen(!isOpen); e.stopPropagation(); }}><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
        <div className={`framedropdown framedropdown-${isOpen ? "active" : "inactive"}`}>
            {viewListFramework&&<>
                <div onClick={() => onNavigateHandler(`/createframe?id=${value.id}&isEdit=${true}`)}><a>Edit Framework</a></div>
                <div><a onClick={() => { navigate(`/createdisclosures?id=${value.id}`) }}>Create Disclosures</a></div>
                <div><a onClick={() => { navigate(`/viewdisclosures?id=${value.id}`) }}>View Disclosures</a></div>
            </> }
            {viewDisclosures&&
                  <>
                  <div onClick={() => onRedirectWithState(`/createquestions`)}><a>Create Questions</a></div>
                  <div><a onClick={() => {onRedirectWithState(`/viewQuestions`)}}>View Questions</a></div>
                  
              </>
            }
        </div>
    </div>)
}

export default MoreAction;