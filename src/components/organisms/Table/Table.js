import React, { useEffect, useState } from 'react';
import StyledTable from 'components/organisms/Table/Table.styles';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const Table = ({ columnNames, columnCodes, data, columnproportions, routePath }) => {
  const [route, setRoute] = useState('');
  const handleRecordSelect = (e) => {
    if (!routePath) return;
    e.preventDefault();
    const id = e.currentTarget.id;
    setRoute(`${routePath}/${id}`);
  };

  useEffect(() => {
    setRoute('');
  }, []);

  return (
    <>
      <StyledTable $columnproportions={columnproportions} className={routePath ? 'selectable' : ''}>
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
              <tr key={record._id} className={record.currentStatus} id={record._id} onClick={handleRecordSelect}>
                {columnCodes.map((name) => {
                  return <td key={`${record._id}-${name}`}>{record[name] || '-'}</td>;
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
export default styled(Table)`
`;
