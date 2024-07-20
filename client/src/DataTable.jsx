import React from 'react';
import { useTable } from 'react-table';

const DataTable = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="min-w-full mt-5 bg-[#17181E]">
      <thead className="bg-[#3E4396]">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()} className="py-3 px-4 text-left font-medium text-white text-[14px] montserrat-font ">
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="bg-[#1F2A40]">
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} className="py-3 px-4 font-light text-white text-[14px] font-sans ">
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
