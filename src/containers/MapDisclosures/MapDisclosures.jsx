import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './MapDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
const { RadioButton, Button } = Fields;

const { Get } = Request;

const MapDisclosures = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({});
    const [radioDPType="", setDPradioType] = useState({});
    const [radioDCType="", setDCradioType] = useState({});
    const [radioKPType="", setKPradioType] = useState({});
    const [radioKCType="", setKCradioType] = useState({});
    const [sourceFrameworkId, setSourceFrameworkId] = useState({});
    const [destinationFrameworkId, setDestinationFrameworkId] = useState({});
    const [catagoryParentType, setParentCatagoryType] = useState();
    const [catagoryChildType, setChildCatagoryType] = useState();
    const [parentDisclosure, setParentDisclosureData] = useState([]);
    const [childDisclosure, setChildDisclosureData] = useState([]);
    const [parentKPI, setParentKPI] = useState([]);
    const [childKPI, setChildKPI] = useState([]);
    const [frameworksData, setFrameworksData] = useState([])
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);


    useEffect(() => {
        // getframeworkDetails();
        // getDisclosures();
        getframeworks();
    }, []);

    const radioChangeHandler = (type,value, plane) => {
        if(type === "kpi"){
            if(plane == "parent"){
                setKPradioType(value.id)
            }
            else{
                setKCradioType(value.id)
            }
        }
        // setCatagoryType(type+"__"+value.id);
        else if(type==="disclousure"){
            if(plane == "parent"){
                setDPradioType(value.id)
            }
            else{
                setDCradioType(value.id)
            }
        getKPI(value.framework, value.id, plane)
        }
    };

    const onNextHandler = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            // postdata = {}
            // postdata["source_framework"]=sourceFrameworkId
            // postdata["source_disclosure"]=radioDPType
            // postdata["source_disclosure_kpi"]=radioKPType

            // postdata["target_framework"]=destinationFrameworkId
            // postdata["target_disclosure"]=radioDCType
            // postdata["target_disclosure_kpi"]=radioKCType
            
            // postdata["name"]=radioKPType+"___"+radioKCType

            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/disclosure-mappings`,{"source_framework":sourceFrameworkId,
            "source_disclosure":radioDPType,
            "source_disclosure_kpi":radioKPType,
            "target_framework":destinationFrameworkId,
            "target_disclosure":radioDCType,
            "target_disclosure_kpi":radioKCType,
            "name":radioKPType+"___"+radioKCType}).then(({ data }) => data);
            setStatusData({ type: 'success', message: 'Thanks! Successfully Mapped' });
            console.log('>>>>>>>>>>>>', response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const getDisclosures = async (framework_id="",type = "") => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}/disclosures`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            console.log('>>>>>>>>>>>>', response.results);
            if (type=== "parent"){
                setParentDisclosureData(response.results)
                setSourceFrameworkId(framework_id)
            }
            else{
                setChildDisclosureData(response.results)
                setDestinationFrameworkId(framework_id)
            }
            setApiData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }


    const getKPI = async (framework_id="", disclousure_id="",type = "") => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${framework_id}/disclosures/${disclousure_id}`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            console.log('>>>>>>>>>>>>', response.children);
            if (type=== "parent"){
                setParentKPI(response.children)
            }
            else{
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
            setFrameworkDetailsData(frameDetails.results.slice(0,2));
        } catch (e) {
            setFrameworkDetailsData({});
        }
    }

    const getframeworks = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks`).then(({ data }) => data);
            setFrameworksData(frameDetails.results.slice(0,5));
        } catch (e) {
            setFrameworksData({});
        }
    }

    const onFrameworkSelect = async(val = "", type="")=>{
        console.log(val);
        getDisclosures('469652cb-dfc8-4d72-97b2-a5bd438f5e6e', type)
        // getDisclosures(val.id, type)
    }

    const onCloseHandler = () => {
    }

    const headers = ['Name', 'Description', 'Action'];
    const radioButton = ['Environmental', 'Social', 'Goverance', 'General'];

    return (
        <>
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
                    <div class="frameworks__choose">
                    <table className="default-flex-table">
                    <tbody>
                        <tr>
                        {(frameworksData || []).map((val, index) => {

                            return (
                                <td><img src={val.logo==null?"assets/images/logo-row.jpg":val.logo} alt="logo" width='15px' height='15px' onClick={() => onFrameworkSelect(val,"parent" )} /></td>
                            )
                        })}
                        </tr>
                    </tbody>
                </table>
                        {/* <div class="frameworks__choose-item active">
                            <img src="./assets/images/gri.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/sasb.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/tcfd.png" alt="GRI" />
                        </div> */}
                    </div>
                    <h1 class="assign__title">
                        Categories:
                    </h1>
                    <ul class="assign__categories">
                        <li class="assign__categories-item active">
                            Environmental
                        </li>
                        <li class="assign__categories-item active">
                            Social
                        </li>
                        <li class="assign__categories-item">
                            Governance
                        </li>
                        <li class="assign__categories-item">
                            Material Sourcing
                        </li>
                    </ul>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Disclosures:
                        </h1>
                        <div class="disclosures__wrapper">
                            <table>
                                <tbody>
                                    {(parentDisclosure || []).map((val, index) => {

                            return (
                                <tr class="disclosures__item">
                                <td class="disclosures__detalis">{val.code+" "+val.name}</td>
                                <label for="organisational__checkbox" class="disclosures__label">
                                <RadioButton
                                class="fake__checkbox"
                                    changed={() => radioChangeHandler("disclousure",val, "parent")}
                                    id={val.id}
                                    isSelected={radioDPType === val.id}
                                    label={""}
                                    value={val}
                                />
                                
                                    {/* <input type="radio"  id={val.id} /> */}
                                    {/* <div class="fake__checkbox"></div> */}
                                </label>
                                </tr>
                            
                            )
                        })}
                                </tbody>
                            </table>
                           
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">
                        <table>
                                <tbody>
                                    {(parentKPI || []).map((val, index) => {

                            return (
                                <tr class="disclosures__item">
                                <td class="disclosures__detalis">{val.code+" "+val.label}</td>
                                <label for="organisational__checkbox" class="disclosures__label">
                                <RadioButton
                                class="fake__checkbox"
                                    changed={() => radioChangeHandler("kpi",val, "parent")}
                                    id={val.id}
                                    isSelected={radioKPType === val.id}
                                    label={""}
                                    value={val}
                                />
                                
                                    {/* <input type="radio"  id={val.id} /> */}
                                    {/* <div class="fake__checkbox"></div> */}
                                </label>
                                </tr>
                            
                            )
                        })}
                                </tbody>
                            </table>
                            {/* <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-1 Organisational details
                                </p>
                                <label for="1organisational__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1organisational__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-6 Activities, value chain and other business relationships
                                </p>
                                <label for="1activities__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1activities__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    22-9 Governance structure and composition 
                                </p>
                                <label for="1governance__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1governance__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-19 Remuneration policies
                                </p>
                                <label for="1remuneration__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1remuneration__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-23 GRI 305 -5 Reduction of GHG Emissions
                                </p>
                                <label for="1gri__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1gri__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div class="map__wrapper">
                    <h1 class="assign__title">
                        Choose a Framework to map to:
                    </h1>
                    <div class="frameworks__choose">
                    {(frameworksData || []).map((val, index) => {

return (
    <td><img src={val.logo==null?"assets/images/logo-row.jpg":val.logo} alt="logo" width='15px' height='15px' onClick={() => onFrameworkSelect(val,"child" )} /></td>
)
})}
                        {/* <div class="frameworks__choose-item active">
                            <img src="./assets/images/sasb.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/tcfd.png" alt="GRI" />
                        </div> */}
                    </div>
                    <h1 class="assign__title">
                        Categories:
                    </h1>
                    <ul class="assign__categories">
                        <li class="assign__categories-item active">
                            Environmental
                        </li>
                        <li class="assign__categories-item active">
                            Social
                        </li>
                        <li class="assign__categories-item">
                            Governance
                        </li>
                        <li class="assign__categories-item">
                            Material Sourcing
                        </li>
                    </ul>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Disclosures:
                        </h1>
                        <div class="disclosures__wrapper">
                        <table>
                                <tbody>
                                    {(childDisclosure || []).map((val, index) => {

                            return (
                                <tr class="disclosures__item">
                                <td class="disclosures__detalis">{val.code+" "+val.name}</td>
                                <label for="organisational__checkbox" class="disclosures__label">
                                <RadioButton
                                class="fake__checkbox"
                                    changed={() => radioChangeHandler("disclousure",val, "child")}
                                    id={val.id}
                                    isSelected={radioDCType === val.id}
                                    label={""}
                                    value={val}
                                />
                                    {/* <input type="checkbox"  id={val.id} /> */}
                                    {/* <div class="fake__checkbox"></div> */}
                                </label>
                                </tr>
                            
                            )
                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">
                            {/* <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-1 Organisational details
                                </p>
                                <label for="1organisational__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1organisational__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-6 Activities, value chain and other business relationships
                                </p>
                                <label for="1activities__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1activities__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    22-9 Governance structure and composition 
                                </p>
                                <label for="1governance__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1governance__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-19 Remuneration policies
                                </p>
                                <label for="1remuneration__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1remuneration__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-23 GRI 305 -5 Reduction of GHG Emissions
                                </p>
                                <label for="1gri__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="1gri__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div> */}
                             <table>
                                <tbody>
                                    {(childKPI || []).map((val, index) => {

                            return (
                                <tr class="disclosures__item">
                                <td class="disclosures__detalis">{val.code+" "+val.label}</td>
                                <label for="organisational__checkbox" class="disclosures__label">
                                <RadioButton
                                class="fake__checkbox"
                                    changed={() => radioChangeHandler("kpi",val, "child")}
                                    id={val.id}
                                    isSelected={radioKCType === val.id}
                                    label={""}
                                    value={val}
                                />
                                
                                    {/* <input type="radio"  id={val.id} /> */}
                                    {/* <div class="fake__checkbox"></div> */}
                                </label>
                                </tr>
                            
                            )
                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons__panel">
            <Button label='NEXT' onClickHandler={onNextHandler} className='main__button' />
                {/* <button class="buttons__panel-button">
                    CANCEL
                </button>
                <button class="main__button">
                    MAP QUESTION
                </button> */}
            </div>
        </>)
}

export default MapDisclosures;