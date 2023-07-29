import React from 'react';

const Table = ({ columnNames, columnCodes, data }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {columnNames.map((name, index) => (
              <th key={columnCodes[index]}>{name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        {data.map(record => {
          return (<tr key={record._id}>{
            columnCodes.map(name => {
              return <td key={`${record._id} ${name}`}>{record[name]}</td>
            })
          }</tr>)
        })}
        </tbody>
      </table>
    </div>
  );
};
export default Table;
