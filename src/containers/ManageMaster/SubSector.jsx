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
import CountryAction from "./CountryAction.jsx";
import { getErrorMessage } from "../../utils/utils";
import AddMoreSubSectorOption from "../../Components/AddMoreOption/AddMoreSubSectorOption.jsx";

const SubSector = (props) => {
    const { state = {} } = useLocation();
    const { sector = {}, id="" } = state || {};
    const [error, setError] = useState(false);
    const [subSectorList, setSubSectorList] = useState({});
    const [sectorList, setSectorList] = useState({});
    const [statusData, setStatusData] = useState({});
    const [inputValue, setInputValue] = useState({});
    const [doEdit, setDoEdit] = useState({});
    useEffect(() => {
        getSubSectorList();
        getSectorList();
    }, []);

    const getSectorList = async () => {
        try {

            const response = await Requests.Get(`/esgadmin/master/sectors`);
            setSectorList({ ...response });
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
        if (!_isEmpty(option)) {
            // let getSector = (sectorList.results || []).find(val => _get(val, 'name', '') === sector.name);
            const payload = {
                sector: _get(sector, 'id', null),
                name: option
            }
            try {
                let response = {};
                if (!_isEmpty(doEdit)) {
                    const payload_1 = {
                        sector: _get(sector, 'id', null),
                        name: option
                    }
                    response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/subsectors/${doEdit.id}`, { ...payload }).then(({ data }) => data);
                    setDoEdit({});
                } else {
                    response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/subsectors`, { ...payload }).then(({ data }) => data);
                }
                getSubSectorList();
                setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
            } catch (e) {
                let error = getErrorMessage(e);
                setStatusData({ ...error });
            }
            setError(false);
        } else {
            setError(true);
        }
    }

    const addMoreoptions = async (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value })
    }

    const onCloseHandler = () => {

    }

    const onActive = async (val) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const payload = {
                sector: _get(val, 'sector.id', null),
                is_active: true,
                name: val.name
            }
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/subsectors/${val.id}`, {...payload});
            getSubSectorList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onBlock = async (val) => {
        console.log('>>>>>>>>>>>>>>subsector', val);
        try {
            const payload = {
                sector: _get(val, 'sector.id', null),
                is_active: false,
                name: val.name
            }
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/subsectors/${val.id}`, { ...payload });
            getSubSectorList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }

    }

    const onEdit = (val) => {
        setDoEdit({ ...val });

    }

    const headers = ['Sector', 'SubSector', 'Status',
        'Action'];

    return (<>
        <div class="main__top-wrapper">
            <h1 class="main__title">
                {'Manage Masters -> SubSector'}
            </h1>
        </div>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreSubSectorOption label={'SubSector'} isEdit={!_isEmpty(doEdit)} value={doEdit.name || ''} placeholder={"Enter the subsector"} status={statusData.type} updateMoreOption={updateMoreOption} sectorName={sector.name} />
        {/* <div class="main__top-wrapper">
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
                    value={doEdit.name}
                    onChange={addMoreoptions}
                />
            </div>
            <button class="main__button" onClick={() => updateMoreOption(inputValue)}>
                ADD
            </button>
        </div> */}

        {error && <div className='category-error color-red'>* SubSector field may not be blank.</div>}
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
                            <td>{val.is_active ? 'Active' : "Disabled"}</td>
                            <td>
                                <CountryAction onEdit={() => onEdit(val)} onActive={() => onActive(val)} onBlock={() => onBlock(val)} value={val} index={index} />
                                {/* <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' /> */}
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