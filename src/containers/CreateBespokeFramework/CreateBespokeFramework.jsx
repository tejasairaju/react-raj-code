import React from "react";
import { useState } from "react";
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import Fields from "../../Components/Common/Fields/Fields.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
import Requests from "../../Requests/index.js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getErrorMessage } from '../../utils/utils.js';
const { InputBox } = Fields;

const CreateBespokeFramework = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = _get(location, 'state', {});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const { isEditable = false } = params;
    const [inputValue, setInputValue] = useState({ name: '', template_type: "Custom" });
    const [apiData, setApiData] = useState();
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);

    useEffect(() => {
        if (isEditable) {
            setInputValue({ name: state.name });
        }
    }, [])

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const createTemplate = async () => {
        if (!_isEmpty(inputValue.name)) {
            try {
                let response = '';
                setStatusData({ type: 'loading', message: '' });
                if (isEditable) {
                    response = await Requests.Put(`/templates/${state.id|| ''}`, { ...inputValue }, {organization: orgDetails.name});
                } else {
                    response = await Requests.Post(`/templates/`, { ...inputValue }, {organization: orgDetails.name});
                }
                if(response) {
                setStatusData({...statusData, type: 'success', message: `Thanks! Your framework has been successfully ${isEditable ? 'updated': 'created'}` });
                setInputValue({ name: '' });
                setApiData({ ...response });
                }
            }
            catch (e) {
                let error = getErrorMessage(e);
                setStatusData({...error});
            }
        }
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success' && !isEditable) {
            navigate(`/template/${apiData.id}`);
        }
        setStatusData({});
    }

    return (<>
        <div>
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={() => onCloseHandler()} />}
            <h1><b>Create Bespoke framework</b></h1>
            <div class="Generate_Report GenerateReport-framework__overflow">

                <div class="framework__col-wrapper">
                    <div class="GenerateReport-framework__row Generate_report_head">
                        <h2 class="Generate_h1_label1">Template Name:</h2>
                        <InputBox className="GenerateReport-framework__input" name='name' value={inputValue.name} onChangeHandler={(e) => onChangeHandler(e)} />
                        {/* <InputBox className="GenerateReport-framework__input" name='name' value={inputValue.name} onChangeHandler={(e) => onChangeHandler(e)} /> */}
                    </div>
                    <div class="Generate_report_button_row create-report-btn">
                        <div class="Generate_frame"></div>
                        <button onClick={() => createTemplate()} class="Generate_button">
                            {isEditable ? 'Update' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default CreateBespokeFramework;