import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import AnswerQuestionsTable from "../../Components/AnswerQuestionsTable/AnswerQuestionsTable.jsx";

const { RadioButton } = Fields;
import './AnswerQuestions.css';
import { listDisclosures } from '../../../__mocks__/listDisclosures.js';


const AnswerQuestions = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({ listData: null, groupListData: {} });
    const [isOpen, setIsopen] = useState(false);
    const [catagoryType, setCatagoryType] = useState('All');
    const [frameworkData, setFrameworkData] = useState(null);
    // const [listDisclosuresData, setListDisclosuresData] = useState([]);
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);

    useEffect(() => {

        getFramework();
    }, []);

    const getDisclosures = async (frameworkId) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            // const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${frameworkId}/disclosures`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            return listDisclosures.results;
            // return response.results || [];
        } catch (e) {
            return [];
        }
    }

    const getFramework = async () => {
        try {
            // setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks`).then(({ data }) => data);
            // setStatusData({ type: '', message: '' });
            setFrameworkData([...response.results]);
        } catch (e) {
            setFrameworkData([]);
            // setStatusData({ type: 'error', message: e.message });
        }
    }

    const onCloseHandler = () => {
    }
    const radioChangeHandler = (e) => {
        const { value = '' } = e.target;
        setCatagoryType(e.target.value);
        let cloneApiData = { ...apiData }
        let cloneGroupListData = [...Object.values(cloneApiData['groupListData'] || []).flat()];
        if (value !== 'All') {
            cloneGroupListData = (cloneGroupListData || []).filter(item => _toLower(item.category) == _toLower(value));
        }
        setApiData({ ...cloneApiData, listData: cloneGroupListData });
    };

    const onClickLogoHandler = async (id, index) => {
        if ((frameworkData[index]['isSelected'] == undefined) || (frameworkData[index]['isSelected'] == false)) {
            frameworkData[index]['isSelected'] = true;
        } else {
            frameworkData[index]['isSelected'] = false;
        }
        setFrameworkData([...frameworkData]);
        handleListData(index, id);
    }

    const handleListData = async (indexKey, frameworkId) => {
        let cloneApiData = { ...apiData };
        if ((((Object.keys(cloneApiData.groupListData || [])).indexOf(indexKey + '')) > -1)) {
            delete cloneApiData.groupListData[indexKey + ''];
            console.log(cloneApiData.groupListData);
            setApiData({ ...cloneApiData, listData: [...Object.values(cloneApiData['groupListData'] || []).flat()] });
        } else {
            const data = await getDisclosures(frameworkId);
            setApiData({
                ...cloneApiData,
                groupListData: {
                    ...cloneApiData['groupListData'],
                    [indexKey]: data || [],
                }, listData: [...Object.values(cloneApiData['groupListData'] || []).flat(), ...data]

            })
        }
    }

    const getState = (value) => ({
        code: value.code,
        name: value.name,
        framework_id: frameworkData.id,
        disclosure_id: value.id
    })
    const isSelectedFramework = (isSelected) => isSelected ? 'active' : null;
    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['All', 'Environmental', 'Social', 'Goverance', 'General'];

    return (<>
        <div className="main__top-wrapper">
            <h1 className="main__title">
                Answer Questions
            </h1>
        </div>
        <div className="ans-main__assign-item">
            <h1 className="assign__title">
                Frameworks:{(apiData.listData || []).length}
            </h1>
            <div className="frameworks__choose">
                {(frameworkData || []).map((item, i) => {
                    return (<div onClick={() => onClickLogoHandler(item.id, i)} className={`frameworks__choose-item ${isSelectedFramework(item.isSelected)}`}>
                        <img src={item.logo} alt="GRI" />
                    </div>)
                }
                )}
            </div>
            <h1 className="assign__title">
                Set Period:
            </h1>
            <div className="create-framework__row-wrapper dates">
                <h1 className="create-framework__title">
                    From:
                </h1>
                <label for="create-framework__date-from" className="create-framework__label">
                    <input type="date" className="create-framework__input" id="create-framework__date-from" required />
                    <img src="./assets/icons/celendar.svg" alt="" />
                </label>
                <h1 className="create-framework__title">
                    To:
                </h1>
                <label for="create-framework__date-to" className="create-framework__label">
                    <input type="date" className="create-framework__input" id="create-framework__date-to" required />
                    <img src="./assets/icons/celendar.svg" alt="" />
                </label>
            </div>
            <h1 className="assign__title">
                Categories:
            </h1>
            <ul className="assign__categories">
                {radioButton.map((radioVal, i) => (<RadioButton
                    changed={radioChangeHandler}
                    id={i}
                    isSelected={catagoryType === radioVal}
                    label={radioVal}
                    value={radioVal}
                />))}
            </ul>
        </div>
        <ul className="assign__categories answer__detalis">
            {(apiData.listData || []).map((item) =>
                <AnswerQuestionsTable itemDetails={item} frameworkId={frameworkData.id}/>)
            }
        </ul>
        {/* <button className="main__button">
            SAVE ALL CHANGES
        </button> */}
    </>)
}

export default AnswerQuestions;