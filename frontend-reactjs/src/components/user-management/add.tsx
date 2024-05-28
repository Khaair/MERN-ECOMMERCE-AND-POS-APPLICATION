import {  DatePicker, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { addUserHandler } from "../../api/users-list";
import { useSelector } from "react-redux";
import { CheckCircleOutlined } from "@ant-design/icons";
const AddUser = ({ fetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  // onsubmit handler
  const handleSubmit = async () => {
    const values = await form.validateFields();

    const fields = {
      name: values?.name,
      email: values?.email,
      phone: values?.phone,
      nid: values?.nid,
      dob: values?.dob,
    };

    try {
      setLoading(true);
      await addUserHandler(fields)
        .then((res) => res.json())
        .then((res) => {
          if (res?.status === "200") {
            setLoading(false);
            setError("");
            setIsModalOpen(false);
            fetch();
            form.setFieldsValue({
              name: "",
              email: "",
              phone: "",
              nid: "",
              dob: "",
            });
            openNotification();
          } else if (res?.statusCode === 400 && res?.status === "error") {
            setLoading(false);
            setError(res?.errors?.[0]?.msg?.en);
          } else if (res?.statusCode === 400) {
            setLoading(false);
            setError(res?.message?.en);
          } else if (res?.statusCode === 500) {
            setLoading(false);
            setError(res?.message);
          }
        });
    } catch (e) {
      console.error(e);
    }
  };

  const tokenData = useSelector((state) => state?.auth?.tokenData);

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "User created Successfully!",
      description: "Now you can find this user in user table.",
      icon: <CheckCircleOutlined style={{ color: "#108ee9" }} />,
    });
  };

  return (
    <>
      {contextHolder}
      <div className="flex justify-between">
        <div className="flex items-center">
          <AppstoreOutlined style={{ fontSize: "20px", color: "#28A0F7" }} />
          <div className="ml-2">
            <h3 className="text-lg font-bold text-[#28A0F7]">
              User management
            </h3>
          </div>
        </div>
        <div>
          {tokenData?.roles?.join("").toString() === "ROLE_ADMIN" ||
          tokenData?.roles?.join("").toString() === "ROLE_MODERATOR" ? (
            <button
              onClick={showModal}
              className="bg-[#E8F2FC] px-4 py-2 font-bold text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white] "
            >
              Add User
            </button>
          ) : null}
        </div>
      </div>
      <hr className="mt-2 h-[0.5px]" />

      <Modal
        title="Add New User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={900}
        footer={false}
        destroyOnClose={true}
      >
        <div className="form-area mt-3">
          <div className="container">
            <div className="grid grid-cols-1">
              <div className="form-wrapper-area">
                <Form className="form-input-item" form={form} layout="vertical">
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: "Name is required",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Email is required" }]}
                  >
                    <Input type="email" placeholder="Enter your email" />
                  </Form.Item>

                  <Form.Item
                    name="phone"
                    label="Phone number"
                    rules={[
                      {
                        required: true,
                        message: "Phone number is required!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your phone number" />
                  </Form.Item>

                  <Form.Item
                    name="nid"
                    label="NID"
                    rules={[
                      {
                        required: true,
                        message: "NID is required!",
                      },
                    ]}
                  >
                    <Input placeholder="Enter your NID" />
                  </Form.Item>
                  <Form.Item
                    name="dob"
                    label="Date of birth"
                    rules={[
                      {
                        required: true,
                        message: "Date of birth is required",
                      },
                    ]}
                  >
                    <DatePicker className="other-type-input" />
                  </Form.Item>

                  <p className="text-[red mb-2]">{getError}</p>

                  <Form.Item>
                    <button  className="bg-[#E8F2FC] px-4 py-2 font-bold text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white] "  onClick={handleSubmit}>
                      Submit
                    </button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddUser;
