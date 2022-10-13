import React, { useState } from 'react';
import { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import Popup from "../../components/Common/Popup/Popup.jsx";
// import '../CreateWizard.css';
import axios from 'axios';

const { Input, TextArea, Pills, UploadFile, Button } = Fields;

const CreateDisclosures = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ code: 4343});
    const [validation, setValidation] = useState({});
    const [statusData, setStatusData] = useState({});
    const [frameworkDetails, setFrameworkdetails] = useState({});
    const [apiData, setApiData] = useState({});
    const [currentFrame, setCurrentFrame] = useState(''); // 
    const {search} = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const {id = "", disclosureId= "", isEditable = false } = params;

    useEffect(() => {
        if (!_isEmpty(params.id) && _isEmpty(frameworkDetails) && !isEditable) {
           
        } else if(isEditable){
            getDisclosures();
        }
        getframeworkDetails(params.id);
        getUserAdminInfo(1);
    }, []);


    const getDisclosures = async() => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/782e56e1-f265-4206-9c79-751691de11e2/disclosures/c7b056d8-4ccc-44bd-9971-5e46387a6c68`).then(({ data }) => data); // https://13.40.76.135/backend/esgadmin/frameworks/782e56e1-f265-4206-9c79-751691de11e2/disclosures/c7b056d8-4ccc-44bd-9971-5e46387a6c68
            setInputValue({...response, description: response.name, guidance: response.name, categories: [{name: response.category, isSelect: true}]  });
        } catch (error) {
        }
    }

    const updateArrayObjects = (array = null, key = 'isSelect', value = true) => (array || []).map(item => { item[key] = value; return item });
    const getUserAdminInfo = async () => {
        try {
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`).then(({ data }) => data);
            setInputValue({ categories: response.results });
        } catch (error) {
            console.log(error);
        }
    };

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`).then(({ data }) => data);
            setFrameworkdetails(frameDetails);
        } catch (e) {
            setFrameworkdetails({});
        }
    }

    const checkValidation = () => {
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
        } else {
            errors['guidance'] = "";
        }
        setValidation(errors);
    }

    const onNextHandler = async () => {
        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.description) && !_isEmpty(inputValue.guidance)) {
            const getSelectedCategory = (inputValue.categories || []).find(value => value.isSelect === true);
            const data = {
                name: inputValue.name,
                code: inputValue.code || 0,
                category: getSelectedCategory.name || '',
                section: inputValue.name,
                framework: params.id
            }

            try {
                const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`, data).then(({ data }) => data);
                setApiData(response);
                setInputValue({});
                setStatusData({ type: 'success', message: 'Thanks! Your account has been successfully created' });
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        } else {
            checkValidation();
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
        if (statusData.type === 'success') {
            navigate('/createquestions', {state:{ section:apiData.section ,category: apiData.category, id: apiData.id, framework: apiData.framework, code:apiData.code, name:apiData.name }});
        }
        setStatusData({ type: '', message: '' });
    }

    const frameTracker = () => (<div className="create-framework__steps">
        <div className="step__wrapper">
            <div onClick={() => setCurrentFrame('createframe')} className={`create-framework__step-position ${currentFrame === 'createframe' ? 'active' : null}`}>1</div>
            <h1 className="active">Create Framework</h1>
        </div>
        <div className="create-framework__step-line"></div>
        <div className="step__wrapper">
            <div onClick={() => setCurrentFrame('createdisclosures')} className={`create-framework__step-position ${currentFrame === 'createdisclosures' ? 'active' : null}`}>2</div>
            <h1>Create Disclosure</h1>
        </div>
        <div className="create-framework__step-line"></div>
        <div className="step__wrapper">
            <div className={`create-framework__step-position ${currentFrame === 'createquestions' ? 'active' : null}`}>3</div>
            <h1>Create Questions</h1>
        </div>
    </div>);

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper">
            <h1 className="main__title">
                {`Welcome to Create Disclosures Wizard`}
            </h1>
        </div>
        <>  <table className="default-flex-table create-disc-framework-details">
                    <tr>
                        <td>{frameworkDetails && <img src={frameworkDetails.logo || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWtyOgOolwSFP4ICk81ehw87GzUkAywrbjcZoB9ReOA&s'} alt="GRI" width={'28px'} height={'28px'} />}</td>
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
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`} error={validation['description']} label='Description' name='description' value={inputValue.description || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'guidance', false) ? 'user_input_error' : null}`} error={validation['guidance']} label='Guidance' name='guidance' value={inputValue.guidance || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            <Pills label='Categories' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'categories')} />
            <Pills label='Sectors' data={frameworkDetails['supported_sectors']} allSelect={true} onSelectMultipleOption={(i) => { }} />
            <Pills label='Sub Sectors' data={frameworkDetails['supported_sub_sectors']} allSelect={true} onSelectMultipleOption={(i) => { }} />
        </div>
        <Button label='NEXT' onClickHandler={onNextHandler} className='main__button' /> 
    </>)
}

export default CreateDisclosures;