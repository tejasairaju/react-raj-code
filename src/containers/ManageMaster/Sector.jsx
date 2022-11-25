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

const Sector = (props) => {
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState({});
    const [statusData, setStatusData] = useState({});

    const headers = ['Sector', 'Sub Sector'];

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

    const updateMoreOption = async (option) => {
        try {
            const response = await axios.post(`${process.env.API_BASE_URL}/esgadmin/master/sectors`, { name: option }).then(({ data }) => data);
            getSectorList();
            setStatusData({ type: 'success', message: 'Thanks! Successfully created' });
        } catch (e) {
            setStatusData({ type: 'error', message: e.message });
        }
    }

    const onCloseHandler = () => {

    }

    const MoreOptionTable = (tableData= null) => {
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
    
                        <td className="detalis__reassign row__item-info action cursor-pointer">
                            <div onClick={() => {navigate('/subsector', {state: { sector: {...val}}})}}>Add</div>
                        </td>
                    </tr>)
                })}
            </tbody>
        </table>)
    }


    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreOption label={'Sector'} placeholder={"Enter the sector"} value={''} updateMoreOption={updateMoreOption} />
        <br />
        <div id="viewCategory" className="view-diclosuer-container">
        {MoreOptionTable(categoryData.results)}
            {/* // <MoreOptionTable headers={headers} tableData={categoryData.results}/> */}
        </div>
        <br />

    </>)
}
export default Sector;