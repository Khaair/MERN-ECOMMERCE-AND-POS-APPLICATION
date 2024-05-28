import { Drawer, Form, Input, InputNumber, Select } from "antd";
import { useRef, useState } from "react";
import {
  MinusOutlined,
  PlusOutlined,
  DeleteOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import AddCustomer from "./add-customer";
import Invoice from "./invoice";
import Layout from "./layout";

interface Product {
  id: string;
  category: string;
  title: string;
  imgSrc: string;
  price: number;
}

interface HomeContainerProps {
  data: Product[];
}

interface CartItem {
  id: string;
  quantity: number;
  price: number;
  title: string;
  imgSrc: string;
}
const POSAPP: React.FC<HomeContainerProps> = ({ data }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [getFilteredData, setFilteredData] = useState<any>(data);
  const [showInvoiceContent, setShowInvoiceContent] = useState(false);
  const [getSelectedData, setSelectedData] = useState("");
  const addToCart = (product: {
    id: string;
    quantity: number;
    price: number;
    title: string;
    imgSrc: string;
  }) => {
    const existingProduct = cart?.find((item: any) => item?.id === product?.id);

    if (existingProduct) {
      setCart((prevCart: any) =>
        prevCart?.map((item: any) =>
          item?.id === product?.id
            ? { ...item, quantity: item?.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increment = (productId: any) => {
    setCart((prevCart: any) =>
      prevCart?.map((item: any) =>
        item?.id === productId
          ? { ...item, quantity: item?.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId: any) => {
    setCart((prevCart: any) =>
      prevCart.map((item: any) =>
        item?.id === productId && item?.quantity > 1
          ? { ...item, quantity: item?.quantity - 1 }
          : item
      )
    );
  };

  const deleteItem = (productId: string) => {
    setCart((prevCart) => prevCart?.filter((item) => item?.id !== productId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item?.price * item?.quantity,
      0
    );
  };

  const onChange = (value: string) => {
    if (value === "ALL") {
      setFilteredData(data);
    }
    const filteredData = data?.filter((item: any) => {
      return item?.category === value;
    });

    setFilteredData(filteredData);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
    setShowInvoiceContent(true);
  };

  const onClose = () => {
    setOpen(false);
    setShowInvoiceContent(false);
  };

  const componentRef = useRef();

  const handlepdf = useReactToPrint({
    content: () => componentRef?.current,
  } as any);

  const FetchData = (e: any) => {
    setSelectedData(e);
  };

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <Layout>
      <div className="bg-[#DFDFDF] min-screen-height py-5">
        <div className="container mx-auto">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3">
            <div className="bg-[white] p-3 rounded min-screen-height job-card-wrapper sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-2 2xl:col-span-2">
              <div className="block sm:block md:flex lg:flex xl:flex 2xl:flex justify-between">
                <div className="mb-2 sm:mb-2 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0">
                  <Select
                    className="w-full sm:w-full md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px]"
                    showSearch
                    placeholder="Category"
                    optionFilterProp="children"
                    onChange={onChange}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                      {
                        value: "ALL",
                        label: "All Category",
                      },
                      {
                        value: "HP",
                        label: "HP",
                      },
                      {
                        value: "ASUS",
                        label: "ASUS",
                      },
                    ]}
                  />
                </div>
                <div>
                  <Form layout="inline">
                    <Form.Item className="w-[100%]">
                      <Input
                        placeholder="Search"
                        value={searchValue}
                        onChange={handleSearchChange}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>

              <div className="border p-3 mt-2 rounded">
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 2xl:grid-cols-5">
                  {getFilteredData?.length > 0
                    ? getFilteredData
                        ?.filter((el: any) =>
                          el.title
                            ?.toLowerCase()
                            ?.includes(searchValue?.toLowerCase())
                        )
                        .map((el: any, ind: any) => {
                          if (
                            searchValue &&
                            el?.title &&
                            !el?.title
                              ?.toLowerCase()
                              ?.includes(searchValue.toLowerCase())
                          ) {
                            return null;
                          }
                          return (
                            <div
                              key={ind}
                              className="border p-3 rounded text-center"
                            >
                              <div className="flex justify-center">
                                <div className="w-[150px] h-[100px]">
                                  <img src={el?.imgSrc} alt="product" />
                                </div>
                              </div>

                              <h4 className="text-base leading-5 mt-2">
                                {el?.title}
                              </h4>
                              <h5 className="text-base  mt-2">
                                {" "}
                                ${el?.price}{" "}
                              </h5>
                              <button
                                className="bg-[#E8F2FC] px-2 py-1 text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white]  mt-2"
                                onClick={() => addToCart(el)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          );
                        })
                    : data
                        ?.filter((el: any) =>
                          el?.title
                            ?.toLowerCase()
                            ?.includes(searchValue?.toLowerCase())
                        )
                        .map((el: any, ind: any) => {
                          if (
                            searchValue &&
                            el?.title &&
                            !el?.title
                              ?.toLowerCase()
                              ?.includes(searchValue.toLowerCase())
                          ) {
                            return null;
                          }
                          return (
                            <div
                              key={ind}
                              className="border p-3 rounded text-center"
                            >
                              <div className="flex justify-center">
                                <div className="w-[150px] h-[100px] ">
                                  <img src={el?.imgSrc} alt="product" />
                                </div>
                              </div>

                              <h4 className="text-base leading-5 mt-2 line-clamp-1">
                                {el?.title}
                              </h4>
                              <h5 className="text-base  mt-2">
                                {" "}
                                ${el?.price}{" "}
                              </h5>
                              <button
                                className="bg-[#E8F2FC] px-2 py-1 text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white]  mt-2"
                                onClick={() => addToCart(el)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          );
                        })}
                </div>
              </div>
            </div>

            <div className="bg-[white] rounded  min-screen-height sm:col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-1">
              <div className="h-[473px] overflow-scroll overflow-x-hidden">
                <AddCustomer fetch={FetchData} />
                <ul className="p-3">
                  {cart?.length > 0 ? (
                    cart?.map((item, index) => (
                      <li className="mb-2" key={index}>
                        <div className="border p-3 flex justify-between rounded">
                          <div>
                            <h6 className="text-base"> {item?.title}</h6>
                            <h6 className="text-base"> ${item?.price}</h6>
                            <DeleteOutlined
                              style={{ color: "red" }}
                              onClick={() => deleteItem(item?.id)}
                            />
                          </div>
                          <div>
                            <button
                              className="border hover:bg-[#FCCA19]  text-white font-bold py-1 px-2 rounded"
                              onClick={() => decrement(item?.id)}
                            >
                              <MinusOutlined
                                style={{ fontSize: "15px", color: "black" }}
                              />
                            </button>
                            <InputNumber
                              className="mx-2"
                              readOnly
                              min={1}
                              max={10}
                              value={item?.quantity}
                              style={{ maxWidth: "40px" }}
                            />
                            <button
                              className="border hover:bg-[#FCCA19] text-white font-bold py-1 px-2 rounded"
                              onClick={() => increment(item?.id)}
                            >
                              <PlusOutlined
                                style={{ color: "black", fontSize: "15px" }}
                              />
                            </button>
                            <h6 className="text-base mt-2">
                              Total: ${item?.price} * {item?.quantity} = $
                              {item?.price * item?.quantity}
                            </h6>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <div className="flex items-center bg-[#F3F3F3] p-5">
                      <div>
                        <ShoppingCartOutlined
                          style={{ fontSize: "90px", color: "#898989" }}
                        />
                      </div>

                      <div className="ml-2">
                        <h2 className="text-xl font-bold text-[#898989]">
                          {" "}
                          Your Cart Awaits.
                        </h2>
                        <h4 className="text-base text-[#898989]">
                          Please select a product from the list to add to your
                          cart.
                        </h4>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
              <div className="p-3">
                <div className="flex justify-between bg-[black]  text-white font-bold py-2 px-4 rounded w-full mb-2">
                  <div>Total</div>
                  <div>${calculateTotalPrice()}</div>
                </div>

                <button
                  disabled={cart.length ? false : true}
                  onClick={showDrawer}
                  className={
                    cart.length
                      ? "bg-[#FCCA19]  text-black font-bold py-2 px-4 rounded w-full"
                      : "bg-[#ffff99]  text-black font-bold py-2 px-4 rounded w-full"
                  }
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          title="Order Payment"
          placement="right"
          onClose={onClose}
          open={open}
        >
          <div>
            <h4 className="text-lg font-bold text-[#898989]">Order Amount</h4>
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">${calculateTotalPrice()}</h2>
              <h5 className="text-base font-bold text-[#898989]">
                {cart.length} Products
              </h5>
            </div>

            <h5 className="mt-3">Payment system : Cash</h5>

            <button
              className="bg-[#FCCA19]  text-black font-bold py-2 px-4 rounded w-full mt-5"
              onClick={handlepdf}
            >
              Confirm
            </button>
          </div>
        </Drawer>
      </div>

      <div
        className={showInvoiceContent ? "block mt-10" : "hidden"}
        ref={componentRef as any}
      >
        <Invoice
          getSelectedData={getSelectedData}
          cart={cart}
          calculateTotalPrice={calculateTotalPrice}
        />
      </div>
    </Layout>
  );
};

export default POSAPP;
