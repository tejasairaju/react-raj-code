
import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './ViewBespokeQuestions.css';
import Requests from "../../Requests";
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import CreateQuestions from "../CreateWizard/CreateQuestions/CreateQuestions.jsx";
import QuestionHeader from "../../Components/QuestionHeader/QuestionHeader.jsx";
import QuestionsTable from "../../Components/QuestionsTable/QuestionsTable.jsx";
import MoreAction from "../../Components/MoreAction/MoreAction.jsx";
import { getErrorMessage } from '../../utils/utils';
import { useSelector } from "react-redux";
import CreateBespokeQuestions from "../CreateBespokeQuestions/CreateBespokeQuestions.jsx";
const { RadioButton } = Fields;

const ViewBespokeQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { template_id = '', disclosure_id = '' } = useParams();
    const state = _get(location, 'state', {});
    const { code = "", name = "" } = state || {};
    const { orgDetails = {} } = useSelector(state => state.signup);
    // const { dataType, inputType, unitType } = questions;
    const [frameworkData, setFrameworkData] = useState({});
    const [statusData, setStatusData] = useState({});
    const initialRow = { order: null, code: '', label: "", type: '', field_type: '', field_unit_values: '', evidence: null, value: null };
    const initialFieldOptions = { selectedDropDownVal: null, setFieldIndex: null }
    const [inputList, setInputList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [fieldOptions, setFieldOptions] = useState(initialFieldOptions);


    useEffect(() => {
        // const getDisclosures = async () => {
        //     try {
        //         setStatusData({ type: 'loading', message: '' });
        //         const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
        //         setStatusData({ type: '', message: '' });
        //         setApiData(response);
        //     } catch (e) {
        //         let error = getErrorMessage(e);
        //         setStatusData({...error});
        //     }
        // }
        getAllQuestions();
        getframeworkDetails();
    }, []);

    const getAllQuestions = async () => {
        try {
            const response = await Requests.Get(`/templates/${template_id}/disclosures/${disclosure_id}`, {organization: orgDetails.name});
            setInputList([...response.children]);
        } catch (e) {
            setInputList([]);
        }
    }

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}`).then(({ data }) => data);
            setFrameworkData(frameDetails);
        } catch (e) {
            setFrameworkData({});
        }
    }

    const onCloseHandler = () => {
        setStatusData({ type: '', message: ''});
        if(statusData.type === 'success') {
            navigate(-1);
        }
    }

    const onUpdateQuestions = async(payload, editedQuestionList = []) => {
        setStatusData({ type: 'loading', message: '' });
        if ((editedQuestionList || [].length > 0)) {
            try {
                const response = await Requests.Patch(`/templates/${template_id}/disclosures/${disclosure_id}`, payload, { organization: orgDetails.name});
                // axios.put(`/templates/${template_id}/disclosures/${disclosure_id}`, payload, { organization: orgDetails.name}).then(({ data }) => data);
                setStatusData({ type: 'success', message: 'Thanks! Your questions has been successfully updated' });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
        }
    }

    return (
        <>
            <div className="main__top-wrapper">
                {/* <h1 className="main__title">
                    Edit Questions
                </h1> */}
            </div>
            {/* <div className="disc-framework-details"> */}
            {/* <table className="default-flex-table disc-framework-details">
                <tr>
                    <td>{frameworkData && <img src={frameworkData.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
                    <td>{frameworkData.name}</td>
                    <td>{frameworkData.description}</td>
                </tr>
            </table> */}
            {/* </div> */}
            <div id="viewQuestions" className="view-questions-container">
                {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
                {((inputList||[]).length > 0)&&<CreateBespokeQuestions title="View/Edit Bespoke Questions" isTemplate={true} createQuestions={false} questionList={inputList} onUpdateQuestions={onUpdateQuestions} />}
               
            </div>
            {/* <div className='create-question-main-btn'>
                <button onClick={() => navigate(-1)} className="main__button m-l-1 cancel-btn">
                    Back
                </button>
                
            </div> */}
        </>)
}

export default ViewBespokeQuestions;