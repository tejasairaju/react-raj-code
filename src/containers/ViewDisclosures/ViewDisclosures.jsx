import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './ViewDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
const { RadioButton } = Fields;

const { Get } = Request;

const ViewDisclosures = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({});
    const [catagoryType, setCatagoryType] = useState();
    const [frameworkData, setFrameworkData] = useState({})
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);


    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                console.log('>>>>>>>>>>>>', response.results);
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
        setCatagoryType(e.target.value);
    };

    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['Environmental', 'Social', 'Goverance', 'General'];

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Framework {'->'} Frameworks {'->'} List Disclosures
                </h1>
            </div>
            <div className="disc-framework-details">
                <table className="default-flex-table disc-framework-details">
                    <tr>
                        <td>{frameworkData&&<img src={frameworkData.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
                        <td>{frameworkData.name}</td>
                        <td>{frameworkData.description}</td>
                    </tr>
                </table>
            </div>
            <div id="viewDisclosures" className="view-diclosuer-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                <table className="default-flex-table">
                    <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><b>Catagories:</b></td>
                            <td colspan="2" className="row-catagory-display">
                                {radioButton.map((radioVal, i) => (<RadioButton
                                    changed={radioChangeHandler}
                                    id={i}
                                    isSelected={catagoryType === radioVal}
                                    label={radioVal}
                                    value={radioVal}
                                />))}
                            </td>
                        </tr>
                        {((apiData.results || []).length > 0) ? apiData.results.map((val, index) => {
                            return (<tr>
                                <td>{(index === 0) && <span><b>Disclosures:</b></span>}</td>
                                <td> {val.code} &nbsp;&nbsp;{val.name}</td>
                                <td style={{padding: '2.5em 0 !important'}}>
                                    <div>
                                        <div tabindex="1" className="frametoggler"><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
                                        <div className="framedropdown">
                                            <div><a onClick={() => { }}>Edit</a></div>
                                            <div><a onClick={() => { }}>View Questions</a></div>
                                        </div>
                                    </div>
                                </td>
                            </tr>)
                        })
                        : <tr>
                            <td colSpan={1}><b>Disclosures:</b></td><td>-</td><td>-</td></tr>
                    }
                    </tbody>
                </table>
            </div>
        </>)
}

export default ViewDisclosures;