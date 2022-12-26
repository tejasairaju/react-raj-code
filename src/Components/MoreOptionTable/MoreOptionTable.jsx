import React from 'react';
import { useState } from 'react';
import CountryAction from '../../containers/ManageMaster/CountryAction.jsx';

const MoreOptionTable = (props) => {
  const { headers = null, tableData = null, isCountry = false, isCategory = false, onEdit = () => {}, onActive = () => {}, onBlock = () => {} } = props;
  return tableData && tableData.length > 0 ? (
    <table className='default-flex-table'>
      <thead>
        <tr>
          {(headers || []).map((header) => (
            <th>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {(tableData || []).map((val, index) => {
          return (
            <tr>
              <td>{val.name}</td>
              <td>{val.is_active ? 'Active' : 'Blocked'}</td>
              <td>
                <CountryAction
                  name={isCategory ? 'category' : 'country'}
                  onEdit={() => onEdit(val)}
                  onActive={() => onActive(val)}
                  onBlock={() => onBlock(val)}
                  value={val}
                  index={index}
                  deleteCallback={null}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  ) : (
    <div className='flex justify-center w-full'>No records found</div>
  );
};

export default MoreOptionTable;
