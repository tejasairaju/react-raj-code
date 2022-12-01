import React from "react";
import { useState } from "react";
import CountryAction from "../../containers/ManageMaster/CountryAction.jsx";

const MoreOptionTable = (props) => {

    const { headers = null, tableData = null, isCountry=false, isCategory=false, onEdit= () =>{}, onActive= () => {}, onBlock= () => {} } = props;
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
                    <td>{val.is_active ? 'Active': "Disabled"}</td>
                    <td>
                                  <CountryAction  onEdit={() => onEdit(val)} onActive={() => onActive(val)} onBlock={() => onBlock(val)}  value={val} index={index} />
            
                    </td>
                </tr>)
            })}
        </tbody>
    </table>)
}

export default MoreOptionTable;