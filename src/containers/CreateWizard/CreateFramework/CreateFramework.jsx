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
import { getErrorMessage } from '../../../utils/utils.js';
import CreateQuestions from '../CreateQuestions/CreateQuestions.jsx';
import ReactMultiSelectDropdown from '../../../Components/ReactMultiSelectDropdown/ReactMultiSelectDropdown.jsx';

const { Input, TextArea, Pills, UploadFile, Button } = Fields;

const CreateFramework = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);
    const { isEdit = false } = params;
    const [inputValue, setInputValue] = useState({ countries: '' });
    const [errorValidation, setErrorValidation] = useState(false);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [statusData, setStatusData] = useState({});
    const [apiData, setApiData] = useState({});
    const [currentFrame, setCurrentFrame] = useState('');
    const appWizard = useSelector(state => state.appWizard);
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
            // setInputValue({ countries: appWizard.countries, sectors: appWizard.sectors, categories: appWizard.categories });
        }

    }, []);

    const getUserAdminInfo = async () => {
        try {
            await Axios.all([
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries?is_active=active`),
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
            !_isEmpty(frameDetails.logo) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: frameDetails.logo });
            setInputValue({ ...frameDetails, categories: updateArrayObjects(frameDetails.supported_category), countries: constractArrayValue(frameDetails.supported_countries), sectors: updateArrayObjects(frameDetails.supported_sectors), subsectors: updateArrayObjects(frameDetails.supported_sub_sectors) });
            setLogo(frameDetails.logo);
        } catch (e) {
            // setFrameworkdetails({});
        }
    }

    const constractArrayValue = (val) => {
        let cloneData = [...val];
        cloneData = cloneData.map((item) => {
            item['label'] = item.name;
            item['value'] = item.id;
            return item;
        });
        return cloneData;
    }

    const updateArrayObjects = (array = null, key = 'isSelect', value = true) => (array || []).map(item => { item[key] = value; return item });

    // const getFilterArrayValue = (data = null) => {
    //     let filterData = [];
    //     (data || []).forEach((subItem) => {
    //         if (subItem.isSelect === true) {
    //             filterData = [...filterData, subItem.id];
    //         }
    //     });
    //     return filterData;
    // }

    const getFilterArrayValue = (data = null) => {
        let filterData = [];
        (data || []).forEach((subItem) => {
            if (subItem.isSelect === true) {
                filterData = [...filterData, subItem.id];
            }
        });
        return filterData;
    }
    const groupFilterArrayValue = (data = null) => {
        let filterData = [];
        (data || []).forEach((subItem) => {
            filterData = [...filterData, subItem.id];
        });
        return filterData;
    }

    const onSelectMultipleSelect = (field, value) => {
        setInputValue({ ...inputValue, [field]: value })
    }


    const onNextHandler = async () => {
        // console.log('>>>>>>>>', inputValue);

        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.description)
            // && (inputValue.countries || []).length > 0
            //     && (inputValue.categories || []).lengthv> 0 && (inputValue.sectors || []).length > 0
        ) {
            const form = new FormData();


            const getMultiCategories = getFilterArrayValue(inputValue.categories);
            for (const a of getMultiCategories) {
                if (!_isEmpty(a)) {
                    form.append("supported_category", a);
                }
            }

            const getMultisector = getFilterArrayValue(inputValue.sectors);
            for (const a of getMultisector) {
                if (!_isEmpty(a)) {
                    form.append("supported_sectors", a);
                }

            }
            const getMultisubsector = getFilterArrayValue(inputValue.subsectors);
            for (const a of getMultisubsector) {
                if (!_isEmpty(a)) {
                    form.append("supported_sub_sectors", a);
                }
            }
            const getMultisubcountries = groupFilterArrayValue(inputValue.countries);
            for (const a of getMultisubcountries) {
                if (!_isEmpty(a)) {
                    form.append("supported_countries", a);
                }
            }


            if (form.getAll("supported_countries").length > 0 && form.getAll("supported_sectors").length > 0
                && form.getAll("supported_category").length > 0
            ) {

                form.append('name', inputValue.name);
                form.append('description', inputValue.description)
                if (!_isEmpty(uploadImage && uploadImage.fileName) && (isEdit == false)) {
                    form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                } else if (params.isEdit && logo) {
                    if (typeof (uploadImage.imageUrl) == 'object') {
                        form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                        //form.append('profile_picture', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                    }

                    // let blob = new Blob([logo], {
                    //     type: "application/pdf"
                    // });
                    // form.append('logo', blob, uploadImage.fileName);
                }
                form.append('created_at', moment().format());
                form.append('updated_at', moment().format());

                try {
                    let response = {};
                    if (isEdit) {
                        response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`, form, {
                            headers: { "Content-Type": "multipart/form-data" }
                        }).then(({ data }) => data);
                    } else {
                        response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/frameworks`, form, {
                            headers: { "Content-Type": "multipart/form-data" }
                        }).then(({ data }) => data);
                    }

                    setApiData(response);
                    setStatusData({ type: 'success', message: `Thanks! Your framework has been successfully ${isEdit ? 'updated' : 'created'}` });
                    setInputValue({});
                    setLogo(null);
                } catch (e) {
                    let error = getErrorMessage(e);
                    setStatusData({ ...error });
                    // setStatusData({ type: 'error', message: e.message });
                }

            } else {
                setErrorValidation(true);
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
        if (statusData.type === 'success' && !isEdit) {
            navigate(`/createdisclosures?id=${apiData.id}`);
        } else if (statusData.type === 'success' && isEdit) {
            navigate(-1);
        }
        setStatusData({ type: '', message: '' });
    }

    // const seleOp = [{ label: 'INDIA', value: "INDIA" }, { label: 'INDIA_2', value: "INDIA_2" }];

    // const isOpenMultiSelect = () => {
    //     if (isEdit) {
    //         return (_get(inputValue, 'countries', []).length > 0);
    //     } else {
    //         return (_get(appWizard, 'countries', []).length > 0);
    //     }
    // }
    const isOpenMultiSelect = (key) => {
        if (isEdit) {
            return (_get(inputValue, [key], []).length > 0);
            // return (Object.keys(inputValue).indexOf(key) > -1);
            // const inputKeys=Object.keys(inputValue);
            // const isExists=inputKeys.find((item)=>item===key)
            // if(isExists)
            // return (_get(inputValue, 'countries', []).length > 0);
        } else {
            return (_get(appWizard, 'countries', []).length > 0);
        }
    }


    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div className="main__top-wrapper">
            <h1 className="main__title custom-title">
                {`Welcome to ${isEdit ? 'Update' : 'Create'} Framework Wizard`}
            </h1>
        </div>
        <div id="createFramework" className="main__content-wrapper">
            <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`} error={validation['name']} label={'Name'} type="text" name='name' value={inputValue.name || ''} className="create-framework__input" placeholder="GRI" required={true} onChangeHandler={onChangeHandler} />
            <UploadFile label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={false} />
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`} error={validation['description']} label='Description' name='description' value={inputValue.description || ''} className="create-framework__input create-framework__textarea" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            <Pills label='Categories' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'categories')} required={true} />
            <Pills label='Sectors' data={inputValue.sectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'sectors')} required={true} />
            <Pills label='Sub Sectors' data={inputValue.subsectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'subsectors')} />
            <h1 className={'create-framework__title'}>Location:</h1>
            {<ReactMultiSelectDropdown data={_get(appWizard, 'countries', [])} isEditable={isEdit} selectedOptionVal={inputValue.countries} onChangeCallback={(value) => onSelectMultipleSelect("countries", value)} />}
        </div>
        {errorValidation && <div className='overall-error-container color-red'>*Please fill all the required fields.</div>}
        <Button label={isEdit ? 'UPDATE' : 'NEXT'} onClickHandler={onNextHandler} className='main__button' />
    </>)
}

export default CreateFramework;