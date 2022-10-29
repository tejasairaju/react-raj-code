import './OverlappingDisclosures.css';
import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { mapCatagory_1, mapCatagory_2 } from "../../utils/constants.js";
const { RadioButton, Button, Pills } = Fields;

const { Get } = Request;

const OverlappingDisclosures = ({ component = '' }) => {

    const [mappingFramework, setMappingFramework] = useState([]);
    const [isReverse, setIsReverse] = useState(false);
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
        // getMappingFramework("SASB%20Test", "My%20App%20ESGf");
        getMappingFramework("My App ESGf","SASB Test");
        // getMappingFramework("SASB Test","My App ESGf");
    }, []);

    const getMappingFramework = async (source_framework = "", target_framework = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/disclosure-mappings?source_framework=${source_framework}&target_framework=${target_framework}`).then(({ data }) => data);
            if (frameDetails.results.length > 0 && frameDetails.results[0].source_framework.name != source_framework) {
                setIsReverse(true)
            }
            console.log(frameDetails.results);
            var mapData = Object.values(frameDetails.results.reduce((result, data) => {
                var nameValue=data.source_disclosure.code+" "+data.source_disclosure.name + "_" + data.target_disclosure.code+" "+data.target_disclosure.name;
                if (!result[nameValue]) result[nameValue] = {
                    name: nameValue,
                    MappingsContext: []
                }
                result[nameValue].MappingsContext.push(data);
                return result;
            }, {}));
            console.log(mapData)
            setMappingFramework(mapData)
        } catch (e) {
            console.log(e)
            setMappingFramework({});
        }
    }

    const getDisclosureName = (name, isSource) => {
        var index = 0
        if (isSource) {
            index = isReverse ? 1 : 0
        } else {
            index = isReverse ? 0 : 1
        }
        return name.split("_")[index]
    }

    const getKPI = (data, isSource) => {
        if (isSource) {
            return isReverse ? data.target_disclosure_kpi.code+" "+data.target_disclosure_kpi.name : data.source_disclosure_kpi.code+" "+ data.source_disclosure_kpi.name
        } else {
            return isReverse ? data.source_disclosure_kpi.code+" "+ data.source_disclosure_kpi.name : data.target_disclosure_kpi.code+" "+data.target_disclosure_kpi.name
        }
    }



    return (<>

        <main class="main">
            <div class="main__top-wrapper">
                <h1 class="main__title_intelligent">
                    <b>Intelligent Mapping</b>
                </h1>
            </div>
            <hr />
            <br />
            <br />
            <br />
            <div class="intelligent-framework">
                <div class="system_admin_container_intelligent intelligent_main">

                    <div class="framework__col-wrapper">
                        <div class="intelligent_boxvalue">
                            <div>
                                <img src="../../assets/images/gri.png" class="recommended_framework_intellgent" />
                            </div>
                        </div>
                        {/* <div class="framework__row">
                            <h2 class="main__title_intelligent"><b>2.1 Organizational details</b></h2>
                        </div> */}
                    </div>

                    <div class="framework__col-wrapper">
                        <div class="intelligent_boxvalue">
                            <div>
                                <img src="../../assets/images/sasb.png" class="recommended_framework_intellgent" />
                            </div>
                        </div>
                        {/* <div class="framework__row">
                            <h2 class="main__title_intelligent"><b>CO-2 Give a general description and introdution
                                to your
                                organization</b></h2>
                        </div> */}
                    </div>
                </div>
            </div>

            <div class="intelligent_content_wrapper">
                {/* <div class="intelligent_mapping_wrapper ">

                    <div class="framework__row-wrapper main_title_bottom_mapping main_title_top_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2-1-a. report its legal name</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-a. Legal name </h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-b. report nature of ownership and legal form</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-b. Nature of ownership and legal form </h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-c. report the location of its headquarters</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-c. Location of its headquarters</h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-d. report its countries of operation</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-d. Countries of operation </h2>
                        </div>
                    </div>
                </div> */}
                {/* {mappingFramework} */}
                {(mappingFramework || []).map((val, index) => (
                    <div>
                        <div class="main__top-wrapper">
                            <div class="framework__row">
                                <h2 class="main__title_intelligent"><b>
                                    {`${getDisclosureName(val.name, true)}`}
                                </b>
                                </h2>
                            </div>
                            <div class="framework__row">
                                <h2 class="main__title_intelligent"><b>
                                    {`${getDisclosureName(val.name, false)}`}
                                </b></h2>
                            </div>
                        </div>
                        <div class="intelligent_mapping_wrapper">
                        {(val.MappingsContext || []).map((mapingValues, index1) => (
                                <div class="framework__row-wrapper main_title_bottom_mapping  main_title_top_mapping">
                                    <div class="framework__row">
                                        <h2 class="main__title_intelligent"> {`${getKPI(mapingValues, true)}`}</h2>
                                    </div>
                                    <div class="framework__row">
                                        <h2 class="main__title_intelligent"> {`${getKPI(mapingValues, false)}`} </h2>
                                    </div>
                                </div>
                            
                        ))}
                        </div>
                    </div>
                ))}
                {/* <div class="main__top-wrapper">
                    <div class="framework__row">
                        <h2 class="main__title_intelligent"><b>2-3 Reporting period, frequency and contact poiint</b>
                        </h2>
                    </div>
                    <div class="framework__row">
                        <h2 class="main__title_intelligent"><b>CO-2 State the start and end date of the year of which
                            you for
                            which you are reporting data</b></h2>
                    </div>
                </div>

                <div class="intelligent_mapping_wrapper">

                    <div class="framework__row-wrapper main_title_bottom_mapping  main_title_top_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2-1-a. report its legal name</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-a. Legal name </h2>
                        </div>
                    </div>
                </div> */}
                {/* <div class="framework__row-wrapper main_title_bottom_mapping ">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-b. report nature of ownership and legal form</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-b. Nature of ownership and legal form </h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-b. report nature of ownership and legal form</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-b. Nature of ownership and legal form </h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-b. report nature of ownership and legal form</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-b. Nature of ownership and legal form </h2>
                        </div>
                    </div>
                    <div class="framework__row-wrapper main_title_bottom_mapping">
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">2.1-b. report nature of ownership and legal form</h2>
                        </div>
                        <div class="framework__row">
                            <h2 class="main__title_intelligent">CO-2-b. Nature of ownership and legal form </h2>
                        </div>
                    </div> */}
                {/* </div> */}
            </div>

        </main>

    </>)
}
export default OverlappingDisclosures;
