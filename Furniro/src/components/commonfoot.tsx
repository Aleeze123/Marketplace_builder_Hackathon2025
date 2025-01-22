import Image from "next/image";

const CommonFooter: React.FC = () => {
  return (
    <div className="bg-[#FAF3EA] px-4 py-8 lg:px-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="flex items-center gap-4">
        <Image
          loading="lazy"
          src="/trophy.png"
          alt="trophy"
          width={50}
          height={50}
          className="w-12 h-12 lg:w-16 lg:h-16"
        />
        <div>
          <p className="font-semibold text-lg lg:text-xl text-[#242424]">High Quality</p>
          <p className="text-sm lg:text-base text-[#898989]">crafted from top materials</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image
          loading="lazy"
          src="/true.png"
          alt="guarantee"
          width={50}
          height={50}
          className="w-12 h-12 lg:w-16 lg:h-16"
        />
        <div>
          <p className="font-semibold text-lg lg:text-xl text-[#242424]">Warranty Protection</p>
          <p className="text-sm lg:text-base text-[#898989]">Over 2 years</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image
          loading="lazy"
          src="/shipping.png"
          alt="shipping"
          width={50}
          height={50}
          className="w-12 h-12 lg:w-16 lg:h-16"
        />
        <div>
          <p className="font-semibold text-lg lg:text-xl text-[#242424]">Free Shipping</p>
          <p className="text-sm lg:text-base text-[#898989]">Order over 150 $</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Image
          loading="lazy"
          src="/support.png"
          alt="support"
          width={50}
          height={50}
          className="w-12 h-12 lg:w-16 lg:h-16"
        />
        <div>
          <p className="font-semibold text-lg lg:text-xl text-[#242424]">24 / 7 Support</p>
          <p className="text-sm lg:text-base text-[#898989]">Dedicated support</p>
        </div>
      </div>
    </div>
  );
};

export default CommonFooter;
