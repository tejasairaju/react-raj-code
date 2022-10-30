import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
import './CreateReport.css';
import ListFramework from "../../Components/ListFramework/ListFramework.jsx";
import { useSelector } from "react-redux";

const { InputBox } = Fields
const CreateReport = () => {
    const navigate = useNavigate();
    const { orgDetails = {} } = useSelector(state => state.signup);
    const initialInputVal = { name: '', start_date: '', end_date: '', frameworks: null };
    const [inputValue, setInputValue] = useState(initialInputVal);
    const [reportData, setReportData] = useState({});
    const [statusData, setStatusData] = useState({});

    const onClickFrameworkHandler = async (indexKey, frameworkId) => {
        // console.log('::::::::::::::framework', frameworkId);
        setInputValue({ ...inputValue, frameworks: [frameworkId] });
    }

    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            navigate(`/report/${reportData.id}/disclosures`);
        }
    }

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const onClickCreateReportHandler = async () => {
        if (inputValue.name && inputValue.start_date && inputValue.end_date) {
            try {
                const payload = {
                    ...inputValue,
                    status: 'Standard'
                };
                const response = await axios.post(`${process.env.API_BASE_URL}/reports/?organization=${orgDetails.name}`, payload).then(({data}) => data);
                setReportData({...response});
                setStatusData({ type: 'success', message: 'Thanks! Your framework report has been successfully created' });
                setInputValue(initialInputVal);  
            }
            catch (e) {
                setStatusData({ type: 'error', type: e.message });
            }
        }
    }

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper assign-disclosure-title">
            <h1 className="main__title">
                <b>Generate Report</b>
            </h1>
        </div>
        <div class="Generate_Report GenerateReport-framework__overflow">
            <div class="GenerateReport-framework__row">
                <h2>Choose a Framework</h2>
            </div>

            <div class="framework__col-wrapper">

                {/* <div class="GenerateReport-framework__row"> */}
                <ListFramework label={null} onClickFrameworkHandler={onClickFrameworkHandler} />
                {/* </div> */}

                <div class="Generate_Report GenerateReport1-framework__row">
                    <h1>Choose Report Name and Report Period</h1>
                </div>

                <div class="GenerateReport-framework__row Generate_report_head">
                    <h2 class="Generate_h1_label1">Report Name:</h2>
                    <InputBox className="GenerateReport-framework__input" name='name' value={inputValue.name} onChangeHandler={(e) => onChangeHandler(e)} />
                    {/* <input type="text" class="GenerateReport-framework__input" required /> */}
                </div>
                {/* <div className="create-framework__row-wrapper dates">
                    <div>
                        <h1 className="create-framework__title">
                            From:
                        </h1>
                        <label for="create-framework__date-from" className="create-framework__label">
                            <input type="date" className="GenerateReport-framework__input" id="create-framework__date-from" required />
                            <img src="./assets/icons/celendar.svg" alt="" />
                        </label>
                    </div>
                    <div class='date-label-container'>
                        <h1 className="create-framework__title">
                            To:
                        </h1>
                        <label for="create-framework__date-to" className="create-framework__label">
                            <input type="date" className=" GenerateReport-framework__input" id="create-framework__date-to" required />
                            <img src="./assets/icons/celendar.svg" alt="" />
                        </label>
                    </div>
                </div> */}

                <div class="Generate_report_head">
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">From :</h1>
                            <input type="date" name={'start_date'} value={inputValue.start_date} onChange={(e) => onChangeHandler(e)} class="GenerateReport-framework__input" required />
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">To :</h1>
                            <input type="date" name={'end_date'} value={inputValue.end_date} onChange={(e) => onChangeHandler(e)} class="GenerateReport-framework__input" required />
                        </div>
                    </div>
                </div>

                <div class="Generate_report_button_row create-report-btn">

                    {/* <button class="Generate_button btn_generate">
                        DownloadReport
                    </button> */}
                    <div class="Generate_frame"></div>
                    <button onClick={() => onClickCreateReportHandler()} class="Generate_button">
                        Create
                    </button>
                </div>
            </div>
        </div>


    </>)
}

export default CreateReport
    ;