import React from "react";
import { useState } from "react";
import _isEmpty from 'lodash/isEmpty';
import _get from 'lodash/get';
import _toLower from 'lodash/toLower';
import queryString from 'query-string';
import Fields from "../../Components/Common/Fields/Fields.jsx";
import Popup from "../../components/Common/Popup/Popup.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getErrorMessage } from '../../utils/utils.js';
import Requests from "../../Requests/index.js";
import './CreateBespokeDisclosures.css';
const { InputBox, Pills } = Fields;

const CreateBespokeDisclosures = () => {
    const navigate = useNavigate();
    const { id=''} = useParams();;
    const location = useLocation();
    const { orgDetails = {} } = useSelector(state => state.signup);
    const appWizard= useSelector(state => state.appWizard);

    const [apiData, setApiData] = useState({});
    const [statusData, setStatusData] = useState({});
    const initialValue = { name: '',categories: '', section: "Custom", children: [] };
    const [inputValue, setInputValue] = useState(initialValue);

    const state = _get(location, 'state', {});
    const {search} = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const { isEditable = false } = params;

  


    useEffect(() => {
        if(isEditable) {
            let cloneCategory = [...appWizard.categories];
            cloneCategory = (cloneCategory || []).map(item => {
                if(_toLower(item.name) === _toLower(state.category)) {
                    item['isSelect'] =true;
                }
                return item;
            });
            setInputValue({...initialValue, name:state.name, categories: [...cloneCategory], children: state.children  });

        } else {
            setInputValue({...initialValue,  categories: [...appWizard.categories]  });
            // getUserAdminInfo(1);
        }
    }, []);

    const onChangeHandler = (e) => {
        const { value, name } = e.target;
        setInputValue({...inputValue, [name]: value });
    }

    const createTemplate = async() => {
        console.log(inputValue);
        if (!_isEmpty(inputValue.name)&& !_isEmpty(inputValue.categories)) {
            try {
                setStatusData({ type: 'loading', message: '' });
                const getSelectedCategory = (inputValue.categories || []).find(value => value.isSelect === true);
                const data = {
                    disclosures: [{
                    name: inputValue.name,
                    category: getSelectedCategory.name || '',
                    section: "Custom",
                    children: [...initialValue.children]
                    }]
                }
                let response = {};
                if(isEditable) {                   
                    response = await Requests.Put(`/templates/${id}/disclosures/${state.id}`, {...data.disclosures[0]}, {organization:orgDetails.name});
                } else {
                    response = await Requests.Post(`/templates/${id}/disclosures`, {...data}, {organization: orgDetails.name});
                }
                setApiData({...response});
                setStatusData({ type: 'success', message: `Thanks! Your disclosures has been successfully ${isEditable? 'created' : 'updated'}` });
                setInputValue({...initialValue});  
            }
            catch (e) {
                let error = getErrorMessage(e);
                setStatusData({...error});
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
        if(statusData.type === 'success' && !isEditable) {
            navigate(`/template/${id}/disclosures/${apiData.disclosures[0].id}`, { state: {...apiData.disclosures[0]}});
        } else if(isEditable) {
            navigate(-1);
        }

        setStatusData({});
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
                  <Pills label='' data={inputValue.categories|| null} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'categories')} />

              </div>
              
              <div class="Generate_report_button_row create-report-btn">
              <button onClick={() => navigate(-1)} className="main__button m-l-1 cancel-btn">
                Back
            </button>
                  <button onClick={() => createTemplate()} className="create-template-btn">
                      {isEditable ? 'Update':'Create'}
                  </button>
              </div>
          </div>
    </div>
    </div>
    </>)
}

export default CreateBespokeDisclosures;