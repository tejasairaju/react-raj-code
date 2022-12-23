import React, { useState, useEffect } from 'react';
import './PersonalInformation.css';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { empCount } from '../../utils/constants.js';
import axios from 'axios';
import Requests from '../../Requests';
import EsgImageNavBar from '../../components/EsgImageNavBar/EsgImageNavBar.jsx';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { getErrorMessage } from '../../utils/utils';

const { Input, TextArea, Pills, UploadFile, Button, InputBox, Label, Dropdown, TextAreaBox } = Fields;

const PersonalInformation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { appWizard = {} } = useSelector((state) => state.appWizard);
  const { orgDetails = {}, loginDetails = {} } = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { search } = _get(window, 'location', '?');
  const params = queryString.parse(search);
  const [inputValue, setInputValue] = useState({ name: orgDetails.name });
  const [errorValidation, setErrorValidation] = useState(false);
  const [logo, setLogo] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [statusData, setStatusData] = useState({});
  const [apiData, setApiData] = useState({});
  const [currentFrame, setCurrentFrame] = useState('');
  const [logoSizeError, setLogoSizeError] = useState(false);
  const [errorMessage, setErrorMsg] = useState('');
  // const onCloseHandler = () => {
  //     setIsOpen(false)
  // }
  useEffect(() => {
    if (loginDetails.user_role == 'esg_admin') {
      getAdminDetails();
    } else {
      getUserDetails();
    }
    // setInputValue({...inputValue, sectors: appWizard.sectors, operating_countries: appWizard.countries });
  }, []);

  const getUserAdminInfo = async () => {
    try {
      await Axios.all([
        Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries`),
        Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors`),
        Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories`),
        Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries`)
      ]).then(([{ data: countries }, { data: sectors }, { data: categories }, { data: industries } /*{ data: subsectors }*/]) => {
        setInputValue({
          ...inputValue,
          operating_countries: countries.results,
          sectors: sectors.results
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getUserDetails = async (id = '') => {
    try {
      const userDetails = await Requests.Get(`/users/${loginDetails.user_id}`, {
        organization: orgDetails.name
      });
      setLogo(userDetails.profile_picture);
      !_isEmpty(userDetails.profile_picture) &&
        setUploadImage({
          fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`,
          imageUrl: userDetails.profile_picture
        });
      setInputValue({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email_id: userDetails.email_id,
        phone_number: userDetails.phone_number,
        zipcode: userDetails.zipcode || '',
        country: userDetails.country,
        organization_name: userDetails.organization_name
      });
    } catch (e) {
      setInputValue({});
    }
  };

  const getAdminDetails = async (id = '') => {
    try {
      const userDetails = await Requests.Get(`/esgadmin/administrators/${loginDetails.user_id}`);
      setLogo(userDetails.profile_picture);
      console.log(userDetails);
      !_isEmpty(userDetails.profile_picture) &&
        setUploadImage({
          fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`,
          imageUrl: userDetails.profile_picture
        });
      setInputValue({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email_id: userDetails.email_id,
        phone_number: userDetails.phone_number,
        zipcode: userDetails.zipcode || '',
        country: userDetails.country,
        organization_name: userDetails.organization_name
      });
    } catch (e) {
      setInputValue({});
    }
  };

  const updateArrayObjects = (array = null, key = 'isSelect', value = true) =>
    (array || []).map((item) => {
      item[key] = value;
      return item;
    });

  const getFilterArrayValue = (data = null) => {
    let filterData = [];
    (data || []).forEach((subItem) => {
      if (subItem.isSelect === true) {
        filterData = [...filterData, subItem.id];
      }
    });
    return filterData;
  };

  // const onSaveHandler = async () => {
  //     if (!_isEmpty(inputValue.name) && !_isEmpty(inputValue.email) && (inputValue.operating_countries || []).length
  //         && (inputValue.sectors || []).length && inputValue.employees_count) {
  //         const form = new FormData();
  //         form.append('name', inputValue.name);
  //         form.append('headquarters', inputValue.headquarters)
  //         form.append('mobile_number', inputValue.mobile);
  //         form.append('zip_code', inputValue.zipcode);
  //         form.append('email', inputValue.email);
  //         form.append('address', inputValue.address);
  //         form.append('status', 'Active');
  //         form.append('employees_count', inputValue.employees_count);
  //         if (!_isEmpty(uploadImage&&uploadImage.fileName)) {
  //             form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
  //         }
  //         form.append('created_at', moment().format());
  //         form.append('updated_at', moment().format());

  //         const getMultisector = getFilterArrayValue(inputValue.sectors);
  //         for (const a of getMultisector) {
  //             if (!_isEmpty(a)) {
  //                 form.append("sectors", a);
  //             }

  //         }
  //         const getMultisubsector = getFilterArrayValue(inputValue.subsectors);
  //         for (const a of getMultisubsector) {
  //             if (!_isEmpty(a)) {
  //                 form.append("sub_sectors", a);
  //             }
  //         }
  //         const getMultisubcountries = getFilterArrayValue(inputValue.operating_countries);
  //         for (const a of getMultisubcountries) {
  //             if (!_isEmpty(a)) {
  //                 form.append("supported_countries", a);
  //             }
  //         }
  //         try {
  //             const response = await axios.put(`${process.env.API_BASE_URL}/organizations/${orgDetails.name}`, form, {
  //                 headers: { "Content-Type": "multipart/form-data" }
  //             }).then(({ data }) => data);
  //             setApiData(response);
  //             setStatusData({ type: 'success', message: 'Thanks! Your organizations has been successfully created' });
  //             setInputValue({});
  //             setLogo(null);
  //         } catch (e) {
  //             setStatusData({ type: 'error', message: e.message });
  //         }
  //     } else {
  //         setErrorValidation(true);
  //     }
  // }

  const fetchSubSector = async (index, cloneObject) => {
    const sectorName = inputValue.sectors[index].name;
    if (Object.keys(cloneObject.groupSubsectors || []).indexOf(sectorName) > -1) {
      delete cloneObject.groupSubsectors[sectorName];
      setInputValue({
        ...cloneObject,
        subsectors: [...Object.values(cloneObject['groupSubsectors'] || []).flat()]
      });
    } else {
      const response = await Requests.Get(`/esgadmin/master/subsectors`, {
        sector: sectorName
      });
      setInputValue({
        ...cloneObject,
        groupSubsectors: {
          ...cloneObject['groupSubsectors'],
          [sectorName]: response.results || []
        },
        subsectors: [...Object.values(cloneObject['groupSubsectors'] || []).flat(), ...response.results]
      });
    }
  };

  const onSelectMultipleOption = async (index, field) => {
    let cloneInputVal = { ...inputValue };
    if (cloneInputVal[field][index].isSelect === undefined) {
      cloneInputVal[field][index].isSelect = true;
    } else {
      cloneInputVal[field][index].isSelect = !cloneInputVal[field][index].isSelect;
    }
    if (field === 'sectors') {
      fetchSubSector(index, cloneInputVal);
    } else {
      setInputValue({ ...cloneInputVal });
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

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
    const fileSize = event.target.files[0].size / 1024 / 1024;
    if (fileSize < 1) {
      if (imageUrl) {
        setUploadImage({ fileName, imageUrl });
      }
      setLogoSizeError(false);
    } else {
      setLogoSizeError(true);
    }
  };

  const onChangeRemoveFile = () => {
    setLogo(null);
  };

  const onCloseHandler = () => {
    if (statusData.type === 'success') {
      navigate(`/`);
    }

    setStatusData({ type: '', message: '' });
  };

  const OrgInputFields = (label = '', labelRequired = false, inputName = '', inputVal = '', labelCls = '') => (
    <div className='framework__row'>
      <Label label={label} required={labelRequired} />
      <InputBox name={inputName} value={inputVal} onChangeHandler={onChangeHandler} disabled={true} />
    </div>
  );

  // const onSaveUserDetails = async() => {
  //     try {
  //       const respose = await Requests.Put(`/users/${loginDetails.user_id}`, {...inputValue}, {organization: orgDetails.name});
  //     //   if(respose) {
  //         setStatusData({ type: 'success', message: 'Your profile details has been successfully updated' });
  //     //   }
  //     } catch(e) {
  //         setStatusData({ type: 'error', message: e.data.response.message || 'Network error.'});

  //     }
  // }

  const onSaveUserDetails = async () => {
    if (!_isEmpty(inputValue.first_name && inputValue.last_name && inputValue.email_id && inputValue.country && inputValue.phone_number)) {
      try {
        const form = new FormData();
        setStatusData({ type: 'loading', message: '' });
        form.append('first_name', inputValue.first_name);
        form.append('last_name', inputValue.last_name);
        form.append('email_id', inputValue.email_id);
        form.append('country', inputValue.country);
        form.append('phone_number', inputValue.phone_number);
        // form.append('department', inputValue.department);
        // form.append('designation', inputValue.designation);
        form.append('created_at', moment().format());
        form.append('updated_at', moment().format());
        if (!_isEmpty(uploadImage && uploadImage.fileName) && !_isEmpty(logo)) {
          if (typeof uploadImage.imageUrl == 'object') {
            form.append('profile_picture', _get(uploadImage, 'imageUrl', ''), uploadImage.fileName);
            //form.append('logo', _get(uploadImage, "imageUrl", ""), uploadImage.fileName);
          }
        } else if (_isEmpty(logo)) {
          form.append('profile_picture', '');
        }
        if (orgDetails.name) {
          form.append('organization_name', orgDetails.name);
        }
        const subAPIURL = loginDetails.user_role == 'esg_admin' ? 'esgadmin/administrators' : 'users';
        let response = await axios
          .put(`${process.env.API_BASE_URL}/${subAPIURL}/${loginDetails.user_id}${orgDetails.name ? `?organization=${orgDetails.name}` : ''}`, form, {
            headers: { 'Content-Type': 'multipart/form-data' }
          })
          .then(({ data }) => data);
        setStatusData({
          type: 'success',
          message: 'Your profile details has been successfully updated'
        });
      } catch (e) {
        let error = getErrorMessage(e);
        setStatusData({ ...error });
      }
    } else {
      if (_isEmpty(inputValue.first_name)) {
        setErrorMsg('Please enter Firstname');
      } else if (_isEmpty(inputValue.last_name)) {
        setErrorMsg('Please enter last name');
      } else if (_isEmpty(inputValue.email_id)) {
        setErrorMsg('Please enter email');
      } else if (_isEmpty(inputValue.country)) {
        setErrorMsg('Please enter country name');
      } else if (_isEmpty(inputValue.phone_number)) {
        setErrorMsg('Please enter phone number');
      }
    }
  };

  return (
    <>
      <div className='main__top-wrapper'>
        <h1 className='main__title'>Personal Information</h1>
        {false && (
          <div className='framework__row right font12 '>
            <a className='right rightlink__color' onClick={() => setIsOpen(true)}>
              Change password
            </a>
          </div>
        )}
      </div>
      {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}

      <div className='profile-info-container'>
        <div className='framework__col-wrapper'>
          <div className='framework__row-wrapper profile-info-fileds'>
            <div className='framework__row'>
              <UploadFile
                logoSizeError={logoSizeError}
                imgcls={'org-image-size'}
                label='Photo'
                imageUrl={logo}
                onChangeFile={onChangeFile}
                onChangeRemoveFile={onChangeRemoveFile}
                required={false}
              />
            </div>
            <div className='framework__row'></div>
          </div>
          <div className='framework__row-wrapper profile-info-fileds'>
            <div className='framework__row'>
              <Label label={'First Name'} className={`framework__title`} required={true} />
              <InputBox name={'first_name'} value={inputValue.first_name} onChangeHandler={onChangeHandler} maxLength={25} />
            </div>
            <div className='framework__row'>
              <Label label={'Last Name'} className={`framework__title right`} required={true} />
              <InputBox name={'last_name'} value={inputValue.last_name} onChangeHandler={onChangeHandler} maxLength={25} />
            </div>
          </div>
          <div className='framework__row-wrapper profile-info-fileds'>
            <div className='framework__row'>
              <Label label={'Email'} className={`framework__title`} required={true} />
              <InputBox name={'email_id'} value={inputValue.email_id} onChangeHandler={onChangeHandler} disabled={true} maxLength={50} />
            </div>
            <div className='framework__row'>
              <Label label={'Mobile'} className={`framework__title right`} required={true} />
              <InputBox maxLength={20} text='number' placeholder='+44235545' name={'phone_number'} value={inputValue.phone_number} onChangeHandler={onChangeHandler} />
            </div>
          </div>
          <div className='framework__row-wrapper profile-info-fileds'>
            <div className='framework__row'>
              <Label label={'Country'} required={true} />
              <InputBox name={'country'} value={inputValue.country} onChangeHandler={onChangeHandler} maxLength={25} />
              {/* <Pills label='' data={inputValue.country} onSelectMultipleOption={(i) => onSelectMultipleOption(i, 'country')} required={true} /> */}
            </div>
          </div>
        </div>
      </div>
      <button onClick={() => onSaveUserDetails()} className='main__button'>
        SAVE
      </button>
      {errorMessage !== '' && (
        <div className='text-center text-red-600'>
          <span className='color-red P-4'>*</span>
          {errorMessage}
        </div>
      )}
      {/* {isOpen &&
            <Popup from="personal" isShow={isOpen} onCloseHandler={onCloseHandler} />} */}
    </>
  );
};
export default PersonalInformation;
