"use client";
import React from "react";
import { Inventory } from "@prisma/client";

interface InventoryTableProps {
  searchedItems: string;
  inventory: InventoryItem[];
}

interface InventoryItem {
  id: number;
  rollNumber: string;
  productName: string;
  width: number;
  length: number;
  createdAt: Date;
}

const InventoryTable = ({ searchedItems, inventory }: InventoryTableProps) => {
  const filteredItems = inventory.filter((item) => {
    return (
      item.rollNumber.includes(searchedItems) ||
      item.productName.toLowerCase().includes(searchedItems.toLowerCase())
    );
  });

  function getColorForProductName(productName: string): string {
    const colorMappings: { [key: string]: string } = {
      "Daytona 60": "bg-gray-100",
      "Daytona 80": "bg-blue-300",
      "DuraSoft 60": "bg-zinc-200",
      "DuraSoft 80": "bg-slate-300",
      "Kentucky Blue 60": "bg-purple-300",
      "Kentucky Blue 80": "bg-orange-300",
      "Green Valley 60": "bg-red-300",
      "Green Valley 80": "bg-green-300",
      "Pet Paradise 60": "bg-yellow-200",
      "Summer Rye 60": "bg-blue-200",
    };

    return colorMappings[productName] || "bg-gray-200";
  }

  return (
    <table className="table w-screen">
      <thead>
        <tr>
          <th>Roll Number</th>
          <th>Product Name</th>
          <th>Width</th>
          <th>Length</th>
          <th>Created At</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredItems.map((item) => (
          <tr
            key={item.id}
            className={`${getColorForProductName(item.productName)}
            cursor-pointer hover:bg-slate-400 transition-colors duration-200`}
          >
            <td>{item.rollNumber}</td>
            <td>{item.productName}</td>
            <td>{item.width}</td>
            <td>{item.length}</td>
            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-xs btn-accent text-white">Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
