import React from 'react';
import StyledTable from 'components/organisms/Table/Table.styles';

const Table = ({ columnNames, columnCodes, data }) => {
  return (
    <StyledTable>
      <thead>
        <tr>
          {columnNames.map((name, index) => (
            <th key={columnCodes[index]}>{name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record) => {
          return (
            <tr key={record._id}>
              {columnCodes.map((name) => {
                return <td key={`${record._id} ${name}`}>{record[name]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
export default Table;
