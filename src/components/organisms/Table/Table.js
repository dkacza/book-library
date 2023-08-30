import React, {useEffect, useState} from 'react';
import StyledTable from 'components/organisms/Table/Table.styles';
import styled from 'styled-components';
import {Navigate} from 'react-router-dom';

const Table = ({columnNames, columnCodes, data, columnproportions, actionOnSelect, ...props}) => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    setRoute('');
  }, []);
  const selectableClass = actionOnSelect ? 'selectable' : '';
  actionOnSelect = actionOnSelect || (() => {});

  return (
    <>
      <StyledTable
        $columnproportions={columnproportions}
        className={`${props.className} ${selectableClass}`}
      >
        <thead>
          <tr>
            {columnNames.map((name, index) => (
              <th className={name.length > 8 ? 'long' : ''} key={columnCodes[index]}>
                {name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(record => {
            return (
              <tr
                key={record._id}
                className={record.currentStatus}
                id={record._id}
                onClick={e => actionOnSelect(e, setRoute)}
              >
                {columnCodes.map(name => {
                  return (
                    <td key={`${record._id}-${name}`}>
                      {record[name] ? (record[name] === true ? 'Yes' : record[name]) : 'No'}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>

      <Navigate to={route} />
    </>
  );
};
export default styled(Table)``;
