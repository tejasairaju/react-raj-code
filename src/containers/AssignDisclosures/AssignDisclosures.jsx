import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import AnswerQuestionsTable from "../../Components/AnswerQuestionsTable/AnswerQuestionsTable.jsx";

const { RadioButton } = Fields;
import './AssignDisclosures.css';
import { listDisclosures } from '../../../__mocks__/listDisclosures.js';
import ListFramework from "../../Components/ListFramework/ListFramework.jsx";
import CategoryFilter from "../../Components/CategoryFilter/CategoryFilter.jsx";
import UserListView from "../../Components/UserListView/UserListView.jsx";


const AssignDisclosures = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({ listData: [] });
    const [isOpen, setIsopen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [catagoryList, setCatagoryList] = useState([]);
    const [catagoryType, setCatagoryType] = useState('All');
    const [frameworkData, setFrameworkData] = useState(null);
    // const [listDisclosuresData, setListDisclosuresData] = useState([]);
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);

    useEffect(() => {
        getCatagoryList();
        // ();
    }, []);

    const getCatagoryList = () => {
        try {
            const response = axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`);
            setCatagoryList([...response.results]);
        } catch(e) {
            setCatagoryList([]);
        }

    }

    const getDisclosures = async (frameworkId) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${frameworkId}/disclosures`).then(({ data }) => data);
           
            setStatusData({ type: '', message: '' });
            return response.results || [];
            // return response.results || [];
        } catch (e) {
            return [];
        }
    }

    const radioChangeHandler = (e) => {
        const { value = '' } = e.target;
        setCatagoryType(value);
    };

    const onClickFrameworkHandler = async (indexKey, frameworkId) => {
        const data = await getDisclosures(frameworkId);
        setApiData({
            listData: [...data]
        });
    }

    const onClickSelectHandler = (e, disclosureIndex) => {
        e.preventDefault()
        let cloneApiData = { ...apiData };
        if (cloneApiData.listData[disclosureIndex]['isSelected'] == undefined) {
            cloneApiData.listData[disclosureIndex]['isSelected'] = true
        } else {
            cloneApiData.listData[disclosureIndex]['isSelected'] = !cloneApiData.listData[disclosureIndex]['isSelected'];
        }

        setApiData({ ...cloneApiData });
    }

    const onClickUserSelect = (user) => {
        console.log(user);
        setSelectedUser({...user})
    }

    const onClickAssignDisclosure = () => {
        console.log(selectedUser);
        // /reports/:id/disclosures/:disclosure_id/assign
        // {
        //     "disclosure_type": "Custom",
        //     "assigned_to": "1a540d6f-3fb3-7096-5275-7c36f8e28342",
        //     "disclosure_kpi_id": "q"
        //   }
    }

    const filterList = ['All', 'Environmental', 'Social', 'Goverance', 'General'];
    return (<>
        <div className="main__top-wrapper">
            <h1 className="main__title">
                Assign Disclosures
            </h1>
        </div>
        <div className="ans-main__assign-item">
            <ListFramework onClickFrameworkHandler={onClickFrameworkHandler} />
            <CategoryFilter filterList={filterList} filterKey={catagoryType} radioChangeHandler={radioChangeHandler} />
        </div>
        <div class="">
            <b>Disclosures:</b>
        </div>
        <div class="disclosures__wrapper list-disclosures-container">
            {_get(apiData, 'listData', []).map((disclosure, disclosureIndex) => {
                if ((_toLower(catagoryType) === _toLower('All')) || _toLower(disclosure.category) === (_toLower(catagoryType))) {
                    return (<div key={disclosureIndex} class="disclosures__item">
                        <p class="disclosures__title">
                            {disclosure.category}
                        </p>
                        <p class="disclosures__detalis">
                            {disclosure.code} &npsb;{disclosure.name}
                        </p>
                        <label for="organisational__checkbox" class="disclosures__label" onClick={(e) => onClickSelectHandler(e, disclosureIndex)}>
                            <input type="checkbox"
                                class="disclosures__checkbox"
                                id={disclosureIndex}
                                checked={disclosure.isSelected === true}
                            />
                            <div class={`fake__checkbox ${disclosure.isSelected ? 'box-checked' : null}`}>{disclosure.isSelected ? <img src="assets/icons/Arrows__checkbox.svg" width={'30px'} height={'30px'} style={{ margin: 'auto' }} /> : null}</div>
                        </label>
                    </div>)
                }
            })}
        </div>
        <UserListView onClickUserSelect={onClickUserSelect} />
        {/* <div class="user__wrapper">
            <div class="left__arrow"></div>
            <div class="user__container active">
                <img src="./assets/images/avatar_row1.jpg" alt="avatar" />
                <p class="user-name">
                    John Smith
                </p>
                <p class="job-title">
                    Admin Manager
                </p>
            </div>
            <div class="user__container">
                <img src="./assets/images/avatar_row1.jpg" alt="avatar" />
                <p class="user-name">
                    John Smith
                </p>
                <p class="job-title">
                    Admin Manager
                </p>
            </div>
            <div class="user__container">
                <img src="./assets/images/avatar_row1.jpg" alt="avatar" />
                <p class="user-name">
                    John Smith
                </p>
                <p class="job-title">
                    Admin Manager
                </p>
            </div>
            <div class="user__container">
                <img src="./assets/images/avatar_row1.jpg" alt="avatar" />
                <p class="user-name">
                    John Smith
                </p>
                <p class="job-title">
                    Admin Manager
                </p>
            </div>
            <div class="right__arrow"></div>
        </div> */}
        <div class="buttons__panel">
            <button onClick={() => onClickAssignDisclosure} class="buttons__panel-button">
                BACK
            </button>
            <button class="main__button">
                ASSIGN
            </button>
        </div>

    </>)
}

export default AssignDisclosures;