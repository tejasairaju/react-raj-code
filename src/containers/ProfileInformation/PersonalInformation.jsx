import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import './PersonalInformation.css';
import Popup from '../../components/Common/Popup/Popup.jsx';

const PersonalInformation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const onCloseHandler = () => {
        setIsOpen(false)
    }
    return (<>
        <div class="main__top-wrapper">
            <h1 class="main__title">
                Personal Information
            </h1>
            <div class="framework__row right font12 ">
                <a class="right rightlink__color" onClick={() => setIsOpen(true)}>Change password</a>

            </div>
            {/* <a href="#" onclick="showpopup()" class="right rightlink__color">Change password</a> */}
        </div>

        <div class="main__content-wrapper bot10 content-wrapper">
            <div class="framework__col-wrapper">
                <div class="framework__row-wrapper bot10">
                    <div class="framework__row">
                        <h1 class="framework__title">
                            <b>Photo</b>
                        </h1>
                        <form action="#" class="add__logo-form">
                            <div class="add__logo-logo">
                                <img src="./assets/images/avatar.jpg" alt="GRI" />
                            </div>
                            <label for="add__logo" class="add__logo-label">
                                <span>
                                    Upload
                                </span>
                            </label>
                            <input type="file" name="logo" class="add__logo-input" id="add__logo"
                                accept=".jpg, .jpeg, .png" />

                        </form>

                        <div class="framework__row"> </div>
                        <div class="framework__row"> </div>
                    </div>
                </div>

                <div class="framework__row-wrapper bot10">
                    <div class="framework__row">
                        <h1 class="framework__title"><b>First Name</b></h1>

                        <input type="text" class="framework__input" required />

                    </div>
                    <div class="framework__row">
                        <h1 class="framework__title right"><b>Last Name</b></h1>

                        <input type="text" class="framework__input " required />

                    </div>
                </div>

                <div class="framework__row-wrapper bot10">
                    <div class="framework__row">
                        <h1 class="framework__title"><b>Email</b></h1>

                        <input type="text" class="framework__input" required />

                    </div>
                    <div class="framework__row">
                        <h1 class="framework__title right"><b>Mobile</b></h1>

                        <input type="text" class="framework__input " required />

                    </div>
                </div>

                <div class="framework__row-wrapper">
                    <div class="framework__row">
                        <h1 class="framework__title"><b>Country</b></h1>

                        <input type="text" class="framework__input" required />

                    </div>
                    <div class="framework__row">
                        <h1 class="framework__title right"><b>Zip/PostalCode</b></h1>

                        <input type="text" class="framework__input " required />

                    </div>
                </div>
            </div>
        </div>

        <button class="main__button">
            SAVE
        </button>

        {isOpen &&
            <Popup from="personal" isShow={isOpen} onCloseHandler={onCloseHandler} />}
    </>)
}
export default PersonalInformation;