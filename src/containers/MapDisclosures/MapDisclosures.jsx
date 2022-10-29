import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './MapDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { mapCatagory_1, mapCatagory_2 } from "../../utils/constants.js";
const { RadioButton, Button, Pills } = Fields;


const { Get } = Request;

const MapDisclosures = () => {
    const navigate = useNavigate();
    const [listCatagory_1, setListCatagory_1] = useState([...mapCatagory_1]);
    const [listCatagory_2, setListCatagory_2] = useState([...mapCatagory_2]);
    const [apiData, setApiData] = useState({});
    const [radioDPType = "", setDPradioType] = useState({});
    const [radioDCType = "", setDCradioType] = useState({});
    const [radioKPType = "", setKPradioType] = useState({});
    const [radioKCType = "", setKCradioType] = useState({});
    const [sourceFrameworkId = null, setSourceFrameworkId] = useState({});
    const [destinationFrameworkId = null, setDestinationFrameworkId] = useState({});
    const [catagoryParentType, setParentCatagoryType] = useState();
    const [catagoryChildType, setChildCatagoryType] = useState();
    const [parentDisclosure, setParentDisclosureData] = useState([]);
    const [childDisclosure, setChildDisclosureData] = useState([]);
    const [parentKPI, setParentKPI] = useState([]);
    const [childKPI, setChildKPI] = useState([]);
    const [frameworksData, setFrameworksData] = useState([]);
    const [childFrameworksData, setChildFrameworksData] = useState([])
    const [existingMapping, setExistingMapping] = useState([])
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);


    useEffect(() => {
        getframeworks();
    }, []);

    // const settSourceFrameworkId = setSourceFrameworkId((val) => val);
    // const settDestinationFrameworkId = setDestinationFrameworkId((val) => !val);


    // setSourceFrameworkId = (val) =>{
    //     val
    // }

    // setDestinationFrameworkId = (val) =>{
    //     val
    // }


    const radioChangeHandler = (type, value, plane) => {
        if (type === "kpi") {

            existingMapping.map(i => {
                if (i.source_disclosure_kpi.id === value.id || i.target_disclosure_kpi.id === value.id) {
                    console.log("Already Mapped do nothing")
                    return
                }
            })

            if (plane == "parent") {
                if (radioKPType != value.id) {
                    setKPradioType(value.id)
                }
                else {
                    setKPradioType("")
                }

            }
            else {
                if (radioKCType != value.id) {
                    setKCradioType(value.id)
                }
                else {
                    setKCradioType("")
                }
            }
        }
        else if (type === "disclousure") {
            var isCheck = false;
            if (plane == "parent") {
                isCheck = radioDPType != value.id
                if (isCheck) {
                    setDPradioType(value.id)
                } else {
                    setDPradioType("")
                    setParentKPI([])
                }
            }
            else {
                isCheck = radioDCType != value.id
                if (isCheck) {
                    setDCradioType(value.id)
                } else {
                    setDPradioType("")
                    setChildKPI([])
                }
            }
            if (isCheck) {
                getKPI(value.framework, value.id, plane)
            }
        }
    };

    const addToolTip = (id) => {
        return existingMapping.map(i => {
            if (i.source_disclosure_kpi.id === id) {
                return "Its already mapped with " + i.target_disclosure.name + " : " + i.target_disclosure_kpi.name
            }
            if (i.target_disclosure_kpi.id === id) {
                return "Its already mapped with " + i.source_disclosure.name + " : " + i.source_disclosure_kpi.name
            }
            else {
                return ""
            }
        })[0]
    }

    const isAlreadyMapped = (id) => {
        return existingMapping.map(i => {
            if (i.source_disclosure_kpi.id === id) {
                console.log("source")
                return true
            }
            if (i.target_disclosure_kpi.id === id) {
                console.log("tage")
                return true
            }
            else {
                return false
            }
        }
        )
    }

    const onCanceltHandler = async () => {
        setParentDisclosureData([])
        setChildDisclosureData([])
        setParentKPI([])
        setChildKPI([])
    }

    const onNextHandler = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/disclosure-mappings`, {
                "source_framework": sourceFrameworkId.id,
                "source_disclosure": radioDPType,
                "source_disclosure_kpi": radioKPType,
                "target_framework": destinationFrameworkId.id,
                "target_disclosure": radioDCType,
                "target_disclosure_kpi": radioKCType,
                "name": radioKPType + "___" + radioKCType
            }).then(({ data }) => data);
            setStatusData({ type: 'success', message: 'Thanks! Successfully Mapped' });
            console.log('>>>>>>>>>>>>', response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const getDisclosures = async (framework_id = "", type = "") => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}/disclosures`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            console.log('>>>>>>>>>>>>', response.results);
            if (type === "parent") {
                setParentDisclosureData(response.results)
                // setSourceFrameworkId(framework_id)
            }
            else {
                setChildDisclosureData(response.results)
                // setDestinationFrameworkId(framework_id)
            }
            setApiData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const getMappingDisclosures = async (source = "", target = "") => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/disclosure-mappings?source_framework=${source.name}&target_framework=${target.name}`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            console.log('>>>>>>>>>>>>', response.results);
            // if (type === "parent") {
            //     setParentDisclosureData(response.results)
            //     // setSourceFrameworkId(framework_id)
            // }
            // else {
            //     setChildDisclosureData(response.results)
            //     // setDestinationFrameworkId(framework_id)
            // }
            setExistingMapping(response.results);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }


    const getKPI = async (framework_id = "", disclousure_id = "", type = "") => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}/disclosures/${disclousure_id}`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            console.log('>>>>>>>>>>>>', response.children);
            if (type === "parent") {
                setParentKPI(response.children)
            }
            else {
                setChildKPI(response.children)
            }
            // setApiData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`).then(({ data }) => data);
            setFrameworkDetailsData(frameDetails.results.slice(0, 2));
        } catch (e) {
            setFrameworkDetailsData({});
        }
    }

    const getframeworks = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks`).then(({ data }) => data);
            setFrameworksData(frameDetails.results.slice(0, 5));
            setChildFrameworksData(JSON.parse(JSON.stringify(frameDetails.results.slice(0, 5))));
        } catch (e) {
            setFrameworksData({});
        }
    }

    const onFrameworkSelect = async (val = "", type = "", index) => {
        console.log(val);
        if (type === "parent") {
            let cloneFrameworksData = [...frameworksData];
            cloneFrameworksData = (cloneFrameworksData || []).map((item, i) => {
                if (i === index) {
                    item['isSelect'] = true;
                } else {
                    item['isSelect'] = false;
                }
                return item;
            });
            setFrameworksData([...cloneFrameworksData]);
            let cloneChildFrameworksData = [...childFrameworksData];
            cloneChildFrameworksData = (cloneChildFrameworksData || []).map((item, i) => {
                if (i === index) {
                    item['isSource'] = true;
                    if (item['isSelect'] === true) {
                        setChildDisclosureData([])
                        setChildKPI([])
                        item['isSelect'] = false
                    }
                } else {
                    item['isSource'] = false;
                }
                return item;
            });
            setChildFrameworksData([...cloneChildFrameworksData]);
            // setListCatagory_1(val.supported_category)
            setSourceFrameworkId(val)
        }
        else if (type === "child") {
            let cloneFrameworksData = [...childFrameworksData];
            cloneFrameworksData = (cloneFrameworksData || []).map((item, i) => {
                if (i === index) {
                    item['isSelect'] = true;
                } else {
                    item['isSelect'] = false;
                }
                return item;
            });
            setChildFrameworksData([...cloneFrameworksData]);
            let cloneframeworksData = [...frameworksData];
            cloneframeworksData = (cloneframeworksData || []).map((item, i) => {
                if (i === index) {
                    item['isSource'] = true;
                    if (item['isSelect'] === true) {
                        setParentDisclosureData([])
                        setParentKPI([])
                        item['isSelect'] = false
                    }
                } else {
                    item['isSource'] = false;
                }
                return item;
            });
            setFrameworksData([...cloneframeworksData]);
            // setListCatagory_2(val.supported_category)
            setDestinationFrameworkId(val)
        }
        if ((Object.keys(sourceFrameworkId).length > 0 && type === "child") || (Object.keys(destinationFrameworkId).length > 0 && type === "parent")) {
            getMappingDisclosures(Object.keys(sourceFrameworkId).length > 0 ? sourceFrameworkId : val, Object.keys(destinationFrameworkId).length > 0 ? destinationFrameworkId : val)
            // getMappingDisclosures({ name: "Xlicon_Custom" }, { name: "Xlicon_Custom" })
        }

        getDisclosures(val.id, type)
    }

    const onCloseHandler = () => {
    }

    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['Environmental', 'Social', 'Goverance', 'General'];

    const renderFrameworkLogo = (type) => (<div class="frameworks__choose">
        {(type === "child" ? childFrameworksData : frameworksData || []).map((val, index) => (<div class={`frameworks__choose-item ${val.isSelect ? 'active' : null} ${val.isSource ? ' hide' : null}`}>
            <img id={val.id} src={val.logo ? val.logo : `assets/images/avatar.jpg`} alt="GRI" onClick={() => onFrameworkSelect(val, type, index)} />
        </div>))
        }
    </div>);
    const onSelectSingleOption = (index, mode) => {

        let cloneListCatagory = (mode == "left") ? [...listCatagory_1] : [...listCatagory_2];
        cloneListCatagory = (cloneListCatagory || []).map((item, i) => {
            if (index === i) {
                item['isSelect'] = true;
            } else {
                item['isSelect'] = false;
            }
            return item;
        });
        if (mode == "left") {
            setListCatagory_1([...cloneListCatagory])
        } else {
            setListCatagory_2([...cloneListCatagory])
        }

    }

    return (
        <>
            {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
            <div class="main__top-wrapper">
                <h1 class="main__title">
                    Map Disclosure - Questions
                </h1>
            </div>
            <div class="map__questions">
                <div class="map__wrapper">
                    <h1 class="assign__title">
                        Choose a Framework to map from:
                    </h1>
                    {renderFrameworkLogo('parent')}
                    <h1 class="map-diclosures-catagory">Categories:</h1>
                    <Pills label='' data={listCatagory_1} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'left')} />
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Disclosures:
                        </h1>
                        <div class="disclosures__wrapper">
                            {(parentDisclosure || []).map((val, index) => (
                                <div class="disclosures__item">
                                    <p class="disclosures__detalis">
                                        {val.code + " " + val.name}
                                    </p>
                                    <label for="organisational__checkbox" class="disclosures__label" onClick={() => radioChangeHandler("disclousure", val, "parent")}>
                                        <input type="checkbox"
                                            class="disclosures__checkbox"
                                            id={val.id}
                                            checked={(radioDPType === val.id)}
                                            label={""}
                                            value={val}
                                        />
                                        <div class={`${radioDPType === val.id ? "fake__checkbox-active" : "fake__checkbox-inactive"}`}></div>
                                    </label>
                                </div>)
                            )}
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">
                            {(parentKPI || []).map((val, index) => (
                                <div title={`${addToolTip(val.id)
                                    }`} class="disclosures__item">
                                    <p class="disclosures__detalis">
                                        {/* {val.code + " " + val.label + "  " + existingMapping.filter(i => {return i.source_disclosure_kpi.id === val.id || i.target_disclosure_kpi.id === val.id})} */}
                                        {val.code + " " + val.label}
                                    </p>
                                    <label for="organisational__checkbox" class="disclosures__label" onClick={() => radioChangeHandler("kpi", val, "parent")}>
                                        <input type="checkbox"
                                            class="disclosures__checkbox"
                                            id={val.id}
                                            checked={(radioKPType === val.id)}
                                            label={""}
                                            value={val}
                                            disabled
                                        />
                                        <div class={`${radioKPType === val.id ? "fake__checkbox-active" : "fake__checkbox-inactive"}`}></div>
                                    </label>
                                </div>)
                            )}
                        </div>
                    </div>
                </div>
                <div class="map__wrapper">
                    <h1 class="assign__title">
                        Choose a Framework to map to:
                    </h1>
                    {renderFrameworkLogo('child')}
                    <h1 class="map-diclosures-catagory">Categories:</h1>
                    <Pills label='' data={listCatagory_2} onSelectMultipleOption={(i) => onSelectSingleOption(i, 'right')} />
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Disclosures:
                        </h1>
                        <div class="disclosures__wrapper">
                            {(childDisclosure || []).map((val, index) => (
                                <div class="disclosures__item">
                                    <p class="disclosures__detalis">
                                        {val.code + " " + val.name}
                                    </p>
                                    <label for="organisational__checkbox" class="disclosures__label" onClick={() => radioChangeHandler("disclousure", val, "child")}>
                                        <input type="checkbox"
                                            class="disclosures__checkbox"
                                            id={val.id}
                                            checked={(radioDCType === val.id)}
                                            label={""}
                                            value={val}
                                        />
                                        <div class={`${radioDCType === val.id ? "fake__checkbox-active" : "fake__checkbox-inactive"}`}></div>
                                    </label>
                                </div>)
                            )}
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">

                            {(childKPI || []).map((val, index) => (
                                <div title={`${addToolTip(val.id)
                                    }`} class="disclosures__item">
                                    <p class="disclosures__detalis">
                                        {val.code + " " + val.label}
                                    </p>
                                    <label for="organisational__checkbox" class="disclosures__label"  onClick={() => radioChangeHandler("kpi", val, "child")}>
                                        <input type="checkbox"
                                            class="disclosures__checkbox"
                                            id={val.id}
                                            checked={(radioKCType === val.id)}
                                            label={""}
                                            value={val}
                                        />
                                        <div class={`${radioKCType === val.id  ||  isAlreadyMapped(val.id)? "fake__checkbox-active" : "fake__checkbox-inactive"}`}></div>
                                    </label>
                                </div>)
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons__panel">

                <Button label='CANCEL' onClickHandler={onCanceltHandler} className='buttons__panel-button' />
                <Button label='MAP QUESTION' onClickHandler={onNextHandler} className='main__button map-disc-main-btn' />
            </div>
        </>)
}

export default MapDisclosures;