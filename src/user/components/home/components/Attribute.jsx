import { Package, Store, RotateCcw, Headphones } from "lucide-react";

const Attribute = () => {
  const items = [
    {
      icon: <Headphones className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "24/7 Customer Support",
      desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
    },
    {
      icon: <Package className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Special Packaging",
      desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
    },
    {
      icon: <Store className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Pick Up In Store",
      desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
    },
    {
      icon: <RotateCcw className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Free Global Returns",
      desc: "At imperdiet dui accumsan sit amet nulla risus est ultricies quis.",
    },
  ];

  return (
    <div className=" px-6 sm:px-10 lg:px-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="p-6 text-center bg-white shadow rounded-lg hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h1 className="text-xl font-semibold mb-2">{item.title}</h1>
            <p className="text-gray-500 text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attribute;
