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
import { getErrorMessage } from '../../utils/utils.js';
import { useSelector } from "react-redux";

const AnswerQuestions = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = _get(location, 'state', {});
    const { start_date = '', end_date = '', name = '' } = _get(state, 'report', {});
    const { reportId = '', disclosureId = "" } = useParams();
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
            const response = await Requests.Get(`/reports/${reportId}/disclosures/${disclosureId}/data`, { organization: orgDetails.name });
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

    const onClickSaveAnswer = async (answer, disclosureIndex, questionIndex, key="value") => {
        let cloneApiData = { ...apiData };
        //apiData.listData[disclosureIndex].children[questionIndex].value = answer;
        apiData.listData[disclosureIndex].children[questionIndex][key] = answer;
        setApiData({
            ...cloneApiData,
        });

    }

    const onClickSaveAllChanges = async () => {
        let cloneListData = [...apiData.listData];
        let data = [];
        await cloneListData.forEach((item, itemIndex) => {
            (item.children || []).forEach((subItem, subItemIndex) => {
                if (!_isEmpty(subItem.value)) {
                    data = [...data, {
                        disclosure_kpi_id: subItem.id,
                        value: typeof subItem.value == "object" ? subItem.value.value : subItem.value,
                        value_unit: String(subItem.field_unit_values || '')
                    }];
                }
            });
        });

        const payload = { data }

        try {
            setStatusData({ type: 'loading', message: '' });
            const response = Requests.Post(`/reports/${reportId}/disclosures/${disclosureId}/data`, { data }, { organization: orgDetails.name });
            if (response) {
                setStatusData({ type: 'success', message: 'Your answers has been successfully saved' });
            }
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            navigate(-1);
        }
        setStatusData({ type: '', message: '' });

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
        <div className="main__top-wrapper m-b-1">
            <h1 className="main__title">
                Answer Questions
            </h1>
            <h1 className="main__title">
                Report Name: <b>{name}</b>
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
                <label htmlFor="create-framework__date-from" className="create-framework__label">
                    <input type="date" value={start_date} className="create-framework__input" id="create-framework__date-from" required />
                </label>
                <h1 className="create-framework__title">
                    To:
                </h1>
                <label htmlFor="create-framework__date-to" className="create-framework__label">
                    <input type="date" min={start_date} max="2100-01-01" value={end_date} className="create-framework__input" id="create-framework__date-to" required />
                </label>
            </div>
            {/* <h1 className="assign__title">
                Categories:
            </h1>
            <ul className="assign__categories">
                {radioButton.map((radioVal, i) => (<RadioButton
                    changed={radioChangeHandler}
                    id={i}
                    isSelected={_toLower(catagoryType) === _toLower(radioVal)}
                    label={radioVal}
                    value={radioVal}
                />))}
            </ul> */}
        </div>
        <ul className="assign__categories answer__detalis">
            {(apiData.listData || []).map((item, disclosureIndex) => {
                if (_toLower(item.category) === _toLower(catagoryType) || _toLower(catagoryType) === 'all') {
                    return <AnswerQuestionsTable getDisclosures={() => getDisclosures()}reportId={reportId} itemDetails={item} disclosureIndex={disclosureIndex} onClickSaveAnswer={onClickSaveAnswer} />
                }
            })
            }
        </ul>
        <div className='create-question-main-btn'>
            <button onClick={() => navigate(-1)} className="main__button m-l-1 cancel-btn">
                Back
            </button>
            <button onClick={() => onClickSaveAllChanges()} className="main__button btn-save-all-anw-change">
                SAVE ALL CHANGES
            </button>
        </div>
    </>)
}

export default AnswerQuestions;