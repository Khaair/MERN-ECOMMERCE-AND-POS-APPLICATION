import React from "react";
import { Carousel } from "antd";

const CarouselEx = () => (
  <Carousel autoplay>
    <div className="carosol-bg-one">
      <div className="banner-content-area pt-[100px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="h-[330px]"></div>
          </div>
        </div>
      </div>
    </div>
    <div className="carosol-bg-two">
      <div className="banner-content-area pt-[100px]">
        <div className="container mx-auto">
          <div className="h-[330px]"></div>
        </div>
      </div>
    </div>
    <div className="carosol-bg-three">
      <div className="banner-content-area pt-[100px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
            <div className="h-[330px]"></div>
          </div>
        </div>
      </div>
    </div>
  </Carousel>
);

export default CarouselEx;
