import React, { useState, useEffect } from "react";
import axios from 'axios';
import './ViewBespokeDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import MoreAction from "../../Components/MoreAction/MoreAction.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getDataFormat, getErrorMessage } from '../../utils/utils';
import Requests from "../../Requests";

const ViewBespokeDisclosures = () => {
    const navigate = useNavigate();
    const { template_id = '' } = useParams();
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [apiData, setApiData] = useState({});
    const [statusData, setStatusData] = useState({});
    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await Requests.Get(`/templates/${template_id}/disclosures`, { organization: orgDetails.name });
                setStatusData({ type: '', message: '' });
                setApiData({ ...response });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
        }
        getDisclosures();
    }, []);

    const onCloseHandler = () => {
    }
    const getState = (value) => ({
        code: value.code,
        name: value.name,
        section: value.section,
        category: value.category,
        framework_id: template_id,
        disclosure_id: value.id,
        framework: template_id,
        id: value.id
    })

    const headers = ['Name', 'Created At', 'Category', 'Section', 'Action'];
    const actionIcon = '../../../assets/icons/more-icon.svg';

    return (
        <>
            <div className="main__top-wrapper">
                <h1 className="main__title">
                    Edit Disclosures
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
                        {(apiData.results || []).map((val, index) => {
                            return (<tr>
                                <td>{val.name}</td>
                                <td>{getDataFormat(val.created_at)}</td>
                                <td>{val.category}</td>
                                <td>{val.section}</td>
                                <td>
                                    <MoreAction actionIcon={actionIcon} viewBespokeDisclosures={true} state={getState(val)} value={{ ...val, template_id }} index={index} />
                                </td>
                            </tr>)
                        })}
                    </tbody>
                </table>
            </div>
            <div className='create-question-main-btn'>
                <button onClick={() => navigate(-1)} className="main__button m-l-1 cancel-btn">
                    Back
                </button>
                
            </div>
        </>)
}
export default ViewBespokeDisclosures;