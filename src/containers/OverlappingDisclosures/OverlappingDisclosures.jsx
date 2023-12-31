import './OverlappingDisclosures.css';
import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { Navigate, useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
import { mapCatagory_1, mapCatagory_2 } from "../../utils/constants.js";
const { RadioButton, Button, Pills } = Fields;
import Animation from "../Animation/Animation.jsx";

const { Get } = Request;

const OverlappingDisclosures = (props) => {
    
    const [mappingFramework, setMappingFramework] = useState([]);
    const [isReverse, setIsReverse] = useState(false);
    const { search } = _get(window, 'location', '?');
    const {selectedFramework={}} = props
    const params = queryString.parse(search);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        getMappingFramework(selectedFramework.from.name,selectedFramework.to.name);
    }, []);

    const getMappingFramework = async (source_framework = "", target_framework = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/disclosure-mappings?source_framework=${source_framework}&target_framework=${target_framework}`).then(({ data }) => data);
            if (frameDetails.results.length > 0 && frameDetails.results[0].source_framework.name != source_framework) {
                setIsReverse(true)
            }
            var mapData = Object.values(frameDetails.results.reduce((result, data) => {
                var nameValue=data.source_disclosure.code+" "+data.source_disclosure.name + "_" + data.target_disclosure.code+" "+data.target_disclosure.name;
                if (!result[nameValue]) result[nameValue] = {
                    name: nameValue,
                    MappingsContext: []
                }
                result[nameValue].MappingsContext.push(data);
                return result;
            }, {}));
            setMappingFramework(mapData)
            
        } catch (e) {
            setMappingFramework([]);
        }
        finally{
            setTimeout(() => {
                setisLoading(false)
            }, 5000);
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

    {isLoading?<Animation /> :
<>
        <main className="">
            <div className="main__top-wrapper">
                <h1 className="main__title_intelligent">
                    <b>Intelligent Mapping</b>
                </h1>
            </div>
            <hr />
            <br/>
            <div className="intelligent-framework">
                <div className="system_admin_container_intelligent intelligent_main align-center">
                    <div className="framework__col-wrapper">
                        <div className="intelligent_boxvalue">
                            <div>
                                <img src={selectedFramework.from.logo} className="recommended_framework_intellgent" width="100px" height="100px" />
                            </div>
                        </div>
                    </div>

                    <div className="framework__col-wrapper">
                        <div className="intelligent_boxvalue">
                            <div>
                                <img src={selectedFramework.to.logo} className="recommended_framework_intellgent"  width="100px" height="100px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="intelligent_content_wrapper">
                {mappingFramework.length>0?
                (mappingFramework || []).map((val, index) => (
                    <div>
                        <div className="main__top-wrapper">
                            <div className="framework__row">
                                <h2 className="main__title_intelligent"><b>
                                    {`${getDisclosureName(val.name, true)}`}
                                </b>
                                </h2>
                            </div>
                            <div className="framework__row">
                                <h2 className="main__title_intelligent"><b>
                                    {`${getDisclosureName(val.name, false)}`}
                                </b></h2>
                            </div>
                        </div>
                        <div className="intelligent_mapping_wrapper">
                        {(val.MappingsContext || []).map((mapingValues, index1) => (
                                <div className="framework__row-wrapper main_title_bottom_mapping  main_title_top_mapping">
                                    <div className="framework__row">
                                        <h2 className="main__title_intelligent"> {`${getKPI(mapingValues, true)}`}</h2>
                                    </div>
                                    <div className="framework__row">
                                        <h2 className="main__title_intelligent"> {`${getKPI(mapingValues, false)}`} </h2>
                                    </div>
                                </div>
                            
                        ))}
                        </div>
                    </div>
                )):"Mapping Not Found with the selected disclosure"}
            </div>

        </main>
        <Button label='Back' onClickHandler={() => props.setIsOpenOverlappingDislosures(false)} className='main__button' /> 
        </>}
    </>)
}
export default OverlappingDisclosures;
