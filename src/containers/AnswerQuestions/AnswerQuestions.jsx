import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import AnswerQuestionsTable from "../../Components/AnswerQuestionsTable/AnswerQuestionsTable.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
const { RadioButton } = Fields;
import './AnswerQuestions.css';
import { listDisclosures } from '../../../__mocks__/listDisclosures.js';
import Requests from "../../Requests/index.js";
import { useSelector } from "react-redux";

const AnswerQuestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = _get(location, 'state', {});
    const { start_date = '20-03-2022', end_date = '23-03-2022'} = _get(state, 'report', {});
    const { reportId = '5eafbd8f-502e-4859-b54f-65d1846dad48', disclosureId = "97a7744e-41d0-4303-8ad8-75528a736e9f" } = useParams();
    const [apiData, setApiData] = useState({ listData: null, groupListData: {} });
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [isOpen, setIsopen] = useState(false);
    const [catagoryType, setCatagoryType] = useState('All');
    const [frameworkData, setFrameworkData] = useState(null);
    // const [reportDate, setReportDate] = useState({});
    // const [listDisclosuresData, setListDisclosuresData] = useState([]);
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);

    useEffect(() => {
        // getFramework();
        getDisclosures();
        // setReportDate({createdDate, updatedDate});
    }, []);

    const getDisclosures = async (frameworkId) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await Requests.Get(`/reports/${reportId}/disclosures/${disclosureId}/data`, orgDetails.name);
            setStatusData({ type: '', message: '' });
            setApiData({
                listData: [response]
            });
            // return response.results;
            // return response.results || [];
        } catch (e) {
            setStatusData({ type: '', message: '' });
            // return [];
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

    const radioChangeHandler = (e) => {
        const { value = '' } = e.target;
        setCatagoryType(e.target.value);
        // let cloneApiData = { ...apiData }
        // let cloneGroupListData = [...Object.values(cloneApiData['groupListData'] || []).flat()];
        // if (value !== 'All') {
        //     cloneGroupListData = (cloneGroupListData || []).filter(item => _toLower(item.category) == _toLower(value));
        // }
        // setApiData({ ...cloneApiData, listData: cloneGroupListData });
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

    const onClickSaveAnswer = async (answer, disclosureIndex, questionIndex) => {
        console.log('>>>>>>>>>>>>>>>>>', answer, disclosureIndex, questionIndex);
        let cloneApiData = {...apiData};
        apiData.listData[disclosureIndex].children[questionIndex].value = answer;
        setApiData({
            ...cloneApiData,   
        });

    }

    const onClickSaveAllChanges = async () =>{
        let cloneListData = [...apiData.listData];
        let data = [];
        await cloneListData.forEach((item, itemIndex) => {
            (item.children || []).forEach((subItem, subItemIndex) => {
                if(!_isEmpty(subItem.value)){
                    data = [...data, {
                        disclosure_kpi_id: subItem.id,
                        value: subItem.value,
                        value_unit: String(subItem.field_unit_values || '')
                    }];
                }
            });
        });

        const payload = {data}

        try {
            setStatusData({ type: 'loading', message: '' });
            console.log('>>>>>>>>>>>>>>>>payload>>>>', payload);
            const response = Requests.Post(`/reports/${reportId}/disclosures/${disclosureId}/data`, {data}, orgDetails.name);
            if(response) {
                setStatusData({ type: 'success', message: 'Your answers has been successfully saved' });
            }
        } catch(e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const onCloseHandler = () => {

    }

    const getState = (value) => ({
        code: value.code,
        name: value.name,
        framework_id: frameworkData.id,
        disclosure_id: value.id
    })
    const isSelectedFramework = (isSelected) => isSelected ? 'active' : null;
    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['All', 'Environmental', 'Universal', 'Social', 'Goverance', 'General'];
    return (<>
    {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper">
            <h1 className="main__title">
                Answer Questions
            </h1>
        </div>
        <div className="ans-main__assign-item">
            {/* <h1 className="assign__title">
                Frameworks:
            </h1>
            <div className="frameworks__choose">
                {(frameworkData || []).map((item, i) => {
                    return (<div onClick={() => onClickLogoHandler(item.id, i)} className={`frameworks__choose-item ${isSelectedFramework(item.isSelected)}`}>
                        <img src={item.logo} alt="GRI" />
                    </div>)
                }
                )}
            </div> */}
            <h1 className="assign__title">
                Set Period:
            </h1>
            <div className="create-framework__row-wrapper dates">
                <h1 className="create-framework__title">
                    From:
                </h1>
                <label for="create-framework__date-from" className="create-framework__label">
                    <input type="date" value={start_date} className="create-framework__input" id="create-framework__date-from" required />
                    <img src="./assets/icons/celendar.svg" alt="" />
                </label>
                <h1 className="create-framework__title">
                    To:
                </h1>
                <label for="create-framework__date-to" className="create-framework__label">
                    <input type="date" value={end_date} className="create-framework__input" id="create-framework__date-to" required />
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
            {(apiData.listData || []).map((item, disclosureIndex) => {
                if (_toLower(item.category) === _toLower(catagoryType) || _toLower(catagoryType) === 'all') {
                    return <AnswerQuestionsTable reportId={reportId} itemDetails={item} disclosureIndex={disclosureIndex} onClickSaveAnswer={onClickSaveAnswer} />
                }
            })
            }
        </ul>
        <button onClick={() => onClickSaveAllChanges()} className="main__button btn-save-all-anw-change">
            SAVE ALL CHANGES
        </button>
    </>)
}

export default AnswerQuestions;