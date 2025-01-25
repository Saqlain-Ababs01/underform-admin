"use client";

import React, { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Edit, Trash, MoreVertical } from "lucide-react";

const initialData = [
  {
    id: "1",
    items: "Product A, Product B",
    totalAmount: 100,
    shipping: "Express",
    status: "Pending",
  },
  {
    id: "2",
    items: "Product C",
    totalAmount: 50,
    shipping: "Standard",
    status: "Shipped",
  },
  {
    id: "3",
    items: "Product D, Product E, Product F",
    totalAmount: 200,
    shipping: "Express",
    status: "Delivered",
  },
  // Add more data here for testing pagination
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `${i + 4}`,
    items: `Product ${i + 4}`,
    totalAmount: (i + 1) * 25,
    shipping: i % 2 === 0 ? "Express" : "Standard",
    status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "Shipped" : "Delivered",
  })),
];

const columnHelper = createColumnHelper();

export default function AdminOrdersPage() {
  const [data, setData] = useState(initialData);
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10; // Set the number of rows per page

  const paginatedData = data.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  const handleStatusChange = (id, newStatus) => {
    setData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const columns = [
    columnHelper.accessor("id", {
      cell: (info) => info.getValue(),
      header: "Order ID",
    }),
    columnHelper.accessor("items", {
      cell: (info) => info.getValue(),
      header: "Items",
    }),
    columnHelper.accessor("totalAmount", {
      cell: (info) => `$${info.getValue()}`,
      header: "Total Amount",
    }),
    columnHelper.accessor("shipping", {
      cell: (info) => info.getValue(),
      header: "Shipping",
    }),
    columnHelper.accessor("status", {
      cell: (info) => {
        const rowId = info.row.original.id;
        const currentStatus = info.getValue();

        return (
          <select
            value={currentStatus}
            onChange={(e) => handleStatusChange(rowId, e.target.value)}
            className={`px-2 py-1 rounded-full text-xs font-semibold
              ${
                currentStatus === "Pending"
                  ? "bg-yellow-200 text-yellow-800"
                  : currentStatus === "Shipped"
                  ? "bg-blue-200 text-blue-800"
                  : "bg-green-200 text-green-800"
              }`}
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        );
      },
      header: "Status",
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <Menu as="div" className="relative inline-block text-left">
          <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <MoreVertical className="h-5 w-5" aria-hidden="true" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => console.log("Edit order", info.getValue())}
                  >
                    <Edit className="mr-2 h-5 w-5" aria-hidden="true" />
                    Edit
                  </button>
                )}
              </MenuItem>
              <MenuItem>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => console.log("Delete order", info.getValue())}
                  >
                    <Trash className="mr-2 h-5 w-5" aria-hidden="true" />
                    Delete
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      ),
      header: "Action",
    }),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
          className={`px-4 py-2 bg-gray-200 rounded ${
            pageIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Previous
        </button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
        </span>
        <button
          onClick={() =>
            setPageIndex((prev) =>
              prev < Math.ceil(data.length / pageSize) - 1 ? prev + 1 : prev
            )
          }
          disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
          className={`px-4 py-2 bg-gray-200 rounded ${
            pageIndex >= Math.ceil(data.length / pageSize) - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
