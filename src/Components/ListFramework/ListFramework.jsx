import React, { useState, useEffect } from "react";
import Fields from '../Common/Fields/Fields.jsx';
import './ListFramework.css';
import _isEmpty from 'lodash/isEmpty';
import axios from "axios";

const ListFramework = (props) => {
    const { onClickFrameworkHandler = () => { }, label = 'Framework' } = props;
    const [frameworkData, setFrameworkData] = useState(null);
    useEffect(() => {
        getFramework();
    }, []);

    const getFramework = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks?organization=sprint2`).then(({ data }) => data);
            // setStatusData({ type: '', message: '' });
            setFrameworkData([...response.results]);
        } catch (e) {
            setFrameworkData([]);
            // setStatusData({ type: 'error', message: e.message });
        }
    }

    const onClickLogoHandler = async (id, index) => {
        let cloneFrameWork = [...frameworkData]
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
        })
        setFrameworkData([...cloneFrameWork]);

    }

    const isSelectedFramework = (isSelected) => isSelected ? 'active' : null;

    return (<>
        {!_isEmpty(label) && <h1 className="assign__title">
            {label}
        </h1>
        }
        <div className="frameworks__choose">
            {(frameworkData || []).map((item, i) => {
                return (<div onClick={() => onClickLogoHandler(item.id, i)} className={`frameworks__choose-item ${isSelectedFramework(item.isSelected)}`}>
                    <img src={item.logo} alt="GRI" />
                </div>)
            }
            )}
        </div></>);
}

export default ListFramework;