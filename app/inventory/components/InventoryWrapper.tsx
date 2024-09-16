"use client";

import React, { useEffect, useState } from "react";
import axios from "@/app/axiosConfig";
import InventoryTable from "./InventoryTable";
import SearchBar from "@/app/components/SearchBar";

const InventoryWrapper = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inventory, setInventory] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const inventoryResponse = await axios.get("/api/inventory");
        setInventory(inventoryResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <section className="flex space-x-8 mt-6">
        <h1 className="text-3xl font-bold text-gray-800">Inventory</h1>
        <SearchBar placeholder="Search..." onChange={handleSearchChange} />
      </section>
      <InventoryTable searchedItems={searchTerm} inventory={inventory} />
    </div>
  );
};

export default InventoryWrapper;
