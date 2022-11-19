import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
import './CreateReport.css';
import ListFramework from "../../Components/ListFramework/ListFramework.jsx";
import { getErrorMessage } from '../../utils/utils.js';
import { useSelector } from "react-redux";
import Requests from "../../Requests/index.js";

const { InputBox } = Fields
const CreateReport = () => {
    const navigate = useNavigate();
    const { orgDetails = {} } = useSelector(state => state.signup);
    const initialInputVal = { name: '', start_date: '', end_date: '' };
    const [inputValue, setInputValue] = useState(initialInputVal);
    const [error, setError] = useState('');
    const [isCustomeFramework, setIsCustomeFramework] = useState(true);
    const [reportData, setReportData] = useState({});
    const [statusData, setStatusData] = useState({});

    const onClickFrameworkHandler = async (indexKey = null, frameworkId = '') => {
        // console.log('::::::::::::::framework', frameworkId);
        let data = null;
        if(isCustomeFramework) {
            data = {
                frameworks: [frameworkId]
            };
        } else {
            data = {
                template: frameworkId
            };
        }


        setInputValue({ ...inputValue, ...data });
    }
    const onChangeToggle = () => {
        setInputValue({ ...initialInputVal, frameworks: null });
    }

    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            navigate(`/report/${reportData.id}/disclosures?framework_type=${isCustomeFramework ? 'Standard':'Custom' }`);
        }
        setInputValue({...initialInputVal});
        setStatusData({ });
    }

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const handleErrorMessage = () => {
        const error = {};
        const cloneInputVal = {...inputValue};
        if(_isEmpty(cloneInputVal.frameworks)) {
            setError('Please choose any framework.');
        } else if(_isEmpty(cloneInputVal.name)) {
            setError('Please enter report name.');
        } else  {
            setError('Please select Date.');
        }
    }

    const onClickCreateReportHandler = async () => {
        console.log('????>>>>>', inputValue);
        if (inputValue.name && inputValue.start_date && inputValue.end_date&&inputValue.frameworks) {
            setStatusData({ type: 'loading', message: ''});
            try {
                let payload = null;
                if(isCustomeFramework) {
                    payload = {
                        ...inputValue,
                    status: 'Standard'
                    } 
                }else {
                    let cloneInputValue = {...inputValue};
                    delete cloneInputValue.frameworks;
                    payload = {
                        ...cloneInputValue,
                    status: 'Custom'
                    }     
                }
                const response = await Requests.Post(`/reports/`,payload, {organization:orgDetails.name});
                // const payload = {
                //     ...inputValue,
                //     status: 'Standard'
                // };
                // const response = await axios.post(`${process.env.API_BASE_URL}/reports/?organization=${orgDetails.name}`, payload).then(({data}) => data);
                setStatusData({ type: 'success', message: 'Thanks! Your framework report has been successfully created' });
                setReportData({...response});
                setInputValue({...initialInputVal});  
            }
            catch (e) {
                let error = getErrorMessage(e);
                setStatusData({...error});
                // setInputValue({...initialInputVal}); 
            }
        } else {
            handleErrorMessage();
        }
    }

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper assign-disclosure-title">
            <h2>
                <b>Framework</b>
            </h2>
        </div>
        <div class="Generate_Report GenerateReport-framework__overflow">
            <div class="GenerateReport-framework__row">
                <h2>Choose a Framework</h2>
            </div>

            <div class="framework__col-wrapper">

                {/* <div class="GenerateReport-framework__row"> */}
                <ListFramework isCustomeFramework={isCustomeFramework} setIsCustomeFramework={setIsCustomeFramework} label={null} onClickFrameworkHandler={onClickFrameworkHandler} onChangeToggle={onChangeToggle} />
                {/* </div> */}

                <div class="Generate_Report GenerateReport1-framework__row">
                    <h1>Assign Report Name and Period</h1>
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
                            <label for="create-framework__date-from" className="create-framework__label report-cal-input-box">
                            <input type="date" name={'start_date'} min="2000-01-01" value={inputValue.start_date} onChange={(e) => onChangeHandler(e)} class="GenerateReport-framework__input" required />
                            <img src="../../assets/icons/celendar.svg" alt="" className="report-calender-icon" />
                        </label>
                        </div>
                    </div>
                    <div class="GenerateReport-framework__row">
                        <div class="GenerateReport_row">
                            <h1 class="Generate_h1_label">To :</h1>
                            <label for="create-framework__date-from" className="create-framework__label report-cal-input-box">
                            <input type="date" name={'end_date'} max="2100-01-01" value={inputValue.end_date} onChange={(e) => onChangeHandler(e)} class="GenerateReport-framework__input" required />
                            <img src="../../assets/icons/celendar.svg" alt="" className="report-calender-icon" />
                        </label>
                        </div>
                    </div>
                </div>

                <div class="Generate_report_head color-red">
                    {!_isEmpty(error)&&<>* {error}</>}
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