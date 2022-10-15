import React, { useEffect, useState } from "react";
import _get from 'lodash/get';
import _isEmpty from 'lodash/isEmpty';
import _lowerCase from 'lodash/lowerCase';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import actions from '../../actions/PackegeAction.js';
import PageInprogress from "../Common/PageInprogress/PageInprogress.jsx";

export const useDBStatus = (props) => {
    const dispatch = useDispatch();
  const { data } = useSelector(state => state.packeges);
    const [dbStatus, setDbStatus] = useState('Done');
  useEffect(() => {
    if (_isEmpty(data)) {
      dispatch(actions.getPackegeDetails());
    }
  }, []);
  useEffect(() => {
    if (dbStatus === 'Inprogress') {
      setTimeout(() => getDBStatus(), 2000)

    }
  }, [dbStatus]);
  const getDBStatus = async () => {
    try {
      setDbStatus('');
      const response = await axios.get(`${API_BASE_URL}/auth/isdbcreated?org_name=testtest`);
      if (response) {
        // setDbStatus(_get(response, 'data.DatabaseCreationStatus', 'Inprogress'));
        setDbStatus('Done');
      }
    } catch (error) {
      setDbStatus('');
    }
  }
  return [dbStatus] ; 
}