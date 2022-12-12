import React, {useEffect} from "react";
import Axios from 'axios';
import actions from "../../../actions/AppWizardAction";
import { useDispatch } from "react-redux";

const CustomFetchMaster = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        getUserAdminInfo()
    }, []);

    const getUserAdminInfo = async () => {
        try {
            await Axios.all([
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/countries?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/sectors?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/subsectors?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/disclosure-categories?is_active=active`),
                Axios.get(`${process.env.API_BASE_URL}/esgadmin/master/industries?is_active=active`),
            ]).then(([{ data: countries }, { data: sectors }, { data: subsectors }, { data: categories }, { data: industries } /*{ data: subsectors }*/]) => {
                dispatch(actions.updateWizardData({ countries: countries.results, sectors: sectors.results, subsectors: subsectors.results, categories: categories.results }));
            });
        } catch (error) {
            console.log(error);
        }
    }
    return [null, null]
}

export default CustomFetchMaster;