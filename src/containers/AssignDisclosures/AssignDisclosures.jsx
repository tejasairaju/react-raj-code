import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate, useParams } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import AnswerQuestionsTable from "../../Components/AnswerQuestionsTable/AnswerQuestionsTable.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
const { RadioButton } = Fields;
import './AssignDisclosures.css';
import { listDisclosures } from '../../../__mocks__/listDisclosures.js';
import ListFramework from "../../Components/ListFramework/ListFramework.jsx";
import CategoryFilter from "../../Components/CategoryFilter/CategoryFilter.jsx";
import UserListView from "../../Components/UserListView/UserListView.jsx";
import { useSelector } from "react-redux";

const AssignDisclosures = () => {
    const { reportId = '6b80fe4d-719d-49f7-81c1-e988b136ec2c' } = useParams();
    const { orgDetails = {} } = useSelector(state => state.signup);
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
        // getCatagoryList();
        getDisclosures();
        // ();
    }, []);

    const getCatagoryList = () => {
        try {
            const response = axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`);
            setCatagoryList([...response.results]);
        } catch (e) {
            setCatagoryList([]);
        }

    }

    const getDisclosures = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures?organization=${orgDetails.name}`).then(({ data }) => data);

            setStatusData({ type: '', message: '' });
            setApiData({...apiData, listData: [...response.disclosures] })
            // return response.disclosures || [];
            // return listDisclosures.results || [];
        } catch (e) {
            setStatusData({ type: '', message: '' });
            // return [];
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
        setSelectedUser({ ...user })
    }

    const onClickAssignDisclosure = async () => {
        const { listData = [] } = apiData;
        let filterListData = [...listData];
        let params = [];
        (filterListData || []).map(disclosure => {
            if (disclosure.isSelected === true) {
                const payload = {};
                payload['disclosure_id'] = disclosure.id;
                payload['disclosure_type'] = "Standard";
                payload['assigned_to'] = selectedUser.id;
                params = [...params, payload];
                // return {...payload}
            }
        });

        if (((params || []).length > 0) && selectedUser.id) {

            try {
                // const payload = {};
                // payload['disclosure_id'] = [...filterListData];
                // payload['disclosure_type'] = "Standard";
                // payload['assigned_to'] = selectedUser.id;
                const response = await axios.post(`${process.env.API_BASE_URL}/reports/${reportId}/disclosures/assign?organization=${orgDetails.name || 'sprint2'}`, params).then(({ data }) => data);
                setStatusData({ type: 'success', message: 'Disclosures assigned successfully' });
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
    }
    // setStatusData({ type: 'loading', message: '' });
    // for (let x = 0; x < listData.length; x++) {
    //     if (listData[x].isSelected === true) {
    //         let postData = {}
    //         postData['disclosure_type'] = 'Custom';
    //         postData['assigned_to'] = selectedUser.id;
    //         postData['disclosure_kpi_id'] = listData[x].id;
    //         let newPromise = axios({
    //             method: 'post',
    //             url: `${process.env.API_BASE_URL}/reports/${'62ad8e7f-d034-41c7-b156-a52321a2a32f'}/disclosures/${listData[x].id}/assign`,
    //             data: postData
    //         })
    //         axiosArray.push(newPromise)
    //     }

    //     axios
    //         .all(axiosArray)
    //         .then(axios.spread((...responses) => {
    //             responses.forEach(res => console.log('Success'))
    //             console.log('submitted all axios calls');
    //             setStatusData({ type: 'success', message: 'DisClosures assigned successfully' });
    //         }))
    //         .catch(error => {
    //             setStatusData({ type: 'error', message: 'Error' });
    //         })
    //}



    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            // navigate(`/task`);
        }

    }

    const filterList = ['All', 'Environmental', 'Social', 'Goverance', 'General'];
    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper assign-disclosure-title">
            <h1 className="main__title">
                <b>Assign Disclosures</b>
            </h1>
        </div>
        {/* <div class="framework-toggle-container"><button className="framework-btn-toogle toggle-active">Framework</button><button className="framework-btn-toogle">Besopke Framework</button></div> */}
        <div className="ans-main__assign-item">
            {/* <ListFramework onClickFrameworkHandler={onClickFrameworkHandler} /> */}
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
                            <div class={`fake__checkbox ${disclosure.isSelected ? 'box-checked' : null}`}>{disclosure.isSelected ? <img src="../../assets/icons/Arrows__checkbox.svg" width={'30px'} height={'30px'} style={{ margin: 'auto' }} /> : null}</div>
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
            <button onClick={() => { }} class="buttons__panel-button">
                BACK
            </button>
            <button onClick={() => onClickAssignDisclosure()} class="main__button">
                ASSIGN
            </button>
        </div>

    </>)
}

export default AssignDisclosures;