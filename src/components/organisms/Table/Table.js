import React from 'react';
import StyledTable from 'components/organisms/Table/Table.styles';
import styled from 'styled-components';

const Table = ({ columnNames, columnCodes, data, columnproportions }) => {
  return (
    <StyledTable $columnproportions={columnproportions}>
      <thead>
        <tr>
          {columnNames.map((name, index) => (
            <th className={name.length > 9 ? 'long' : ''} key={columnCodes[index]}>
              {name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((record) => {
          return (
            <tr key={record._id} className={record.currentStatus}>
              {columnCodes.map((name) => {
                return <td key={`${record._id} ${name}`}>{record[name] || '-'}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </StyledTable>
  );
};
export default styled(Table)``;
