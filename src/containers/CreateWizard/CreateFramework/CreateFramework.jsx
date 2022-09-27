import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
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
    const [inputValue, setInputValue] = useState({});
    const [validation, setValidation] = useState({});
    const [logo, setLogo] = useState(null);
    const [imageForm, setImageForm] = useState(null);
    const [statusData, setStatusData] = useState({});
    const [createFrameResponse, setCreateFrameResponse] = useState({});
    const [currentFrame, setCurrentFrame] = useState('');
    // accordion 
    // const toke = getAccessTokenSilently(const accessToken = await getAccessTokenSilently({
    //     audience: `https://${domain}/api/v2/`,
    //     scope: "read:current_user",
    //   }););

    useEffect(() => {
        const getUserAdminInfo = async () => {
            try {
                await Axios.all([
                    Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries`),
                    Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors`),
                    Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`),
                    Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries`),
                ]).then(([{ data: countries }, { data: sectors }, { data: categories }, { data: industries } /*{ data: subsectors }*/]) => {
                    console.log('Response::::::::::::', countries, sectors, categories);
                    setInputValue({ countries: countries.results, sectors: sectors.results, categories: categories.results });
                });
            } catch (error) {
                console.log(error);
            }
        };
        getUserAdminInfo(1);
    }, []);

    const getFilterArrayValue = (data = null) => {
        let filterData = [];
        (data || []).forEach((subItem) => {
            if (subItem.isSelect === true) {
                filterData = [...filterData, subItem.id];
            }
        });
        return filterData;
    }

    const checkValidation = () => {
        let cloneInputValue = { ...inputValue };
        let errors = {};
        if (!(_get(cloneInputValue, 'name', '')).trim()) {
            errors['name'] = "GRI is required";
        } else if (!(_get(cloneInputValue, 'name', '')).trim()) {
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
            if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.description)) {
                const payload = {
                    name: inputValue.name,
                    description: inputValue.description,

                    // logo: "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20220926%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220926T170732Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=5f14b20e01ab610073ee783f675ccea5d932bc09a9b6204e25d21c2e6befe06c",
                    created_at: moment().format(),
                    updated_at: moment().format(),
                    supported_countries: getFilterArrayValue(inputValue.countries),
                    supported_category: getFilterArrayValue(inputValue.categories),
                    supported_sectors: getFilterArrayValue(inputValue.sectors),
                    supported_sub_sectors: getFilterArrayValue(inputValue.subsectors)
                }

                try {
                    // let data = new FormData();
                    // data.append("data", imageForm);
                    // payload['logo'] = data;
                    // const response = await axios({
                    //     method: 'post',
                    //     mode: 'no-cors',
                    //     body: data,
                    //     headers: {
                    //         "Content-Type": "multipart/form-data",
                    //         "Accept": "application/json",
                    //         "type": "formData"
                    //     },
                    //     url: `${process.env.API_BASE_URL}/esgadmin/frameworks`,
                    // }).then(({ data }) => data);
                    const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/frameworks`, payload).then(({ data }) => data);
                    setCreateFrameResponse(response);
                    setStatusData({ type: 'success', message: 'Thanks! Your account has been successfully created' });
                    setInputValue({});
                    navigate(`/manageframework`);
                } catch (e) {
                    setStatusData({ type: 'error', message: e.message });
                }
            } else {
                checkValidation();
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
        const imageObj = event.target.files[0];
        setLogo(URL.createObjectURL(imageObj));
        setImageForm(imageObj);
        if (imageObj) {
            // const formData = new FormData();
            // formData.append('dataFile', imageObj, imageObj.name);
            // setImageForm(formData);

            // axios.post(BASE_URL + 'uploadfile', formData).then(response => {
            //     this.setState({
            //         handleResponse: {
            //             isSuccess: response.status === 200,
            //             message: response.data.message
            //         },
            //         imageUrl: BASE_URL + response.data.file.path
            //     });
            // }).catch(err => {
            //     alert(err.message);
            // });
        }
    }

    const onChangeRemoveFile = () => {
        setLogo(null);
    }
    const onCloseHandler = () => {
        if (statusData.type === 'success') {
            (currentFrame === 'createframe') && setCurrentFrame('createdisclosures');
            (currentFrame === 'createdisclosures') && setCurrentFrame('createquestions');
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
                {`Welcome to Create ${currentFrame === 'createframe' ? "Framework" : `${currentFrame === 'createdisclosures' ? 'Disclosures' : 'Questions'}`} Wizard`}
            </h1>
        </div>
        <div className="main__content-wrapper">
            <Input inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`} error={validation['name']} label={'Name'} type="text" name='name' value={inputValue.name || ''} className="create-framework__input" placeholder="GRI" required={true} onChangeHandler={onChangeHandler} />
            <UploadFile label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} />
            <TextArea inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`} error={validation['description']} label='Description' name='description' value={inputValue.description || ''} className="create-framework__input" placeholder="" required={true} onChangeHandler={onChangeHandler} />
            <Pills label='Categories' data={inputValue.categories} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'categories')} />
            <Pills label='Sectors' data={inputValue.sectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'sectors')} />
            <Pills label='Sub Sectors' data={inputValue.subsectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'subsectors')} />
            <Pills label='Location' data={inputValue.countries} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'countries')} />

        </div>
        <Button label='NEXT' onClickHandler={onNextHandler} className='main__button' />
    </>)
}

export default CreateFramework;