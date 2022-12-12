import React, { useState, useEffect } from "react";
import './Country.css'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import Popup from "../../components/Common/Popup/Popup.jsx";
import _get from 'lodash/get';

import './ManageMaster.css';
import AddMoreOption from "../../Components/AddMoreOption/AddMoreOption.jsx";
import MoreOptionTable from "../../Components/MoreOptionTable/MoreOptionTable.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import CountryAction from "./CountryAction.jsx";
import { getErrorMessage } from "../../utils/utils";

const Sector = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [categoryData, setCategoryData] = useState({});
    const [statusData, setStatusData] = useState({});
    const [doEdit, setDoEdit] = useState({});
    const headers = ['Sector', 'Status', 'Action'];

    useEffect(() => {
        getSectorList();
    }, []);

    const getSectorList = async () => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors`).then(({ data }) => data);
            setStatusData({ type: '', message: '' });
            setCategoryData(response);
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const onlyString= (option) =>  {
        let v =  /^[a-zA-Z,&-\s]+$/.test(option);
        let len_check = (option.length <3 || option.length > 30) ? false : true
        return v && len_check;
      }

    const check_already_exists= (value) => {
        
        const found = categoryData.results.some(el => el.name.toLowerCase() === value.toLowerCase());
        // if(found){
        //     setStatusData({ type: 'error', message: value+' Already exists' });
        // }
        return (found)? true : false;
    }

    const updateMoreOption = async (option) => {
        if (!_isEmpty(option)) {
            if(onlyString(option) && !check_already_exists(option)){
                try {
                    let response = {};
                    if (!_isEmpty(doEdit)) {
                    response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/sectors/${doEdit.id}`, { name: option }).then(({ data }) => data);
                    setDoEdit({});
                } else { response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/sectors`, { name: option }).then(({ data }) => data);
                }
                    getSectorList();
                    setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
                } catch (e) {
                    setDoEdit({});
                    let error = getErrorMessage(e);
                    setStatusData({ ...error });
                }
                setError(false);
            }
            else{setError(true);}
        
    } else {
        setError(true);
    }
    }

    const onCloseHandler = () => {

    }

    const onActive = async (val) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/sectors/${val.id}`, { ...val, is_active: true });
            getSectorList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }
    }

    const onBlock = async (val) => {
        try {
            setStatusData({ type: 'loading', message: '' });
            const response = await axios.put(`${process.env.API_BASE_URL}/esgadmin/master/sectors/${val.id}`, { ...val, is_active: false });
            getSectorList();
            setStatusData({ type: '', message: '' });
        } catch (e) {
            let error = getErrorMessage(e);
            setStatusData({ ...error });
        }

    }


    const onEdit = (val) => {
        setDoEdit({ ...val });

    }
    
    const MoreOptionTable = (tableData = null) => {
        return (<table className="default-flex-table">
            <thead>
                <tr>
                    {(headers || []).map(header => <th>{header}</th>)}
                </tr>
            </thead>
            <tbody>
                {(tableData || []).map((val, index) => {
                    return (<tr>

                        <td>{val.name}</td>
                        <td>{val.is_active ? 'Active': 'Disabled'}</td>
                        <td>
                            <CountryAction isSector={true} onEdit={() => onEdit(val)} onActive={() => onActive(val)} onBlock={() => onBlock(val)} value={val} index={index} />
                        </td>
                        {/* <td className="detalis__reassign row__item-info action cursor-pointer">
                            <div onClick={() => {navigate('/subsector', {state: { sector: {...val}}})}}>Add</div>
                        </td> */}
                    </tr>)
                })}
            </tbody>
        </table>)
    }


    return (<>
     <div class="main__top-wrapper">
            <h1 class="main__title custom-title">
                {'Manage Masters -> Sector'}
            </h1>
        </div>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreOption label={'Sector'}  status={statusData.type} isEdit={!_isEmpty(doEdit)} value={doEdit.name || ''}  placeholder={"Enter the sector"}  updateMoreOption={updateMoreOption} />
        {error && <div className='category-error color-red'>* Sector field may not be blank or contains invalid char or should be between 3 and 30 character and and allowed special character "&,-"  or already exists.</div>}
        <br />
        <div id="viewCategory" className="view-diclosuer-container">
            {MoreOptionTable(categoryData.results)}
            {/* // <MoreOptionTable headers={headers} tableData={categoryData.results}/> */}
        </div>
        <br />

    </>)
}
export default Sector;