import React, { useState, useEffect } from "react";
import './Country.css'
import axios from 'axios';
import _isEmpty from 'lodash/isEmpty';
import Popup from "../../components/Common/Popup/Popup.jsx";
import _get from 'lodash/get';

import './ManageMaster.css';
import AddMoreOption from "../../Components/AddMoreOption/AddMoreOption.jsx";
import MoreOptionTable from "../../Components/MoreOptionTable/MoreOptionTable.jsx";

const Sector = (props) => {
    const [categoryData, setCategoryData] = useState({});
    const [statusData, setStatusData] = useState({});
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

    const headers = ['Sector',
        'Action'];

    return (<>
        {!!statusData.type && <Popup isShow={!!statusData.type} data={statusData} onCloseHandler={onCloseHandler} />}
        <AddMoreOption label={'Sector'} placeholder={"Enter the sector"} value={''} updateMoreOption={updateMoreOption} />
        <br />
        <div id="viewCategory" className="view-diclosuer-container">
            <MoreOptionTable headers={headers} tableData={categoryData.results}/>
        </div>
        <br />

    </>)
}
export default Sector;