import React from "react";
import { useState } from "react";
import _isEmpty from 'lodash/isEmpty';
import Fields from "../../Components/Common/Fields/Fields.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const { InputBox } = Fields;

const CreateBespokeFramework = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ name: '', template_type:"Custom" });
    const [apiData, setApiData] = useState();
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);


    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({...inputValue, [name]: value });
    }

    const createTemplate = async() => {
        if (!_isEmpty(inputValue.name)) {
            try {
                const response = await axios.post(`https://13.40.76.135/backend/templates/?organization=${orgDetails.name}`, {...inputValue}).then(({data}) => data);
                setApiData({...response});
                setStatusData({ type: 'success', message: 'Thanks! Your framework has been successfully created' });
                setInputValue({name: ''});  
            }
            catch (e) {
                setStatusData({ type: 'error', type: e.message });
            }
        }
    }

    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            navigate(`/template/${apiData.id}`);
        }

    }

    return (<>
    <div>
    {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
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
                      Create
                  </button>
              </div>
          </div>
    </div>
    </div>
    </>)
}

export default CreateBespokeFramework;