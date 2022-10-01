import React, { useState, useEffect } from "react";
import axios from 'axios';
import _get from 'lodash/get';
import queryString from 'query-string';
import './MapDisclosures.css';
import Popup from '../../components/Common/Popup/Popup.jsx';
import { useNavigate } from "react-router-dom";
import Fields from '../../Components/Common/Fields/Fields.jsx';
const { RadioButton } = Fields;

const { Get } = Request;

const MapDisclosures = () => {
    const navigate = useNavigate();
    const [apiData, setApiData] = useState({});
    const [catagoryType, setCatagoryType] = useState();
    const [frameworkData, setFrameworkData] = useState({})
    const [statusData, setStatusData] = useState({});
    const { search } = _get(window, 'location', '?');
    const params = queryString.parse(search);


    useEffect(() => {
        const getDisclosures = async () => {
            try {
                setStatusData({ type: 'loading', message: '' });
                const response = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}/disclosures`).then(({ data }) => data);
                setStatusData({ type: '', message: '' });
                console.log('>>>>>>>>>>>>', response.results);
                setApiData(response);
            } catch (e) {
                setStatusData({ type: 'error', message: e.message });
            }
        }
        getframeworkDetails();
        getDisclosures();
    }, []);

    const getframeworkDetails = async (id = "") => {
        try {
            const frameDetails = await axios.get(`${process.env.API_BASE_URL}/esgadmin/frameworks/${params.id}`).then(({ data }) => data);
            setFrameworkData(frameDetails);
        } catch (e) {
            setFrameworkData({});
        }
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
                        <div class="frameworks__choose-item active">
                            <img src="./assets/images/gri.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/sasb.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/tcfd.png" alt="GRI" />
                        </div>
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
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-1 Organisational details
                                </p>
                                <label for="organisational__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="organisational__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-6 Activities, value chain and other business relationships
                                </p>
                                <label for="activities__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="activities__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    22-9 Governance structure and composition 
                                </p>
                                <label for="governance__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="governance__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-19 Remuneration policies
                                </p>
                                <label for="remuneration__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="remuneration__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-23 GRI 305 -5 Reduction of GHG Emissions
                                </p>
                                <label for="gri__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="gri__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">
                            <div class="disclosures__item">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="map__wrapper">
                    <h1 class="assign__title">
                        Choose a Framework to map to:
                    </h1>
                    <div class="frameworks__choose">
                        <div class="frameworks__choose-item active">
                            <img src="./assets/images/sasb.png" alt="GRI" />
                        </div>
                        <div class="frameworks__choose-item">
                            <img src="./assets/images/tcfd.png" alt="GRI" />
                        </div>
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
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-1 Organisational details
                                </p>
                                <label for="organisational__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="organisational__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-6 Activities, value chain and other business relationships
                                </p>
                                <label for="activities__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="activities__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    22-9 Governance structure and composition 
                                </p>
                                <label for="governance__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="governance__checkbox" />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-19 Remuneration policies
                                </p>
                                <label for="remuneration__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="remuneration__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                            <div class="disclosures__item">
                                <p class="disclosures__detalis">
                                    2-23 GRI 305 -5 Reduction of GHG Emissions
                                </p>
                                <label for="gri__checkbox" class="disclosures__label">
                                    <input type="checkbox" class="disclosures__checkbox" id="gri__checkbox" checked />
                                    <div class="fake__checkbox"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="map__check-item">
                        <h1 class="assign__title">
                            Question:
                        </h1>
                        <div class="disclosures__wrapper">
                            <div class="disclosures__item">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons__panel">
                <button class="buttons__panel-button">
                    CANCEL
                </button>
                <button class="main__button">
                    MAP QUESTION
                </button>
            </div>
        </>)
}

export default MapDisclosures;