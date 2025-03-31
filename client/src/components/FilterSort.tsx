type FilterSortProp = {
  type: "filter" | "sort";
  value: string;
  onChange: (value: string) => void;
  options?: { value: string; label: string }[];
};

export default function FilterSort({
  type,
  value,
  onChange,
  options,
}: FilterSortProp) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  if (type === "filter") {
    const filterOptions = options || [
      { value: "All", label: "All" },
      { value: "headphones", label: "Headphones" },
      { value: "earbuds", label: "Earbuds" },
      { value: "speakers", label: "Speakers" },
    ];

    return (
      <div>
        <label
          htmlFor="filter"
          className="text-gray-700 font-medium mr-2 text-xl"
        >
          Filter By:
        </label>
        <select
          name="filter"
          id="filter"
          value={value}
          onChange={handleChange}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {filterOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === "sort") {
    const sortOptions = options || [
      { value: "low", label: "Price: (Low to High)" },
      { value: "high", label: "Price: (High to Low)" },
    ];

    return (
      <div>
        <label
          htmlFor="sort"
          className="text-gray-700 font-medium mr-2 text-xl"
        >
          Sort By:
        </label>
        <select
          name="sort"
          id="sort"
          value={value}
          onChange={handleChange}
          className="px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return null;
}
