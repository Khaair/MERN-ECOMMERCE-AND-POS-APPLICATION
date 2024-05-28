import { Form, Input, Modal, Select } from "antd";
import { useEffect, useState } from "react";

const AddCustomer = ({ fetch }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customerData, setCustomerData] = useState([]);
  const [getSelectedId, setSelectedId] = useState("");

  const [form] = Form.useForm();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    const name = values?.name;
    const phone = values?.phone;
    const address = values?.address;
    const randomNumber = Math.floor(Math.random() * (1000 - 1) + 1);
    const timestamp = Date.now();
    const id = `${randomNumber}${timestamp}`;
    setCustomerData([...customerData, { name, phone, address, id }] as any);
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const onChange = (value: string) => {
    setSelectedId(value);
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const getCustomerData = customerData?.map((item: any) => {
    return {
      value: item?.id,
      label: item?.name,
    };
  });

  useEffect(() => {
    const singleData = customerData?.find((item: any) => {
      if (item?.id === getSelectedId) {
        return {
          ...item,
        };
      }
    });

    fetch(singleData);
  }, [customerData, getSelectedId]);

  return (
    <div>
      <div className="block sm:block md:flex lg:flex xl:flex 2xl:flex p-3">
        <div className="mr-0 sm:mr-0 md:mr-3 lg:mr-3 xl:mr-3 2xl:mr-3 mb-2">
          <Select
            className="w-full sm:w-full md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px]"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={getCustomerData}
          />
        </div>
        <button
          onClick={showModal}
          className="bg-[#E8F2FC] w-full px-2 py-2 font-bold text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white] "
        >
          + New Customer
        </button>
      </div>

      <Modal
        title="Add New Customer"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={600}
        footer={false}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name!",
              },
            ]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input the phone number!",
              },
            ]}
          >
            <Input placeholder="Enter your user phone number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input the address!",
              },
            ]}
          >
            <Input placeholder="Enter your address" />
          </Form.Item>

          <Form.Item>
            <button
              onClick={handleSubmit}
              className="bg-[#6941C6] hover:bg-[#7f5fc7] text-white font-bold py-2 px-4 rounded-lg mt-1"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddCustomer;
