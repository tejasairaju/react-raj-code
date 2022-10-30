import React from "react";
import { useState } from "react";
import _isEmpty from 'lodash/isEmpty';
import Fields from "../../Components/Common/Fields/Fields.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
const { InputBox, Pills } = Fields;

const CreateBespokeDisclosures = () => {
    const navigate = useNavigate();
    const { id='a69ce9a8-4ee5-493f-a750-c72a4086fc19'} = useParams();
    const initialValue = { name: '',categories: '', section: "Custom" };
    const [inputValue, setInputValue] = useState(initialValue);
    const [apiData, setApiData] = useState();
    const [statusData, setStatusData] = useState({});
    const { orgDetails = {} } = useSelector(state => state.signup);


    useEffect(() => {
        getUserAdminInfo(1);
    }, []);

    const getUserAdminInfo = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`).then(({ data }) => data);
            setInputValue({ categories: response.results });
        } catch (error) {
            console.log(error);
        }
    };
    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({...inputValue, [name]: value });
    }

    const createTemplate = async() => {
        console.log(inputValue);
        if (!_isEmpty(inputValue.name)&& !_isEmpty(inputValue.categories)) {
            try {
                const getSelectedCategory = (inputValue.categories || []).find(value => value.isSelect === true);
                const data = {
                    disclosures: [{
                    name: inputValue.name,
                    category: getSelectedCategory.name || '',
                    section: "Custom"
                    }]
                }
                const response = await axios.post(`https://13.40.76.135/backend/templates/${id}/disclosures?organization=${orgDetails.name}`, {...data}).then(({data}) => data);
                setApiData({...response});
                setStatusData({ type: 'success', message: 'Thanks! Your disclosures has been successfully created' });
                setInputValue(initialValue);  
            }
            catch (e) {
                setStatusData({ type: 'error', type: e.message });
            }
        }
    }

    const onSelectSingleOption = (index, field) => {
        let cloneObj = { ...inputValue };
        cloneObj[field] = (cloneObj[field] || []).map((item, i) => {
            if (index === i) {
                item['isSelect'] = true;
            } else {
                item['isSelect'] = false;
            }
            return item;
        });
        setInputValue({ ...cloneObj });
    }

    const onCloseHandler = () => {
        if(statusData.type === 'success') {
            navigate(`/template/${id}/disclosures/${apiData.disclosures[0].id}`, { disclosures: {...apiData.disclosures[0]}});
        }

    }

    return (<>
    <div>
    {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
    <h1><b>Create Bespoke Disclosures</b></h1>
    <div class="Generate_Report GenerateReport-framework__overflow">
          
          <div class="framework__col-wrapper">
              <div class="GenerateReport-framework__row Generate_report_head">
                  <h2 class="Generate_h1_label1"> Name:</h2>
                  <InputBox className="GenerateReport-framework__input" name='name' value={inputValue.name} onChangeHandler={(e) => onChangeHandler(e)} />
              </div>
              <div class="GenerateReport-framework__row Generate_report_head">
                  <h2 class="Generate_h1_label1">Category:</h2>
                  <Pills label='' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'categories')} />

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

export default CreateBespokeDisclosures;