import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../../Components/Common/Fields/Fields.jsx';
import Popup from "../../../components/Common/Popup/Popup.jsx";
import '../CreateWizard.css';
import { useState } from 'react';
// import CreateframeworkForm from '../createFrameworkForm/createFrameWorkForm.jsx';
import axios from 'axios';
import CreateQuestions from '../CreateQuestions/CreateQuestions.jsx';

const { Input, TextArea, Pills, UploadFile, Button } = Fields;

const CreateFramework = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const [inputValue, setInputValue] = useState({});
    const [errorValidation, setErrorValidation] = useState(false);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [statusData, setStatusData] = useState({});
    const [apiData, setApiData] = useState({});
    const [currentFrame, setCurrentFrame] = useState('');
    const validation = {};
    // accordion 
    // const toke = getAccessTokenSilently(const accessToken = await getAccessTokenSilently({
    //     audience: `https://${domain}/api/v2/`,
    //     scope: "read:current_user",
    //   }););

    useEffect(() => {
        if (params.isEdit) {
            getframeworkDetails(params.id);
        } else {
            getUserAdminInfo(1);
        }

    }, []);

    const getUserAdminInfo = async () => {
        try {
            await Axios.all([
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries`),
            ]).then(([{ data: countries }, { data: sectors }, { data: categories }, { data: industries } /*{ data: subsectors }*/]) => {
                setInputValue({ countries: countries.results, sectors: sectors.results, categories: categories.results });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`).then(({ data }) => data);
            setLogo(frameDetails.logo);
            !_isEmpty(frameDetails.logo) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: frameDetails.logo });
            setInputValue({ ...frameDetails, categories:updateArrayObjects(frameDetails.supported_category), countries: updateArrayObjects(frameDetails.supported_countries), sectors: updateArrayObjects(frameDetails.supported_sectors), subsectors: updateArrayObjects(frameDetails.supported_sub_sectors) });
        } catch (e) {
            // setFrameworkdetails({});
        }
    }

    const updateArrayObjects = (array = null, key = 'isSelect', value = true) => (array || []).map(item => { item[key] = value; return item });

    const getFilterArrayValue = (data = null) => {
        let filterData = [];
        (data || []).forEach((subItem) => {
            if (subItem.isSelect === true) {
                filterData = [...filterData, subItem.id];
            }
        });
        return filterData;
    }

    const onNextHandler = async () => {
        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.description) && (inputValue.countries || []).length
            && (inputValue.categories || []).length && (inputValue.sectors || []).length) {
            const form = new FormData();
            form.append('name', inputValue.name);
            form.append('description', inputValue.description)
            if (!_isEmpty(uploadImage.fileName&&!params.isEdit)) {
                form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
            } else if(params.isEdit&&logo){
                let blob = new Blob([logo], {
                    type: "application/pdf"
                });
                form.append('logo', blob, uploadImage.fileName);
            }
            form.append('created_at', moment().format());
            form.append('updated_at', moment().format());
            const getMultiCategories = getFilterArrayValue(inputValue.categories);
            for (const a of getMultiCategories) {
                if(!_isEmpty(a)) {
                    form.append("supported_category", a);
                }
            }

            const getMultisector = getFilterArrayValue(inputValue.sectors);
            for (const a of getMultisector) {
                if(!_isEmpty(a)) {
                    form.append("supported_sectors", a);
                }
                
            }
            const getMultisubsector = getFilterArrayValue(inputValue.subsectors);
            for (const a of getMultisubsector) {
                if(!_isEmpty(a)) {
                form.append("supported_sub_sectors", a);
                }
            }
            const getMultisubcountries = getFilterArrayValue(inputValue.countries);
            for (const a of getMultisubcountries) {
                if(!_isEmpty(a)) {
                form.append("supported_countries", a);
                }
            }
            try {
                const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/frameworks`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(({ data }) => data);
                setApiData(response);
                setStatusData({ type: 'success', message: 'Thanks! Your framework has been successfully created' });
                setInputValue({});
                setLogo(null);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        } else {
            setErrorValidation(true);
        }
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

    const onSelectMultipleOption = async (index, field) => {
        let cloneInputVal = { ...inputValue }
        if (cloneInputVal[field][index].isSelect === undefined) {
            cloneInputVal[field][index].isSelect = true;
        } else {
            cloneInputVal[field][index].isSelect = !cloneInputVal[field][index].isSelect
        }
        if (field === 'sectors') {
            fetchSubSector(index, cloneInputVal);
        } else {
            setInputValue({ ...cloneInputVal });
        }
    }

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    }

    const onChangeFile = (event) => {
        const imageUrl = event.target.files[0];
        const fileName = event.target.files[0].name;
        setLogo(URL.createObjectURL(imageUrl));
        if (imageUrl) {
            setUploadImage({ fileName, imageUrl });
        }
    }

    const onChangeRemoveFile = () => {
        setLogo(null);
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success') {
            navigate(`/createdisclosures?id=${apiData.id}`);
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
                {`Welcome to Create Framework Wizard`}
            </h1>
        </div>
        <div id="createFramework" className="main__content-wrapper">
            <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`} error={validation['name']} label={'Name'} type="text" name='name' value={inputValue.name || ''} className="create-framework__input" placeholder="GRI" required={true} onChangeHandler={onChangeHandler} />
            <UploadFile label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={true} />
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`} error={validation['description']} label='Description' name='description' value={inputValue.description || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            <Pills label='Categories' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'categories')} required={true} />
            <Pills label='Sectors' data={inputValue.sectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'sectors')} required={true} />
            <Pills label='Sub Sectors' data={inputValue.subsectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'subsectors')} required={false} />
            <Pills label='Location' data={inputValue.countries} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'countries')} required={true} />
        </div>
        {errorValidation && <div className='overall-error-container color-red'>*Please fill all the required fields.</div>}
        <Button label='NEXT' onClickHandler={onNextHandler} className='main__button' />
    </>)
}

export default CreateFramework;