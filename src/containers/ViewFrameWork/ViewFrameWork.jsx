import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ViewFrameWork.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import MoreAction from "../../Components/MoreAction/MoreAction.jsx";
import { useNavigate } from "react-router-dom";
import Requests from "../../Requests";

const { Get } = Request;

const ViewFrameWork = () => {
    const navigate = useNavigate();
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        getFramework();
    }, []);

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

    const onCloseHandler = () => {
    }

    const headers = ['Logo', 'Name', 'Description', 'Action'];

    const deleteFrameworkHandler = async({ id = '' }) => {
        try {
            const res = await Requests.Delete(
                `/esgadmin/frameworks/${id}`);
                getFramework();
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Framework {'->'} List Frameworks
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
                        {(frameworkData.results || []).map((val, index) => {
                            return (<tr>
                                <td><img src={val.logo} alt="logo" width='28px' height='28px' /></td>
                                <td>{val.name}</td>
                                <td>{val.description}</td>
                                <td>
                                    <MoreAction viewListFramework={true} value={val} index={index} deleteCallback={() => deleteFrameworkHandler(val)} />
                                    {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
        </>)
}



export default ViewFrameWork;