import React, { useState, useMemo } from 'react';
import { useTable, useSortBy } from 'react-table';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa6';

const DataTable = ({ data, columns, onDelete, isAdmin }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 5;

  const tableInstance = useTable(
    {
      columns: useMemo(() => {
        const enhancedColumns = [...columns];
        return enhancedColumns;
      }, [columns, isAdmin]),
      data: useMemo(() => data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize), [data, pageIndex]),
      initialState: { pageIndex: 0 },
      manualPagination: true,
      pageCount: Math.ceil(data.length / pageSize),
    },
    useSortBy
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (newPageIndex) => {
    if (newPageIndex < 0 || newPageIndex >= totalPages) return;
    setPageIndex(newPageIndex);
  };

  return (
    <div className="min-w-full ">
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
                  <td {...cell.getCellProps()} className="py-4 px-4 font-light text-white text-[14px] font-sans">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center justify-between w-full mt-4">
        <button
          onClick={() => handlePageChange(pageIndex - 1)}
          disabled={pageIndex === 0}
          className="px-4 py-2 text-white bg-gray-700 rounded"
        >
          Previous
        </button>
        <span className="text-white">
          Page {pageIndex + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageIndex + 1)}
          disabled={pageIndex === totalPages - 1}
          className="px-4 py-2 text-white bg-gray-700 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
