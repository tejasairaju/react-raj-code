import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import './ViewDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import MoreAction from "../../Components/MoreAction/MoreAction.jsx";
import { listDisclosures } from '../../../__mocks__/listDisclosures.js'
const { RadioButton } = Fields;

const { Get } = Request;

const ViewDisclosures = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState(null);
    const [listData, setListData] = useState(null);
    const [isOpen, setIsopen] = useState(false);
    const [catagoryType, setCatagoryType] = useState('All');
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);


    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setListData(response.results);
                setApiData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
        getframeworkDetails();
        getDisclosures();
    }, []);

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`).then(({ data }) => data);
            setFrameworkData(frameDetails);
        } catch (e) {
            setFrameworkData({});
        }
    }

    const onCloseHandler = () => {
    }
    const radioChangeHandler = (e) => {
        const { value = '' } = e.target;
        setCatagoryType(e.target.value);
        let cloneApiData = { ...apiData };
        if (value !== 'All') {
            cloneApiData.results = (cloneApiData.results || []).filter(item => _toLower(item.category) == _toLower(value));
        }
        setListData(cloneApiData.results);
    };

    const getState = (value) => ({
        code: value.code,
        name: value.name,
        section: value.section,
        category: value.category,
        framework_id: frameworkData.id,
        disclosure_id: value.id,
        framework: frameworkData.id,
        id: value.id
    })

    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['All', 'Environmental', 'Social', 'Goverance', 'General'];

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Framework {'->'} Frameworks {'->'} List Disclosures
                </h1>
            </div>
            <table className="default-flex-table disc-framework-details">
                <tr>
                    <td>{frameworkData && <img src={frameworkData.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
                    <td>{frameworkData.name}</td>
                    <td>{frameworkData.description}</td>
                </tr>
            </table>
            <div className="diclosuer-catagory-container">
                <div><b>Catagories:</b></div>
                <div className="row-catagory-display"> {radioButton.map((radioVal, i) => (<RadioButton
                    changed={radioChangeHandler}
                    id={i}
                    isSelected={catagoryType === radioVal}
                    label={radioVal}
                    value={radioVal}
                />))}</div>

            </div>
            <div id="viewFramework" className="view-framework-container view-disclosure-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                <table className="default-flex-table">
                    <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {(listData || []).map((val, index) => {
                            return (<tr>
                                <td>{ <span>{val.name}</span>}</td>
                                <td> {val.code} &nbsp;&nbsp;{val.name}</td>
                                <td>
                                    <MoreAction viewDisclosures={true} state={getState(val)} index={index} />
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>)
}

export default ViewDisclosures;