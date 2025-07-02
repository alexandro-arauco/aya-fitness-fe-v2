"use client";

import { EyeIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  itemsPerPage?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  actions?: {
    onView?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    onDowlonad?: (item: T) => void;
  };
  customActions?: (item: T) => React.ReactNode[];
  className?: string;
  showPagination?: boolean;
}

export default function Table<T>({
  data,
  columns,
  totalItems,
  itemsPerPage = 10,
  currentPage: externalCurrentPage,
  onPageChange,
  actions,
  className = "",
  showPagination = true,
  customActions,
}: TableProps<T>) {
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const currentPage = externalCurrentPage ?? internalCurrentPage;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(1, currentPage - 1);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      if (onPageChange) {
        onPageChange(page);
      } else {
        setInternalCurrentPage(page);
      }
    }
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={`w-full ${className}`}>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 bg-gray-200">
        <thead className="text-xs text-gray-500 uppercase">
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} scope="col" className="px-6 py-3">
                {column.header}
              </th>
            ))}
            {actions && (
              <th scope="col" className="px-6 py-3 text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (actions ? 1 : 0)}
                className="px-6 py-4 text-center text-gray-500"
              >
                No items to display
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-6 py-4">
                    {column.render
                      ? column.render(item)
                      : String(item[column.key])}
                  </td>
                ))}
                {actions && (
                  <td className="px-6 py-4 flex space-x-2 justify-end">
                    {actions.onView && (
                      <button
                        className="cursor-pointer hover:scale-120 transition-transform duration-300"
                        onClick={() => actions.onView?.(item)}
                      >
                        <EyeIcon className="size-5 hover:stroke-blackhover:stroke-black" />
                      </button>
                    )}
                    {actions.onEdit && (
                      <button onClick={() => actions.onEdit?.(item)}>
                        <PencilIcon className="size-5 hover:stroke-black hover:scale-110" />
                      </button>
                    )}
                    {actions.onDelete && (
                      <button onClick={() => actions.onDelete?.(item)}>
                        <TrashIcon className="size-5 hover:stroke-black hover:scale-110" />
                      </button>
                    )}

                    {customActions?.(item).map((component, idx) => (
                      <span key={idx}>{component}</span>
                    ))}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {data.length > 0 && showPagination ? (
        <div className="flex flex-col px-6 py-4 md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm">
            Showing {startItem} to {endItem} of {totalItems} entries
          </div>

          <nav aria-label="Page navigation">
            <ul className="flex items-center space-x-1 h-8 text-sm">
              <li>
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Previous</span>
                </button>
              </li>
              {getVisiblePages().map((page) => (
                <li key={page}>
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight ${
                      currentPage === page
                        ? "text-white bg-black"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                    } border rounded-md`}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
