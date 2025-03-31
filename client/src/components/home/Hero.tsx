import { ShoppingCart } from "lucide-react";
import Button from "../ui/Button";
import { useNavigate } from "react-router";

export default function Hero() {
  const navigate = useNavigate()
  return (
    <section className="h-[620px] bg-[#c56cf0] px-12  py-2 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      <div className=" pt-10 md:pt-0">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-6 text-white leading-tight">
          Premium Audio & Wearable Tech
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white opacity-90">
          Experience crystal clear sound and smart technology with our curated
          collection of headphones, speakers, and smartwatches.
        </p>
        <Button className="text-xl flex items-center gap-2 px-6 py-3  text-[#c56cf0] hover:bg-opacity-90" onClick={() => navigate('/products')}>
          <ShoppingCart size={20} />
          Shop New Arrivals
        </Button>
      </div>

      <div className="mt-8 md:mt-0 flex-shrink-0">
        <img
          src="headphone-prod-3.webp"
          alt="Premium Headphones"
          className="w-full md:w-auto md:max-h-[450px] object-contain drop-shadow-2xl transform md:translate-x-8 md:translate-y-4"
        />
      </div>
    </section>
  );
}
