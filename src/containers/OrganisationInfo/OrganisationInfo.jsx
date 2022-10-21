import React, { useState, useEffect } from 'react';
import './OrganisationInfo.css';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { empCount } from '../../utils/constants.js';
import axios from 'axios';
import EsgImageNavBar from '../../components/EsgImageNavBar/EsgImageNavBar.jsx';
import Popup from '../../components/Common/Popup/Popup.jsx';

const { Input, TextArea, Pills, UploadFile, Button, InputBox, Label, Dropdown, TextAreaBox } = Fields;
const OrganisationInfo = () => {
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
                setInputValue({ operating_countries: countries.results, sectors: sectors.results,  });
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
            setInputValue({ ...frameDetails, categories: updateArrayObjects(frameDetails.supported_category), countries: updateArrayObjects(frameDetails.supported_countries), sectors: updateArrayObjects(frameDetails.supported_sectors), subsectors: updateArrayObjects(frameDetails.supported_sub_sectors) });
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

    const onSaveHandler = async () => {
        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.email) && (inputValue.operating_countries || []).length
            && (inputValue.sectors || []).length && inputValue.employees_count) {
            const form = new FormData();
            form.append('name', inputValue.name);
            form.append('headquarters', inputValue.headquarters)
            form.append('mobile_number', inputValue.mobile);
            form.append('zip_code', inputValue.zipcode);
            form.append('email', inputValue.email);
            form.append('address', inputValue.address);
            form.append('employees_count', inputValue.employees_count);
            if (!_isEmpty(uploadImage.fileName)) {
                form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
            }
            form.append('created_at', moment().format());
            form.append('updated_at', moment().format());

            const getMultisector = getFilterArrayValue(inputValue.sectors);
            for (const a of getMultisector) {
                if (!_isEmpty(a)) {
                    form.append("sectors", a);
                }

            }
            const getMultisubsector = getFilterArrayValue(inputValue.subsectors);
            for (const a of getMultisubsector) {
                if (!_isEmpty(a)) {
                    form.append("sub_sectors", a);
                }
            }
            const getMultisubcountries = getFilterArrayValue(inputValue.operating_countries);
            for (const a of getMultisubcountries) {
                if (!_isEmpty(a)) {
                    form.append("supported_countries", a);
                }
            }
            try {
                const response = await axios.post(`${process.env.API_BASE_URL}/organizations`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(({ data }) => data);
                setApiData(response);
                setStatusData({ type: 'success', message: 'Thanks! Your organizations has been successfully created' });
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
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...inputList];
        if (name !== 'field_unit_values') {
            list[index][name] = value;
        } else {
            list[index][name] = [value];
        }
        list[index]['order'] = index;
        setInputList(list);
        if (['Dropdown', 'Radio button', 'Multiselect'].indexOf(value) > -1) {
            setFieldOptions({ selectedDropDownVal: value, setFieldIndex: index });
        }
    };
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
            navigate(`/`);
        } else {
            navigate(`/`);
        }
       
        setStatusData({ type: '', message: '' });
    }

    const OrgInputFields = (label = '', labelRequired = false, inputName = '', inputVal = '', labelCls = '') => (
        <div class="framework__row">
            <Label label={label} required={labelRequired} />
            <InputBox name={inputName} value={inputVal} onChangeHandler={onChangeHandler} />
        </div>
    );

    return (
        <>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
          <EsgImageNavBar />
         <section className="right-section acc-info">
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    Organization Information
                </h1>
            </div>
            <div class="client-main__content-wrapper content-wrapper">
                <div class="framework__row-wrapper bot1">
                    <UploadFile imgcls={'org-image-size'} label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={true} />
                    <div class="framework__row"></div>
                    <div class="framework__row"></div>
                </div>
                <div class="framework__row-wrapper bot1">
                    {OrgInputFields('Company', true, 'name', inputValue.name)}
                    <div class="framework__row">
                        <Label label={'Location'} className={`framework__title right`} required={true} />
                        <InputBox name={'location'} value={inputValue.location} onChangeHandler={onChangeHandler} />
                    </div>
                </div>
                <div class="framework__row-wrapper bot1">
                    <div class="framework__row">
                        <div class="framework__col-wrapper">
                            <div class="framework__row bot1">
                                <Label label={'Headquarters'} required={true} />
                                <InputBox name={'headquarters'} value={inputValue.headquarters} onChangeHandler={onChangeHandler} />
                            </div>

                            <div class="framework__row">
                                <Label label={'Employee'} required={true} />
                                <Dropdown className_1={'framework__input'} className_2={''} options={empCount} name='employees_count' value={inputValue.employees_count || ''} onChangeHandler={(e) => onChangeHandler(e)} />
                            </div>
                        </div>
                    </div>

                    <div class="framework__row">
                        <Label label={'Address'} className={"framework__title right address_title"} required={true} />
                        <TextAreaBox label='' name='address' value={inputValue.address} className="framework__input" placeholder="" required={true} onChangeHandler={(e) => onChangeHandler(e)} />
                    </div>
                </div>
                <div class="framework__row-wrapper bot1">
                    <div class="framework__row">
                        <h1 class="framework__title"><b>Sector</b></h1>
                        <Pills label='' data={inputValue.sectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'sectors')} required={true} />
                    </div>
                    <div class="framework__row">
                        <h1 class="framework__title right"><b>SubSector</b></h1>
                        <Pills label='' data={inputValue.subsectors} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'subsectors')} required={false} />
                    </div>
                </div>
                <div class="framework__row-wrapper bot1">
                    <div class="framework__row">
                        <Label label={'Email'} required={true} />
                        <InputBox name={'email'} value={inputValue.email} onChangeHandler={onChangeHandler} />
                    </div>

                    <div class="framework__row">
                        <Label className="framework__title right" label={'Mobile'} required={true} />
                        <InputBox maxLength={10} text="number" name={'mobile'} value={inputValue.mobile} onChangeHandler={onChangeHandler} />

                    </div>
                </div>

                <div class="framework__row-wrapper bot40">
                    <div class="framework__row">
                        <Label label={'Country'} required={true} />
                        <Pills label='' data={inputValue.operating_countries} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'operating_countries')} required={true} />
                    </div>

                    <div class="framework__row">
                        <Label label={'Zip/PostalCode'} lassName="framework__title right" required={true} />
                        <InputBox text="number" maxLength={6} name={'zipcode'} value={inputValue.zipcode} onChangeHandler={onChangeHandler} />

                    </div>
                </div>
            </div>
            <button onClick={() =>onSaveHandler()} class="main__button">
                SAVE
            </button>
            </section>
        </>
    );
}

export default OrganisationInfo;