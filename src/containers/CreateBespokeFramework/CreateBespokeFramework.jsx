import React, { useEffect } from 'react';
import _isEmpty from 'lodash/isEmpty';
import queryString from 'query-string';
import _lower from 'lodash/lowerCase';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import _get from 'lodash/get';
import Fields from '../../Components/Common/Fields/Fields.jsx';
import Popup from '../../components/Common/Popup/Popup.jsx';
// import '../CreateBespokeFramework.css';
import { useState } from 'react';
import axios from 'axios';
import { getErrorMessage } from '../../utils/utils.js';
import ReactMultiSelectDropdown from '../../Components/ReactMultiSelectDropdown/ReactMultiSelectDropdown.jsx';
import CustomFetchMaster from '../../Components/Common/CustomFetchMaster/CustomFetchMaster.jsx';

const { Input, TextArea, UploadFile, Button } = Fields;

const CreateBespokeFramework = (props) => {
  const navigate = useNavigate();
  const [masterUser, masterUserError] = CustomFetchMaster();
  const { search } = _get(window, 'location', '?');
  const params = queryString.parse(search);
  const { isEdit = false } = params;
  const [inputValue, setInputValue] = useState({ countries: '' });
  const [errorValidation, setErrorValidation] = useState(false);
  const [logo, setLogo] = useState(null);
  const [uploadImage, setUploadImage] = useState(null);
  const [statusData, setStatusData] = useState({});
  const [apiData, setApiData] = useState({});
  const [filterSubSectors, setFilterSubSectors] = useState([]);
  const { orgDetails = {} } = useSelector((state) => state.signup);
  const appWizard = useSelector((state) => state.appWizard);
  const [selectetSector, setSelectedSector] = useState([]);
  const [logoSizeError, setLogoSizeError] = useState(false);
  const validation = {};

  useEffect(() => {
    if (params.isEdit) {
      getframeworkDetails(params.id);
    } else {
    }
  }, []);

  const getframeworkDetails = async (id = '') => {
    try {
      const frameDetails = await axios.get(`${process.env.API_BASE_URL}/templates/${params.id}?organization=${orgDetails.name}`).then(({ data }) => data);
      !_isEmpty(frameDetails.logo) && setUploadImage({ fileName: `avatar${Math.floor(Math.random() * 90 + 10)}.png`, imageUrl: frameDetails.logo });
      updateSubSectorList(frameDetails.supported_sectors);
      setInputValue({
        ...frameDetails,
        categories: updateArrayObjects(frameDetails.supported_category),
        countries: updateArrayObjects(frameDetails.supported_countries),
        sectors: updateArrayObjects(frameDetails.supported_sectors),
        subsectors: updateArrayObjects(frameDetails.supported_sub_sectors)
      });
      setLogo(frameDetails.logo);
    } catch (e) {}
  };
  const updateArrayObjects = (array = null, key = 'isSelect', value = true) =>
    (array || []).map((item) => {
      return {
        name: item,
        id: item
      };
    });

  const updateSubSectorList = (sector = []) => {
    let cloneSector = [...sector];
    let cloneSubsectors = [..._get(appWizard, 'subsectors', [])];
    let sectorNameList = cloneSector.map((sector) => sector.name);
    cloneSubsectors = cloneSubsectors.filter((value) => sectorNameList.indexOf(_get(value, 'sector.name', '')) > -1);
    setFilterSubSectors(cloneSubsectors);
    setSelectedSector(sectorNameList);
  };

  const groupFilterArrayValue = (data = null) => {
    let filterData = [];
    (data || []).forEach((subItem) => {
      filterData = [...filterData, subItem.name];
    });
    return [...new Set(filterData)];
  };

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

        alreadySlectedSubSector = alreadySlectedSubSector.filter((subSector) => _lower(_get(subSector, 'sector.name', '')) != _lower(removeItem));
        cloneInputValue['subsectors'] = alreadySlectedSubSector;
      }
      let cloneSubsectors = [..._get(appWizard, 'subsectors', [])];
      cloneSubsectors = cloneSubsectors.filter((value) => sectorList.indexOf(_get(value, 'sector.name', '')) > -1);
      setFilterSubSectors(cloneSubsectors);
      setSelectedSector(sectorList);
    }
    setInputValue({ ...cloneInputValue, [field]: selectedArray });
  };

  const onNextHandler = async () => {
    if (
      !_isEmpty(inputValue.name)
      // && (inputValue.countries || []).length > 0
      //     && (inputValue.categories || []).length> 0 && (inputValue.sectors || []).length > 0
    ) {
      const form = new FormData();

      const getMultiCategories = groupFilterArrayValue(inputValue.categories);
      for (const a of getMultiCategories) {
        if (!_isEmpty(a)) {
          form.append('supported_category', a);
        }
      }

      const getMultisector = groupFilterArrayValue(inputValue.sectors);
      for (const a of getMultisector) {
        if (!_isEmpty(a)) {
          form.append('supported_sectors', a);
        }
      }
      const getMultisubsector = groupFilterArrayValue(inputValue.subsectors);
      for (const a of getMultisubsector) {
        if (!_isEmpty(a)) {
          form.append('supported_sub_sectors', a);
        }
      }
      const getMultisubcountries = groupFilterArrayValue(inputValue.countries);
      for (const a of getMultisubcountries) {
        if (!_isEmpty(a)) {
          form.append('supported_countries', a);
        }
      }

      if (form.getAll('supported_countries').length > 0 && form.getAll('supported_sectors').length > 0 && form.getAll('supported_category').length > 0) {
        setErrorValidation(false);
        form.append('name', inputValue.name);
        form.append('template_type', 'Custom');

        form.append('description', inputValue.description);
        if (!_isEmpty(uploadImage && uploadImage.fileName) && isEdit == false) {
          form.append('logo', _get(uploadImage, 'imageUrl', ''), uploadImage.fileName);
        } else if (params.isEdit && logo) {
          if (typeof uploadImage.imageUrl == 'object') {
            form.append('logo', _get(uploadImage, 'imageUrl', ''), uploadImage.fileName);
          }
        }
        form.append('created_at', moment().format());
        form.append('updated_at', moment().format());

        try {
          let response = {};
          if (isEdit) {
            response = await axios
              .put(`${process.env.API_BASE_URL}/templates/${params.id}?organization=${orgDetails.name}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then(({ data }) => data);
          } else {
            response = await axios
              .post(`${process.env.API_BASE_URL}/templates/?organization=${orgDetails.name}`, form, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              .then(({ data }) => data);
          }

          setApiData(response);
          setStatusData({ type: 'success', message: `Thanks! Your framework has been successfully ${isEdit ? 'updated' : 'created'}` });
        } catch (e) {
          let error = getErrorMessage(e);
          setStatusData({ ...error });
        }
      } else {
        setErrorValidation(true);
      }
    } else {
      setErrorValidation(true);
    }
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
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
  };

  const onChangeRemoveFile = () => {
    setLogo(null);
  };

  const onCloseHandler = () => {
    if (statusData.type === 'success' && !isEdit) {
      navigate(`/template/${apiData.id}`);
    } else if (statusData.type === 'success' && isEdit) {
      navigate(-1);
    }
    setStatusData({ type: '', message: '' });
  };

  return (
    <>
      {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
      <div className='main__top-wrapper'>
        <h1 className='main__title custom-title'>{`${isEdit ? 'Update' : 'Create'} Bespoke Framework Wizard`}</h1>
      </div>
      <div id='createFramework' className='main__content-wrapper'>
        <Input
          maxLength={50}
          inputblockcls={`user_input_block ${_get(validation, 'name', false) ? 'user_input_error' : null}`}
          error={validation['name']}
          label={'Name'}
          type='text'
          name='name'
          value={inputValue.name || ''}
          className='create-framework__input'
          placeholder='GRI'
          required={true}
          onChangeHandler={onChangeHandler}
        />
        <UploadFile logoSizeError={logoSizeError} label='Logo' imageUrl={logo} onChangeFile={onChangeFile} onChangeRemoveFile={onChangeRemoveFile} required={false} />
        <TextArea
          maxLength={10000}
          inputblockcls={`user_input_block ${_get(validation, 'description', false) ? 'user_input_error' : null}`}
          error={validation['description']}
          label='Description'
          name='description'
          value={inputValue.description || ''}
          className='create-framework__input create-framework__textarea'
          placeholder=''
          required={false}
          onChangeHandler={onChangeHandler}
        />
        <h1 className={'create-framework__title'}>
          Categories<span className='ml-1 text-red-500'>*</span>
        </h1>
        <ReactMultiSelectDropdown
          data={_get(appWizard, 'categories', [])}
          isEditable={isEdit}
          selectedOptionVal={inputValue.categories}
          onChangeCallback={(selectedArray, event) => onSelectMultipleSelect('categories', selectedArray, event)}
        />
        <h1 className={'create-framework__title'}>
          Sectors:<span className='ml-1 text-red-500'>*</span>
        </h1>
        <ReactMultiSelectDropdown
          data={_get(appWizard, 'sectors', [])}
          isEditable={isEdit}
          selectedOptionVal={inputValue.sectors}
          onChangeCallback={(selectedArray, event) => onSelectMultipleSelect('sectors', selectedArray, event)}
        />
        <h1 className={'create-framework__title'}>Sub Sectors:</h1>
        <ReactMultiSelectDropdown
          data={filterSubSectors.length ? filterSubSectors : [{ label: '', value: '' }]}
          isEditable={isEdit}
          selectedOptionVal={inputValue.subsectors}
          onChangeCallback={(selectedArray, event) => onSelectMultipleSelect('subsectors', selectedArray, event)}
        />
        <h1 className={'create-framework__title'}>
          Location:<span className='ml-1 text-red-500'>*</span>
        </h1>
        <ReactMultiSelectDropdown
          data={_get(appWizard, 'countries', [])}
          isEditable={isEdit}
          selectedOptionVal={inputValue.countries}
          onChangeCallback={(selectedArray, event) => onSelectMultipleSelect('countries', selectedArray, event)}
        />
      </div>
      {errorValidation && <div className='overall-error-container color-red'>*Please fill all the required fields.</div>}
      <Button label={isEdit ? 'UPDATE' : 'NEXT'} onClickHandler={onNextHandler} className='main__button' />
    </>
  );
};

export default CreateBespokeFramework;
