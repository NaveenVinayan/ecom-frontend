import { Package, Store, RotateCcw, Headphones } from "lucide-react";

const Attribute = () => {
  const items = [
    {
      icon: <Headphones className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "24/7 Customer Support",
      desc: "Our dedicated support team is available around the clock to help you with inquiries, orders, and product assistance.",
    },
    {
      icon: <Package className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Special Packaging",
      desc: "Every order is carefully packaged with premium materials to ensure your items arrive safe and in perfect condition.",
    },
    {
      icon: <Store className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Pick Up In Store",
      desc: "Shop online and conveniently pick up your items at a nearby store location, saving time and shipping costs.",
    },
    {
      icon: <RotateCcw className="w-[46px] h-[46px] text-gray-500" strokeWidth={1.5} />,
      title: "Free Global Returns",
      desc: "Enjoy hassle-free returns worldwide with our free return policy, giving you confidence and flexibility in your purchase.",
    }
  ];

  return (
    <div className="  py-20 lg:px-25 px-10">
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
