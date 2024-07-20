import React from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSortDown } from "react-icons/fa6";
import { FaSortUp } from "react-icons/fa";
import { FaSort } from "react-icons/fa6";

const DataTable = ({ data, columns }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <table {...getTableProps()} className="min-w-full mt-5 bg-[#17181E]">
      <thead className="bg-[#3E4396]">
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className="py-3 px-4 text-left font-medium text-white text-[14px] montserrat-font cursor-pointer"
              >
                <div className="flex items-center">
                  {column.render('Header')}
                  <span className="ml-2">
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FaSortDown size={20} className='text-white' />
                        : <FaSortUp size={20} className='text-white' />
                      : <FaSort size={20} className='text-white' />}
                  </span>
                </div>
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
                <td {...cell.getCellProps()} className="py-3 px-4 font-light text-white text-[14px] font-sans">
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
