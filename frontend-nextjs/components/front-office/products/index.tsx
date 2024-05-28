import React from "react";
import Card from "./card";

const ProductsContainer = ({item}: any) => {
  return (
    <div className="pt-10 pb-10 bg-[#f4fcfe]">
      <div className="container mx-auto">
       <div className="pb-5">
       <div className="grid grid-cols-1">
          <h2 className="text-2xl">{item?.name}</h2>
          <hr className="mt-2" />
        </div>
       </div>

        <div className="grid grid-cols-6 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default ProductsContainer;
