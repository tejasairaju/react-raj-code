import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ViewDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";

const { Get } = Request;

const ViewDisclosures = () => {
    const navigate = useNavigate();
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        const getFramework = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                setFrameworkData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }

        getFramework();
    }, []);

    const onCloseHandler = () => {
    }

    const headers = ['Name', 'Description', 'Action'];

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Framework {'->'} Frameworks {'->'} List Disclosures
                </h1>
            </div>
            <div id="viewFramework" className="view-framework-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                <table className="default-flex-table">
                    <thead>
                        <tr>
                            {headers.map(header => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {(frameworkData.results || []).map((val) => {
                            return (<tr>
                                <td><img src="assets/images/logo-row.jpg" alt="logo" width='28px' height='28px' /></td>
                                <td>{val.name}</td>
                                <td>{val.description}</td>
                                <td>
                                    <div>
                                        <div tabindex="1" className="frametoggler"><img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /></div>
                                        <div className="framedropdown">
                                        <div><a onClick={() => {}}>Edit</a></div>
                                        </div>
                                    </div>
                                    {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>)
}

export default ViewDisclosures;