import { useEffect, useState } from "react";

export default function Searchbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchQuery]); 

  useEffect(() => {
    if (debouncedQuery) onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <input
        type="text"
        placeholder="Search product"
        className="bg-gray-200 text-black px-3 py-2 text-base rounded-full w-full"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}