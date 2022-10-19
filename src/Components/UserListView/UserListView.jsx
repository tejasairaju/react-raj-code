import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './UserListView.css';
import axios from "axios";

const userListMock = [{
    id: 1,
    name: 'John Smith',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'Cooper',
    job: 'Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'Mark',
    job: 'Ass.Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'John william',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'John',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'Cooper hook',
    job: 'Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'Donal',
    job: 'Ass.Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}, {
    id: 1,
    name: 'Raj',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_01.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221018%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221018T173353Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=4f3c0a0a9535f14519d8631a33dae3ef5e97eb399d12eef60af3b2e5c39ab8e3",

}]



const UserListView = (props) => {
    const {onClickUserSelect = () => {}} = props
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = () => {
        try {
            // const response = axios.get(`${process.env.API_BASE_URL}/users/?organization=${orgDetails.id}`);
            setUserList([...userListMock]);
        } catch (e) {
            setUserList([])
        }
    }

    const onClickHandler = (index, user) => {
        let cloneUserList = [...userList];
        cloneUserList = (cloneUserList || []).map((item, i) => {
            if(i === index) {
                item['isSelected'] = !item['isSelected'];
            } else {
                item['isSelected'] = false;
            }
            return item;
        })
        setUserList([...cloneUserList]);
        onClickUserSelect(user);
        
    }


    return (
        <div class="user__wrapper user-wrapper-scroll">
            <div class="left__arrow"></div>
            {(userList || []).map((user, i) => <div key={i} onClick={() => onClickHandler(i, user)} class={`user__container ${user.isSelected ? 'active': null}`}>
                <img src={user.logo} alt="avatar" />
                <p class="user-name">
                    {user.name}
                </p>
                <p class="job-title">
                    {user.job}
                </p>
            </div>)
            }
            <div class="right__arrow"></div>

        </div>)



}

export default UserListView;