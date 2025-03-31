import { Link } from "react-router";

export default function Categories() {
  const categories = [
    {
      id: 1,
      name: "Headphones",
      image: "headphone.jpg",
      url: "headphones",
      description: "Immersive audio experience",
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      image: "wireless.jpg",
      url: "earbuds",
      description: "Freedom to move",
    },
    {
      id: 3,
      name: "Speakers",
      image: "speakers.jpg",
      url: "speakers",
      description: "Room-filling sound",
    },
    {
      id: 4,
      name: "Smartwatches",
      image: "smartwatch.jpg",
      url: "smartwatches",
      description: "Tech on your wrist",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl text-left font-bold mb-5">
          Browse by Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/products/category/${category.url}`}
              className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-cover rounded-md "
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
