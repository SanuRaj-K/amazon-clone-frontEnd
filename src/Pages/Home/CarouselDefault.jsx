import React, { useEffect, useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

import pic1 from "../../Assets/Images/sliders/4_3000pc._CB583023268_.jpg";
import pic2 from "../../Assets/Images/sliders/5300-Kitchen---Hero-stripe-change--BAU-Adapt-3000-X-1200._CB583761349_.jpg";
import pic3 from "../../Assets/Images/sliders/D92807365-_1_Tallhero_2xx._CB598669664_.jpg";
import pic4 from "../../Assets/Images/sliders/Desktop_Hero_3000x1200_2copy2x._CB584609033_.jpg";
import pic5 from "../../Assets/Images/sliders/pc_2x._CB584618827_.jpg";

function CarouselDefault() {
  const slides = [
    { url: pic1 },
    { url: pic2 },
    { url: pic3 },
    { url: pic4 },
    { url: pic5 },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [border, setBorder] = useState(false);
  const [rightborder, setRightBorder] = useState(false);

  const backSlide = () => {
    const firstSlide = currentIndex === 0;
    const newIndex = firstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setBorder(true);
    setRightBorder(false);
  };
  const forwardSlide = () => {
    const lastSlide = currentIndex === slides.length - 1;
    const newIndex = lastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    setRightBorder(true);
    setBorder(false);
  };
  useEffect(() => {
    const interval = setInterval(() => {
      forwardSlide();
      setBorder(false);
      setRightBorder(false);
    }, 3000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, slides.length]);
  return (
    <div className=" max-w-[1400px] h-[780px] w-full m-auto    relative ">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className=" w-full h-full   bg-center bg-cover duration-500"
      >
        <div
          className={` absolute top-[20%]   left-5 rounder-full p-2     cursor-pointer ${
            border ? " outline " : ""
          }`}
        >
          <BsChevronCompactLeft onClick={backSlide} size={50} />
        </div>
        <div
          className={` absolute top-[20%]   right-5   rounder-full p-2     cursor-pointer ${
            rightborder ? "outline" : ""
          }`}
        >
          <BsChevronCompactRight onClick={forwardSlide} size={50} />
        </div>
      </div>
    </div>
  );
}

export default CarouselDefault;
