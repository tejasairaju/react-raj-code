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
import Requests from "../../Requests/index.js";
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

    // const getUserAdminInfo = async () => {
    //     try {
    //         const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`).then(({ data }) => data);
    //         setInputValue({ categories: response.results });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
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
                    response = await Requests.Put(`/templates/${id}/disclosures/${state.id}`, {...data}, orgDetails.name);
                } else {
                    response = await axios.post(`${process.env.API_BASE_URL}/templates/${id}/disclosures?organization=${orgDetails.name}`, {...data}).then(({data}) => data);
                }
                setApiData({...response});
                setStatusData({ type: 'success', message: 'Thanks! Your disclosures has been successfully created' });
                setInputValue({...initialValue});  
            }
            catch (e) {
                setStatusData({ type: 'error', message: '500 Internal Server Error' });
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
                  <div class="Generate_frame"></div>
                  <button onClick={() => createTemplate()} class="Generate_button">
                      {isEditable ? 'Update':'Create'}
                  </button>
              </div>
          </div>
    </div>
    </div>
    </>)
}

export default CreateBespokeDisclosures;