import React, { useState, useEffect } from "react";
import './Country.css'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import Requests from "../../Requests";
import Popup from "../../components/Common/Popup/Popup.jsx";
import _get from 'lodash/get';

import './ManageMaster.css';
import AddMoreOption from "../../Components/AddMoreOption/AddMoreOption.jsx";
import MoreOptionTable from "../../Components/MoreOptionTable/MoreOptionTable.jsx";
import { useLocation } from "react-router-dom";

const SubSector = (props) => {
    const { state = {} } = useLocation();
    const { sector = {} } = state || {};
    const [subSectorList, setSubSectorList] = useState({});
    const [sectorList, setSectorList] = useState({});
    const [statusData, setStatusData] = useState({});
    const [inputValue, setInputValue] = useState({});
    useEffect(() => {
        getSubSectorList();
        getSectorList();
    }, []);

    const getSectorList = async () => {
        try {
          
            const response = await Requests.Get(`/esgadmin/master/sectors`);
            setSectorList({...response});
        } catch (e) {
            console.log(e);
        }
    }

    const getSubSectorList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/subsectors`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            setSubSectorList(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const updateMoreOption = async (option) => {

        let getSector = (sectorList.results || []).find(val => _get(val, 'name', '') === sector.name);
        const payload = {
            sector: _get(getSector, 'id', null),
            name: inputValue.subsector
        }
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/subsectors`, { ...payload }).then(({ data }) => data);
            getSubSectorList();
            setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const addMoreoptions = async (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    }

    const onCloseHandler = () => {

    }

    const headers = ['Sector', 'SubSector',
        'Action'];

    return (<>
         <div class="main__top-wrapper">
            <h1 class="main__title">
                {'Manage Masters -> SubSector'}
            </h1>
        </div>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <div class="main__top-wrapper">
            <div class="user_input_text flex flex-column">
                <h1 class="main__title">
                    {'Sector'} :
                </h1>
                <input type="text" name='sector' class="country__text__box"
                    placeholder={'Enter the sector'}
                    value={sector.name}
                    readOnly={true}
                    onChange={addMoreoptions}
                />
            </div>
            <div class="user_input_text flex flex-column">
                <h1 class="main__title white-space">
                    {'SubSector'} :
                </h1>
                <input type="text" name='subsector' class="country__text__box"
                    placeholder={'Enter the subsector'}
                    value={inputValue.subsector}
                    onChange={addMoreoptions}
                />
            </div>
            <button class="main__button" onClick={() => updateMoreOption(inputValue)}>
                ADD
            </button>
        </div>
        <br />
        <div id="viewCategory" className="view-diclosuer-container">
            <table className="default-flex-table">
                <thead>
                    <tr>
                        {(headers || []).map(header => <th>{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {(subSectorList.results || []).map((val, index) => {
                        return (<tr>

                            <td>{val.sector.name}</td>
                            <td>{val.name}</td>
                            <td>
                                {/* <CountryAction value={val} index={index} /> */}
                                <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' />
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
        <br />

    </>)
}
export default SubSector;