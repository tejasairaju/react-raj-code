import React, { useState } from 'react';
import { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate, useParams, useLocation } from 'react-router-dom';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
import { getErrorMessage } from '../../utils/utils.js';
import Requests from '../../Requests/index.js';
// import '../CreateWizard.css';
import axios from 'axios';

const { Input, TextArea, Pills, UploadFile, Button } = Fields;

const CreateBespokeDisclosures = (props) => {
    const { id = '' } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const stateVal = _get(location, 'state', {});
    const [inputValue, setInputValue] = useState({ code: '' });
    const [validation, setValidation] = useState({});
    const [statusData, setStatusData] = useState({});
    const [frameworkDetails, setFrameworkdetails] = useState({});
    const [apiData, setApiData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const { orgDetails = {}, loginDetails = {} } = useSelector(state => state.signup);

    const { disclosureId = "", isEditable = false } = params;

    useEffect(() => {
        if (!_isEmpty(id) && _isEmpty(frameworkDetails) && !isEditable) {
            getframeworkDetails(id);
            getUserAdminInfo(1);
        } else if (isEditable) {
            getframeworkDetails(id);
            getDisclosures();
        }
        // getframeworkDetails(id);
        // getUserAdminInfo(1);
    }, []);


    const getDisclosures = async () => {
        try {
            const response = await Requests.Get(`/templates/${id}/disclosures/${disclosureId}`, { organization: orgDetails.name }); // https://13.40.76.135/backend/esgadmin/frameworks/782e56e1-f265-4206-9c79-751691de11e2/disclosures/c7b056d8-4ccc-44bd-9971-5e46387a6c68
            setInputValue({ ...response,  categories: [{ name: response.category, isSelect: true }] });
        } catch (error) {
        }
    }

    const updateArrayObjects = (array = null, key = 'isSelect', value = true) => (array || []).map(item => { item[key] = value; return item });
    const getUserAdminInfo = async () => {
        try {
            const response = await Requests.Get(`/esgadmin/master/disclosure-categories`);
            setInputValue({...inputValue, categories: response.results });
        } catch (error) {
            console.log(error);
        }
    };

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await Requests.Get(`/templates/${id}`, { organization: orgDetails.name });
            setFrameworkdetails({...frameDetails, supported_sectors: [{name: frameDetails['supported_sectors'][0], id: '', isSelect: true}], 
            supported_sub_sectors:[{name: frameDetails['supported_sub_sectors'][0], id: '', isSelect: true}]
        });
        } catch (e) {
            setFrameworkdetails({});
        }
    }

    const checkValidation = (category= {}) => {
        let cloneInputValue = { ...inputValue };
        let errors = {};
        if (!(_get(cloneInputValue, 'name', '')).trim()) {
            errors['name'] = "Disclosures is required";
        } else {
            errors['name'] = "";
        }

        if (!_get(cloneInputValue, 'description', '').trim()) {
            errors['description'] = "Description is required";
        } else {
            errors['description'] = "";
        }
        if (!_get(cloneInputValue, 'guidance', '').trim()) {
            errors['guidance'] = "Guidance is required";
        } else if(!_isEmpty(category)) {
            errors['category'] = "Category is required";
        }
        setValidation(errors);
    }


    const onNextHandler = async () => {
        let getSelectedCategory = (inputValue.categories || []).find(value => value.isSelect === true);
        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.description) 
        && getSelectedCategory) {
            const data = {
                disclosures: [{
                name: inputValue.name,
                code: inputValue.code,
                category: getSelectedCategory.name || '',
                section: 'Custom',
                framework: id,
                children: [],
                description: inputValue.description
                }]
            }
            try {
                setStatusData({ type: 'loading', message: ''});
                let response = {};
                if (isEditable) {
                    data['children'] = inputValue.children;
                    response = await Requests.Put(`/templates/${id}/disclosures/${disclosureId}`, {...data.disclosures[0]}, { organization: orgDetails.name });
                } else {
                    // response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`, data).then(({ data }) => data);
                    response = await Requests.Post(`/templates/${id}/disclosures`, { ...data }, { organization: orgDetails.name });
                }
                if(isEditable) {
                    setApiData(response);
                } else {
                    setApiData(response.disclosures[0]);
                }        
                setInputValue({});
                setStatusData({ type: 'success', message: `Thanks! Your Disclosure ${isEditable ? 'updated' : 'created'} successfully` });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
        } else {
            checkValidation(getSelectedCategory);
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

    const fetchSubSector = async (index, cloneObject) => {
        const sectorName = inputValue.sectors[index].name;
        if ((((Object.keys(cloneObject.groupSubsectors || [])).indexOf(sectorName)) > -1)) {
            delete cloneObject.groupSubsectors[sectorName];
            setInputValue({ ...cloneObject, subsectors: [...Object.values(cloneObject['groupSubsectors'] || []).flat()] });
        } else {
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/subsectors?sector=${sectorName}`).then(res => res.data);
            setInputValue({
                ...cloneObject, groupSubsectors: {
                    ...cloneObject['groupSubsectors'],
                    [sectorName]: response.results || [],
                }, subsectors: [...Object.values(cloneObject['groupSubsectors'] || []).flat(), ...response.results]
            });
        }

    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success' && !isEditable) {
            navigate(`/template/${id}/disclosures/${apiData.id}`, {state:{...apiData}});
            // navigate(`/template/${id}/disclosures/${apiData.disclosures[0].id}`, { state: { ...apiData.disclosures[0] } });
            // navigate('/createquestions', { state: { section: apiData.section, category: apiData.category, id: apiData.id, framework: apiData.framework, code: apiData.code, name: apiData.name } });
        } else if (statusData.type === 'success' && isEditable) {
            navigate(-1)
        }
        setStatusData({ type: '', message: '' });
    }

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper">
            <h1 className="main__title">
                {`Welcome to Create Disclosures Wizard`}
            </h1>
        </div>
        <>  <table className="default-flex-table create-disc-framework-details">
            <tr>
                <td>{frameworkDetails && <img src={frameworkDetails.logo} alt="GRI" width={'28px'} height={'28px'} />}</td>
                <td>{frameworkDetails.name}</td>
                <td>{frameworkDetails.description}</td>
            </tr>
        </table></>
        <div className="main__content-wrapper">
            <h1 class="create-framework__title">
                Ref No
            </h1>
            <div class="create-framework__row-wrapper create__disclosure_ref ref__no">
                <input type="text" name='code' value={inputValue.code || ''} onChange={onChangeHandler} min="0" step=".1" className="create-framework__input" required />
                <div className='create__disclosure_container'>
                    <h1 className="create-framework__title">Disclosures<span className="color-red P-4">*</span></h1>
                    <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`} error={validation['name']} label='' type="text" name='name' value={inputValue.name || ''} className="create-framework__input create-disclosure-input" placeholder="" required={true} onChangeHandler={onChangeHandler} />
                </div>
            </div>
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`} error={validation['description']} label='Guidance' name='description' value={inputValue.description || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            {/* <TextArea inputblockcls={`user_input_block ${_get(validation, 'guidance', false) ? 'user_input_error' : null}`} error={validation['guidance']} label='Guidance' name='guidance' value={inputValue.guidance || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} /> */}
            <Pills label='Categories' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'categories')} required={true}/>
            <Pills label='Sectors' data={frameworkDetails['supported_sectors']} allSelect={true} onSelectMultipleOption={(i) => { }} />
            <Pills label='Sub Sectors' data={frameworkDetails['supported_sub_sectors']} allSelect={true} onSelectMultipleOption={(i) => { }} />
        </div>
        <Button label={isEditable ? 'UPDATE' : 'NEXT'} onClickHandler={onNextHandler} className='main__button' />
    </>)
}

export default CreateBespokeDisclosures;