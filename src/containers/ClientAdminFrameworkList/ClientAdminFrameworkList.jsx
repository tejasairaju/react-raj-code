
import React, { useState, useEffect } from "react";
// import Fielsds from '../Common/Fields/Fields.jsx';
import './ClientAdminFrameworkList.css';
import _isEmpty from 'lodash/isEmpty';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OverlappingDisclosures from "../OverlappingDisclosures/OverlappingDisclosures.jsx";

const ClientAdminFrameworkList = (props) => {
    const navigate = useNavigate();
    const { onClickFrameworkHandler = () => { }, label = 'Framework' } = props;
    const [selectedFramework, setSelectedFramework] = useState({from: '', to: ''});
    const [frameworkData, setFrameworkData] = useState(null);
    const [rightFrameworkData, setRightFrameworkData] = useState(null);
    const [isOpenOverlappingDislosures, setIsOpenOverlappingDislosures] = useState(false);
    useEffect(() => {
        getFramework();
    }, []);

    const getFramework = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks?organization=sprint2`).then(({ data }) => data);
            // setStatusData({ type: '', message: '' });
            setFrameworkData([...response.results]);
            setRightFrameworkData(JSON.parse(JSON.stringify(response.results)));
        } catch (e) {
            setFrameworkData([]);
            // setStatusData({ type: 'error', message: e.message });
        }
    }

    const onClickLogoHandler = async (val, index, type) => {
        let cloneFrameWork = type === 'left' ? [...frameworkData] :[...rightFrameworkData];
        let cloneOppositeFrameWork = type === 'left' ? [...rightFrameworkData] : [...frameworkData];
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

        cloneOppositeFrameWork = (cloneOppositeFrameWork || []).map((item, i) => {
            if (i === index) {
                item['isSource'] = true;
            } else {
                item['isSource'] = false;
            }
            return item;
        })

        if(type === 'left'){
            setFrameworkData([...cloneFrameWork]);
            setSelectedFramework({ ...selectedFramework, from: cloneFrameWork[index]});
            setRightFrameworkData([...cloneOppositeFrameWork]);
        } else {
            setRightFrameworkData([...cloneFrameWork]);
            setSelectedFramework({ ...selectedFramework, to: cloneFrameWork[index]});
            setFrameworkData([...cloneOppositeFrameWork]);
        }
    }

    const isSelectedFramework = (isSelected) => isSelected ? 'active' : null;


    const renderFrameworkLogo = (label ='', type ='left') => {
        return (<div>
            {!_isEmpty(label) && <h1 className="assign__title cli-framework-title">
                {label}
            </h1>
            }
            <div className="frameworks__choose cli-admin-frame-list">
                {(((type === 'left') ? frameworkData : rightFrameworkData) || []).map((item, i) => {
                    return (<div key={i} onClick={() => onClickLogoHandler(item, i, type)} className={`frameworks__choose-item ${isSelectedFramework(item.isSelected)} ${item.isSource ? ' hide-framework' : null}`}>
                        <div className="m-p-6"><img className="client-framework-logo" src={item.logo} alt={item.name}/></div>
                        <div className="m-p-6">{item.name}</div>
                    </div>)
                }
                )}
            </div>
        </div>);
    }

    const onClickNextHandler = () => {
        console.log('::::::::::::', selectedFramework);
        if(selectedFramework.from&&selectedFramework.to) {
            // navigate('/intelligent/mapping');
            setIsOpenOverlappingDislosures(true);

        }
    }

    return (<>
    {!isOpenOverlappingDislosures?
    <>
    <h1 className="assign__title">
                Select Any one framework from source and target
            </h1>
        <div className="cli-framework-list-container m-t-2">
            <div>{renderFrameworkLogo('Source Framework', 'left')}</div>
            <div>{renderFrameworkLogo('Target Framework', 'right')}</div>
        </div>
        <a type="submit" className="next-btn form-btn" onClick={() => onClickNextHandler()}>Next</a>
        </>
        :<OverlappingDisclosures selectedFramework={selectedFramework}/> }
        </>);
}

export default ClientAdminFrameworkList;