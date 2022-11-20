import React, { useState, useEffect } from "react";
import Fields from '../Common/Fields/Fields.jsx';
import './ListFramework.css';
import _isEmpty from 'lodash/isEmpty';
import axios from "axios";
import { useSelector } from "react-redux";
import Requests from "../../Requests/index.js";

const ListFramework = (props) => {
    const { onClickFrameworkHandler = () => { }, label = 'Framework', setIsCustomeFramework = () => {}, isCustomeFramework } = props;
    const [frameworkData, setFrameworkData] = useState([]);
    const [bespokeFrameworkData, setBespokeFrameworkData] = useState([]);
  
    const { orgDetails = {} } = useSelector(state => state.signup);
    useEffect(() => {
        getFramework();
        getBespokeFramework();
    }, []);

    const getFramework = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await Requests.Get(`/esgadmin/frameworks`, { organization: orgDetails.name });
            // setStatusData({ type: '', message: '' });
            setFrameworkData([...response.results]);
        } catch (e) {
            setFrameworkData([]);
            // setStatusData({ type: 'error', message: e.message });
        }
    }

    const getBespokeFramework = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await Requests.Get(`/templates/`, { template_type: 'Custom', organization: orgDetails.name });
            // setStatusData({ type: '', message: '' });
            setBespokeFrameworkData([...response.results]);
        } catch (e) {
            setBespokeFrameworkData([]);
            // setStatusData({ type: 'error', message: e.message });
        }
    }

    const onClickLogoHandler = async (id, index) => {
        let cloneFrameWork = isCustomeFramework ? [...frameworkData] : [...bespokeFrameworkData];
        cloneFrameWork = (cloneFrameWork || []).map((item, i) => {
            if (i === index) {
                if (!item['isSelected']) {
                    onClickFrameworkHandler(index, item.id);
                }
                item['isSelected'] = !item['isSelected'];
            } else {
                item['isSelected'] = false;
            }
            return item;
        });

        if(isCustomeFramework) {
            setFrameworkData([...cloneFrameWork]);
        } else {
            setBespokeFrameworkData([...cloneFrameWork]);
        }

     

    }

    const onChangeToggleHangler = (flag) => {
        const cloneFrameworkData = (isCustomeFramework ? [...frameworkData] : [...bespokeFrameworkData]).map(item => {
            item['isSelected'] = false;
            return item;
        });
        if(isCustomeFramework) {
            setFrameworkData([...cloneFrameworkData]);
        } else {
            setBespokeFrameworkData([...cloneFrameworkData]);
        }
        setIsCustomeFramework(flag) 
        props.onChangeToggle()
    }

    const isSelectedFramework = (isSelected) => isSelected ? 'active' : null;

    return (<>
        <div className="toggle-framework-container"><button onClick={() => onChangeToggleHangler(true) } className={`framework-toggle-btn ${isCustomeFramework ? 'active': null}`}>Standard framework</button><button onClick={() => onChangeToggleHangler(false) } className={`framework-toggle-btn ${!isCustomeFramework ? 'active': null}`}>Bespoke Framework</button></div>
        {!_isEmpty(label) && <h1 className="assign__title">
            {label}
        </h1>
        }
        <>
        {isCustomeFramework ? 
        <div className="frameworks__choose">
            {(frameworkData || []).map((item, i) => {
                return (<div onClick={() => onClickLogoHandler(item.id, i)} className={`frameworks__choose-item ${isSelectedFramework(item.isSelected)}`}>
                    <img src={item.logo} alt="GRI" />
                </div>)
            })
            }
        </div> :
            <div class="cards-wrapper">
                 {(bespokeFrameworkData || []).map((item, i) => {
                return (<div onClick={() => onClickLogoHandler(item.id, i)} className={`frame-card ${isSelectedFramework(item.isSelected)}`}>
                    {item.name}
                </div>)
            })
            }
               
            </div>
        }</>
    </>);
}

export default ListFramework;