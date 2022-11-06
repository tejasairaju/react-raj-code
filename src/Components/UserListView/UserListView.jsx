import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import './UserListView.css';
import axios from "axios";
import Requests from "../../Requests";
const userListMock = [{
    id: 1,
    name: 'John Smith',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'Cooper',
    job: 'Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'Mark',
    job: 'Ass.Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'John william',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'John',
    job: 'Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'Cooper hook',
    job: 'Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'Donal',
    job: 'Ass.Admin Manager',
    "logo": "https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}, {
    id: 1,
    name: 'Raj',
    job: 'Admin Manager',
    "logo":"https://s3.eu-west-2.amazonaws.com/admin.esgdisclose/media/Avatar_3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAY47EUU7TAIE7BH5V%2F20221019%2Feu-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221019T102535Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=d875784ab6aa9f3b9bd3ff2ee50776af819bc15e963e35cbf9f660501d4f756c"
}]


const UserListView = (props) => {
    const {onClickUserSelect = () => {}} = props
    const { orgDetails = {} } = useSelector(state => state.signup);
    const [userList, setUserList] = useState([]);
    useEffect(() => {
        getUserList();
    }, []);

    const getUserList = async() => {
        try {
            const response = await Requests.Get(`/users/`, {organization:orgDetails.name});
            setUserList([...response.results]);
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
                {/* <img src='../../assets/images/user-avatar.svg' width={'30px'} height={'30px'} alt="avatar" /> */}
                <p class="user-name">
                    <span><b>Name:</b></span>{user.first_name}&nbsp;{user.last_name}
                </p>
                <p class="job-title">
                <span><b>Role:</b></span>{user.role}
                </p>
            </div>)
            }
            <div class="right__arrow"></div>

        </div>)



}

export default UserListView;