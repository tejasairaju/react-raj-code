import React from "react";
import { useState } from "react";

const MoreOptionTable = (props) => {

    const { headers = null, tableData = null } = props;
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

                    <td>
                        {/* <CountryAction value={val} index={index} /> */}
                        <img src='assets/icons/more-icon.svg' alt='more' width='28px' height='28px' />
                    </td>
                </tr>)
            })}
        </tbody>
    </table>)
}

export default MoreOptionTable;