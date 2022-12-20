import React, { useState, useEffect, useMemo } from 'react';
import './OrganisationInfo.css';
import _isEmpty from 'lodash/isEmpty';
import _lower from 'lodash/lowerCase';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { empCount } from '../../utils/constants.js';
import { getErrorMessage } from '../../utils/utils.js'
import axios from 'axios';
import Requests from '../../Requests';
import EsgImageNavBar from '../../components/EsgImageNavBar/EsgImageNavBar.jsx';
import ReactMultiSelectDropdown from '../../Components/ReactMultiSelectDropdown/ReactMultiSelectDropdown.jsx';
import Popup from '../../components/Common/Popup/Popup.jsx';

const { Input, TextArea, Pills, UploadFile, Button, InputBox, Label, Dropdown, TextAreaBox } = Fields;
const OrganisationInfo = () => {
    const { orgDetails = {} } = useSelector(state => state.signup);
    const appWizard = useSelector(state => state.appWizard);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { search } = _get(window, 'location', '?');
    const { isEditable = false } = queryString.parse(search);
    const [inputValue, setInputValue] = useState({ name: orgDetails.name });
    const [organizationInfo, setOrganizationInfo] = useState({});
    // const [errorValidation, setErrorValidation] = useState(false);
    const [error, setError] = useState(false);
    const [logo, setLogo] = useState(null);
    const [uploadImage, setUploadImage] = useState(null);
    const [filterSubSectors, setFilterSubSectors] = useState([]);
    const [selectetSector, setSelectedSector] = useState([]);
    const [statusData, setStatusData] = useState({});
    const [apiData, setApiData] = useState({});
    const [currentFrame, setCurrentFrame] = useState('');
    const [logoSizeError, setLogoSizeError] = useState(false);

    const validation = {};
    // accordion 
    // const toke = getAccessTokenSilently(const accessToken = await getAccessTokenSilently({
    //     audience: `https://${domain}/api/v2/`,
    //     scope: "read:current_user",
    //   }););

    useEffect(() => {
        if (isEditable) {
            // getframeworkDetails(params.id);
            getOrganisation();
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
                setInputValue({ ...inputValue, operating_countries: countries.results, sectors: sectors.results, });
            });
        } catch (error) {
            console.log(error);
        }
    };

    const getOrganisation = async (id = "") => {
        try {
            const orgInfo = await Requests.Get(`/organizations/${orgDetails.name}`);
            setLogo(orgInfo.logo);
            setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: orgInfo.logo });
            !_isEmpty(orgInfo.logo) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: orgInfo.logo });
            const constractInputVal = {
                ...inputValue, ...orgInfo, employees_count: orgInfo.employees_count,
                mobile: orgInfo.mobile_number,
                location: orgInfo.location,
                headquarters: orgInfo.headquarters,
                zipcode: orgInfo.zip_code,
                subsectors: constractArrayValue(orgInfo.sub_sectors, appWizard.subsectors),
                sectors: constractArrayValue(orgInfo.sectors, appWizard.sectors) /*, subsectors: getSelectedSubSector(appWizard.sectors, orgInfo.sectors, orgInfo.supported_sub_sectors)*/
            };
            setInputValue(constractInputVal);
        } catch (e) {
            // setFrameworkdetails({});
        }
    }

    const constractArrayValue = (selectedArray = [], listArray = []) => {
        let cloneListArray = [...listArray];
        let cloneSelectedArray = [...selectedArray];
        cloneListArray = (cloneListArray || []).filter(item => {
            if ((cloneSelectedArray || []).indexOf(item.id) > -1) {
                return item;
            }
        });
        return cloneListArray
    }

    // The below function will execute while edit this page
    const getSelectedSubSector = async (selectedSectorArray = null, selectedSubSector = [], overallObj) => {
        let groupSubsectors = {};
        let spreadsubsectors = [];
        await (appWizard.sectors || []).map(async (item, index) => {
            let constractInputVal = { ...overallObj };
            if ((selectedSectorArray || []).indexOf(item.id) > -1) {
                let sectorName = item.name;
                if ((((Object.keys(groupSubsectors || {})).indexOf(sectorName)) > -1)) {
                    delete groupSubsectors[sectorName];
                    spreadsubsectors = [...Object.values(groupSubsectors['groupSubsectors'] || []).flat()];
                } else {
                    let response = await Requests.Get(`/esgadmin/master/subsectors`, { sector: sectorName });
                    if ((selectedSubSector || []).length > 0) {
                        response.results = (response.results).map(subItem => {
                            if ((selectedSubSector || []).indexOf(subItem.id) > -1) {
                                item['isSelect'] = true;
                                return subItem;
                            }
                            return subItem;
                        });
                    }
                    let clonegroupSubsectors = { ...groupSubsectors };
                    groupSubsectors = { ...clonegroupSubsectors, [sectorName]: response.results || [] };
                    spreadsubsectors = [...response.results];
                }
            }
            setInputValue({ ...constractInputVal, groupSubsectors, subsectors: [...spreadsubsectors] });
        });

    };
    const updateSubSectorList = (sector = []) => {
        let cloneSector = [...sector];
        let cloneSubsectors = [..._get(appWizard, 'subsectors', [])];
        let sectorNameList = cloneSector.map(sector => sector.name);
        cloneSubsectors = cloneSubsectors.filter((value) => (sectorNameList).indexOf(_get(value, 'sector.name', '')) > -1);
        setFilterSubSectors(cloneSubsectors);
        setSelectedSector(sectorNameList);
    }

    const groupFilterArrayValue = (data = null) => {
        let filterData = [];
        (data || []).forEach((subItem) => {
            filterData = [...filterData, subItem.id];
        });
        return [...new Set(filterData)];;
    }

    const onSelectMultipleSelect = (field, selectedArray, event) => {
        let cloneInputValue = { ...inputValue };
        if (field === 'sectors') {
            let sectorList = [];
            if (event.action === 'select-option') {
                sectorList = [...selectetSector, _get(event, 'option.label', '')];
            } else {
                sectorList = [...selectetSector];
                let removeItem = _get(event, 'removedValue.label', '');
                let index = (sectorList || []).indexOf(removeItem);
                sectorList.splice(index, 1);

                // remove already Selected subsector while remove sector
                let alreadySlectedSubSector = [..._get(cloneInputValue, 'subsectors', [])];
                alreadySlectedSubSector = alreadySlectedSubSector.filter(subSector => _lower(subSector.name) != _lower(removeItem));
                cloneInputValue['subsectors'] = alreadySlectedSubSector;
            }
            let cloneSubsectors = [..._get(appWizard, 'subsectors', [])];
            cloneSubsectors = cloneSubsectors.filter((value) => (sectorList).indexOf(_get(value, 'sector.name', '')) > -1);
            setFilterSubSectors(cloneSubsectors);
            setSelectedSector(sectorList);
        }
        setInputValue({ ...cloneInputValue, [field]: selectedArray });
    }

    const updateArrayObjects = (parantArray = null, selectedArray = null, key = 'isSelect', value = true, selectedSubSector = []) => {
        parantArray = (parantArray || []).map((item, index) => {
            if ((selectedArray || []).indexOf(item.id) > -1) {
                item[key] = value;
                return item;
            }
            return item;
        });
        return parantArray;
    }

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
        if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.email) && !_isEmpty(uploadImage.fileName) && !_isEmpty(logo)
            && (inputValue.sectors || []).length && inputValue.employees_count && inputValue.headquarters && inputValue.mobile
            && inputValue.address) {
            const form = new FormData();
            form.append('name', inputValue.name);
            form.append('headquarters', inputValue.headquarters)
            form.append('mobile_number', inputValue.mobile);
            form.append('zip_code', inputValue.zipcode);
            form.append('email', inputValue.email);
            form.append('address', inputValue.address);
            form.append('status', 'Active');
            form.append('employees_count', inputValue.employees_count);
            form.append('is_payment_done',inputValue.is_payment_done)
            form.append('location', inputValue.location);



            if (!_isEmpty(uploadImage && uploadImage.fileName)) {
                if (typeof (uploadImage.imageUrl) == 'object') {
                    form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
                }
            } else {
                let blob = new Blob([logo], {
                    type: "application/pdf"
                });
                form.append('logo', blob, uploadImage.fileName);
            }
            form.append('created_at', moment().format());
            form.append('updated_at', moment().format());

            const getMultisector = groupFilterArrayValue(inputValue.sectors);
            for (const a of getMultisector) {
                if (!_isEmpty(a)) {
                    form.append("sectors", a);
                }

            }
            const getMultisubsector = groupFilterArrayValue(inputValue.subsectors);
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
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.put(`${process.env.API_BASE_URL}/organizations/${orgDetails.name}`, form, {
                    headers: { "Content-Type": "multipart/form-data" }
                }).then(({ data }) => data);
                setApiData(response);
                setStatusData({ type: 'success', message: 'Thanks! Your organizations has been successfully created' });
                setInputValue({});
                setLogo(null);
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
            setError(false);
        } else {
            setError(true);
        }
    }

    const fetchSubSector = async (index, cloneObject, selectedSubSector = []) => {
        const sectorName = inputValue.sectors[index].name;
        if ((((Object.keys(cloneObject.groupSubsectors || [])).indexOf(sectorName)) > -1)) {
            delete cloneObject.groupSubsectors[sectorName];
            setInputValue({ ...cloneObject, subsectors: [...Object.values(cloneObject['groupSubsectors'] || []).flat()] });
        } else {
            let response = await Requests.Get(`/esgadmin/master/subsectors`, { sector: sectorName });
            if ((selectedSubSector || []).length > 0) {
                response.results = updateArrayObjects([...response.results], selectedSubSector);
            }
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
        const fileSize = event.target.files[0].size / 1024 / 1024;
        if (fileSize < 1) {
            setLogo(URL.createObjectURL(imageUrl));
            if (imageUrl) {
                setUploadImage({ fileName, imageUrl });
            }
            setLogoSizeError(false);
        } else {
            setLogoSizeError(true);
        }
    }

    const onChangeRemoveFile = () => {
        setLogo('');
    }

    const onCloseHandler = () => {
        if (statusData.type === 'success') {
            navigate(`/`);
        } else {
            // navigate(`/`);
        }

        setStatusData({ type: '', message: '' });
    }

    const OrgInputFields = (label = '', labelRequired = false, inputName = '', inputVal = '', labelCls = '') => (
        <div class="framework__row">
            <Label label={label} required={labelRequired} />
            <InputBox name={inputName} value={inputVal} onChangeHandler={onChangeHandler} disabled={true} />
        </div>
    );


    const renderOrganisationmainContainer = () => {
        return (<><div class="client-main__content-wrapper content-wrapper scrollable">

            <div class="framework__row-wrapper bot1">

                <UploadFile logoSizeError={logoSizeError} imgcls={'org-image-size'} label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={true} />
                <div class="framework__row"></div>
                <div class="framework__row"></div>
            </div>
            <div class="framework__row-wrapper bot1">
                {OrgInputFields('Company', true, 'name', inputValue && inputValue.name)}
                <div class="framework__row">
                    <Label label={'Location'} className={`framework__title right`} required={true} />
                    <InputBox name={'location'} value={inputValue && inputValue.location} onChangeHandler={onChangeHandler} />
                </div>
            </div>
            <div class="framework__row-wrapper bot1">
                <div class="framework__row">
                    <div class="framework__col-wrapper">
                        <div class="framework__row bot1">
                            <Label label={'Headquarters'} required={true} />
                            <InputBox name={'headquarters'} value={inputValue && inputValue.headquarters} onChangeHandler={onChangeHandler} />
                        </div>

                        <div class="framework__row">
                            <Label label={'Employee'} required={true} />
                            <Dropdown className_1={'framework__input'} className_2={''} options={empCount} name='employees_count' value={inputValue && inputValue.employees_count || ''} onChangeHandler={(e) => onChangeHandler(e)} />
                        </div>
                    </div>
                </div>

                <div class="framework__row">
                    <Label label={'Address'} className={"framework__title right address_title"} required={true} />
                    <TextAreaBox label='' name='address' value={inputValue && inputValue.address} className="framework__input" placeholder="" required={true} onChangeHandler={(e) => onChangeHandler(e)} />
                </div>
            </div>
            <div class="framework__row-wrapper bot1">
                <div class="framework__row">
                    <h1 class="framework__title"><b>Sector</b></h1>
                    <ReactMultiSelectDropdown data={_get(appWizard, 'sectors', [])} isEditable={isEditable} selectedOptionVal={inputValue && inputValue.sectors} onChangeCallback={(selectedArray, event) => onSelectMultipleSelect("sectors", selectedArray, event)} />
                </div>
                <div class="framework__row">
                    <h1 class="framework__title right"><b>SubSector</b></h1>
                    <ReactMultiSelectDropdown data={filterSubSectors.length ? filterSubSectors : [{ label: '', value: '' }]} isEditable={isEditable} selectedOptionVal={inputValue && inputValue.subsectors} onChangeCallback={(selectedArray, event) => onSelectMultipleSelect("subsectors", selectedArray, event)} />

                </div>
            </div>
            <div class="framework__row-wrapper bot1">
                <div class="framework__row">
                    <Label label={'Email'} required={true} />
                    <InputBox name={'email'} value={inputValue && inputValue.email} onChangeHandler={onChangeHandler} />
                </div>

                <div class="framework__row">
                    <Label className="framework__title right" label={'Mobile'} required={true} />
                    <InputBox maxLength={15} text="number" name={'mobile'} value={inputValue && inputValue.mobile} onChangeHandler={onChangeHandler} />
                </div>
            </div>

            <div class="framework__row-wrapper bot40">
                <div class="framework__row">
                    <Label label={'Zip/PostalCode'} className="framework__title" required={true} />
                    <InputBox text="number" maxLength={6} name={'zipcode'} value={inputValue && inputValue.zipcode} onChangeHandler={onChangeHandler} />

                    {/* <Label label={'Country'} required={false} />
                    <Pills label='' data={inputValue.operating_countries} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'operating_countries')} required={true} /> */}
                </div>

                {/* <div class="framework__row">
                  

                </div> */}

            </div>
            {error ? <div className='common-error-msg'>* All mandatory filed is required.</div> : null}
        </div>
            <div className='flex save-orgi-btn' >
                <button onClick={() => onSaveHandler()} class="main__button">SAVE</button>
            </div></>);
    }

    const renderTitle = () => (<div class="main__top-wrapper">
        <h1 class="main__title custom-title">
            Organisational Information
        </h1>
    </div>);

    return (
        <>
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            {!isEditable ?
                <>
                    <EsgImageNavBar />
                    <section className="right-section acc-info">
                        {renderTitle()}
                        {renderOrganisationmainContainer()}
                    </section>
                </> :
                <>
                    {renderTitle()}
                    {renderOrganisationmainContainer()}
                </>
            }
        </>
    );
}

export default OrganisationInfo;