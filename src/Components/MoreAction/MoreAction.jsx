import React, { useState } from 'react';
import _get from 'lodash/get';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MoreAction.css';
import axios from 'axios';
import Requests from '../../Requests';
import DeletePopup from '../Common/Popup/DeletePopup.jsx';

const MoreAction = (props) => {
  const {
    value,
    index,
    viewListFramework = false,
    viewDisclosures = false,
    viewBespokeFramework = false,
    isAssignDisClosure = false,
    viewBespokeDisclosures = false,
    viewReport = false,
    actionIcon = '../../assets/icons/more-icon.svg',
    deleteCallback = () => {},
    ...rest
  } = props;
  const [isOpen, setIsopen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState('');
  const { orgDetails = {} } = useSelector((state) => state.signup);
  const { loginDetails = {} } = useSelector((state) => state.signup);
  const navigate = useNavigate();
  const onNavigateHandler = (url) => {
    setIsopen(false);
    navigate(url);
  };

  const onCloseHandler = () => {};

  const generateReport = async (id, name) => {
    try {
      axios
        .post(
          `${process.env.API_BASE_URL}/reports/${id}/publish?organization=${orgDetails.name}`,
          { responseType: 'blob' } // !!!
        )
        .then((response) => {
          // window.open(URL.createObjectURL(new Blob(response.data)));
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', name + '.pdf'); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
    } catch (e) {
      console.log(e);
    }
  };
  // const deleteReport = async (id ) => {
  //     try {
  //        const res = await Requests.Delete(
  //         `/reports/${id}`, { organization: orgDetails.name });
  //         callback();
  //     } catch (e) {
  //         console.log(e)
  //     }
  // }

  const onRedirectWithState = (url) => {
    navigate(url, {
      state: {
        ...rest.state,
      },
    });
    setIsopen(false);
  };

  return (
    <div onClick={() => setIsopen(false)} className='more-action-contianer'>
      <div
        tabindex={index}
        className={`frametoggler`}
        onClick={(e) => {
          setIsopen(!isOpen);
          e.stopPropagation();
        }}
      >
        <img src={actionIcon} alt='more' width='28px' height='28px' />
      </div>
      <div
        className={`framedropdown framedropdown-${
          isOpen ? 'active' : 'inactive'
        }`}
      >
        {viewListFramework && (
          <>
            <div
              className='lh1-5'
              onClick={() =>
                onNavigateHandler(`/createframe?id=${value.id}&isEdit=${true}`)
              }
            >
              <a>Edit Framework</a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  navigate(`/createdisclosures?id=${value.id}`);
                }}
              >
                Create Disclosures
              </a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  navigate(`/viewdisclosures?id=${value.id}`);
                }}
              >
                View Disclosures
              </a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  setCurrentItem('framework');
                  setIsDelete(true);
                }}
              >
                Delete Framework
              </a>
            </div>
          </>
        )}
        {viewDisclosures && (
          <>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(
                  `/createdisclosures?id=${_get(
                    props,
                    'state.framework',
                    ''
                  )}&disclosureId=${_get(
                    props,
                    'state.id',
                    ''
                  )}&isEditable=true`
                )
              }
            >
              <a>Edit Disclosure</a>
            </div>
            <div
              className='lh1-5'
              onClick={() => onRedirectWithState(`/createquestions`)}
            >
              <a>Create Questions</a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  onRedirectWithState(`/viewQuestions`);
                }}
              >
                View Questions
              </a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  setCurrentItem('disclosure');
                  setIsDelete(true);
                }}
              >
                Delete Disclosure
              </a>
            </div>
          </>
        )}
        {viewBespokeFramework && (
          <>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(`/template?id=${value.id}&isEdit=${true}`)
              }
            >
              <a>Edit Framework</a>
            </div>
            <div
              className='lh1-5'
              onClick={() => onRedirectWithState(`/template/${value.id}`)}
            >
              <a>Create Disclosures</a>
            </div>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(
                  `/view/bespoke/${value.id}/disclosures`,
                  value.name
                )
              }
            >
              <a>View Disclosures</a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  setCurrentItem('framework');
                  setIsDelete(true);
                }}
              >
                Delete Framework
              </a>
            </div>
          </>
        )}
        {viewBespokeDisclosures && (
          <>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(
                  `/template/${value.template_id}?disclosureId=${value.id}&isEditable=true`
                )
              }
            >
              <a>Edit Disclosure</a>
            </div>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(
                  `/template/${value.template_id}/disclosures/${value.id}`
                )
              }
            >
              <a>Create Questions</a>
            </div>
            <div
              className='lh1-5'
              onClick={() =>
                onRedirectWithState(
                  `/template/${value.template_id}/disclosures/${value.id}/questions`
                )
              }
            >
              <a>View Questions</a>
            </div>
            <div className='lh1-5'>
              <a
                onClick={() => {
                  setCurrentItem('disclosure');
                  setIsDelete(true);
                }}
              >
                Delete Disclosure
              </a>
            </div>
          </>
        )}
        {viewReport && (
          <>
            {isAssignDisClosure ? (
              <div
                className='lh1-5'
                onClick={() =>
                  onRedirectWithState(`/report/${value.id}/disclosures`)
                }
              >
                <a>Assign Disclosures</a>
              </div>
            ) : (
              <>
                <div
                  className='lh1-5'
                  onClick={() => generateReport(value.id, value.name)}
                >
                  <a>Generate Reports</a>
                </div>
                <div
                  className='lh1-5'
                  onClick={() => {
                    setCurrentItem('report');
                    setIsDelete(true);
                  }}
                >
                  <a>Delete Reports</a>
                </div>
              </>
            )}
          </>
        )}
      </div>
      {isDelete && (
        <DeletePopup
          name={currentItem}
          isShow={isDelete}
          setIsDelete={setIsDelete}
          onCloseHandler={onCloseHandler}
          deleteConfirm={deleteCallback}
        />
      )}
    </div>
  );
};

export default MoreAction;
