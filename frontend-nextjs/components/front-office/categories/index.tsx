import React from "react";
import Card from "./card";

const CategoriesContainer = ({getallCategories}: any) => {
  return (
    <div className="pt-10 pb-10 bg-[#f4fcfe]">
      <div className="container mx-auto">
       <div className="pb-5">
       <div className="grid grid-cols-1">
          <h2 className="text-2xl">Top Categories</h2>
          <hr className="mt-2" />
        </div>
       </div>

        <div className="grid grid-cols-6 gap-4">
        {getallCategories?.data?.map((item: any, index: any) => {
        return (
          <div key={index}>
            <Card item={item} />
          </div>
        );
      })}
        </div>
      </div>
    </div>
  );
};

export default CategoriesContainer;
