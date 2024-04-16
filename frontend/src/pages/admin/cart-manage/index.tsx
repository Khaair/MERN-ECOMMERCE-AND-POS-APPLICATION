// Product.js

import { useDispatch } from "react-redux";
import { addToCart } from "../../../store/slices/cartSlice";
import CartManage from "./show";
import Layout from "../../../layout";

interface ProductProps {
  data: {
    id: string;
    category:string;
    title: string;
    imgSrc: string;
    price: number;
  }[];
}

const Product = ({data}: ProductProps) => {
  const dispatch = useDispatch();

  return (
    <Layout>
      <div className="bg-[white] rounded-lg p-5 min-screen-height">
        <div className="grid sm:gap-0 md:gap-0 lg:gap-0 xl:gap-4 2xl:gap-4 gap-0 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-4 2xl:grid-cols-4">
          <div className="col-span-3">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              {data?.map((el: any, index: any) => {
                return (
                  <div key={index} className="border p-3 rounded text-center">
                    <div className="flex justify-center">
                      <div className="w-[150px] h-[100px]">
                        <img src={el?.imgSrc} alt="product" />
                      </div>
                    </div>

                    <h4 className="text-base leading-5 mt-2">{el?.title}</h4>
                    <h5 className="text-base  mt-2"> ${el?.price} </h5>
                    <button
                      className="bg-[#E8F2FC] px-2 py-1 text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white]  mt-2"
                      onClick={() => dispatch(addToCart(el))}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-1">
            <CartManage />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
