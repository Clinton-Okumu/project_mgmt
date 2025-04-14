import React from "react";
import SearchBar from "./SearchBar";
import FilterButton from "./FilterButton";

export default function SearchAndFilter() {
  return (
    <div className="flex mb-6">
      <SearchBar />
      <FilterButton />
    </div>
  );
}
