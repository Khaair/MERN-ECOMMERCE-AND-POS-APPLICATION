import {
  Button,
  Form,
  Input,
  Modal,
  DatePicker,
  Space,
  notification,
  Popconfirm,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { updateUserHandler } from "../../api/users-list";
import { useSelector } from "react-redux";
import moment from "moment";
import { baseUrl } from "../../utils/api-url";
import dayjs from "dayjs";
import { CheckCircleOutlined } from "@ant-design/icons";

const UserList = ({ data, fetchdata, fetchSetData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [singleID, setSingleId] = useState("");
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [getError, setError] = useState("");
  const [getSingleData, setSingleData] = useState(undefined);
  const [getDob, setDob] = useState("");
  const [getDelId, setDelId] = useState("");


  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  
  };

  const showModal = (idd: any) => {
   
    setIsModalOpen(true);
    setSingleId(idd);
    fetchSingleData(idd);
  };

  const fetchSingleData = async (id: any) => {
    try {
      const singleData: any = await axios.get(
        `${baseUrl}/show-single-user/${id}`
      );
      form.setFieldsValue({
        name: singleData?.data?.name,
        email: singleData?.data?.email,
        phone: singleData?.data?.phone,
        nid: singleData?.data?.nid,
      });

      setSingleData(singleData);
    } catch (err) {
      console.log(err);
    }
  };

  const onFinish = async (value) => {
    console.log("value test", value);
    const fields = {
      id: singleID,
      name: value?.name,
      email: value?.email,
      phone: value?.phone,
      nid: value?.nid,
      dob: getDob ? getDob : value?.dob,
    };
    console.log("formmm", fields);

    try {
      setLoading(true);
      await updateUserHandler(fields)
        .then((res) => res.json())
        .then((res) => {
          if (res?.info === "updated") {
            setLoading(false);
            setError("");
            setIsModalOpen(false);
            fetchSetData();
            form.setFieldsValue({
              name: "",
              email: "",
              phone: "",
              nid: "",
              dob: "",
            });
            openNotification(res?.message);
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

  const deleteUser = async (id: any) => {
    try {
      const mydata = await axios.delete(`${baseUrl}/delete-user/${id}`);
      console.log(mydata);

      fetchSetData();
    } catch (er) {
      console.log(er);
    }
  };

  const tokenData = useSelector((state) => state?.auth?.tokenData);
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: "User updated Successfully!",
      description: "Now you can find this updated user in user table.",
      icon: <CheckCircleOutlined style={{ color: "#108ee9" }} />,
    });
  };

  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success('User deleted Successfully!');
    deleteUser(getDelId)
  };
  
  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  return (
    <>
      {contextHolder}
      <div className="list-area">
        <div className="grid grid-cols-1">
        <div style={{ overflowX: 'auto' }} className="table-area mt-5">
          <table id="customers">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>NID</th>
                <th>Date of birth</th>
                {tokenData?.roles?.join("").toString() === "ROLE_ADMIN" ||
                tokenData?.roles?.join("").toString() === "ROLE_MODERATOR" ? (
                  <th>Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data?.map((item: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item?.name}</td>
                      <td>{item?.email}</td>
                      <td>{item?.phone}</td>
                      <td>{item?.nid}</td>
                      <td>{moment(item?.dob).format("YYYY-MM-DD")} </td>
                      {tokenData?.roles?.join("").toString() === "ROLE_ADMIN" ||
                      tokenData?.roles?.join("").toString() ===
                        "ROLE_MODERATOR" ? (
                        <td>
                          <div className="d-flex">
                            <button
                              className="bg-[#E8F2FC] px-8 py-2 font-bold text-base text-[#28A0F7] rounded mr-2 hover:bg-[#0b5394] hover:text-[white] "
                              onClick={() => showModal(item?._id)}
                            >
                              Edit
                            </button>

                            <Popconfirm
                             className="ant-btn-default"
                             title="Delete the user!"
                              description="Are you sure to delete this user?"
                              onConfirm={confirm}
                              onCancel={cancel}
                              onClick={() => setDelId(item?._id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button  className="bg-[#E8F2FC] px-4 py-2 font-bold text-base text-[red] rounded hover:bg-[red] hover:text-[white]">Delete</button>
                            </Popconfirm>

                           
                          </div>
                        </td>
                      ) : null}
                    </tr>
                  );
                })
              ) : (
                <h4 className="text-[red] text-lg  p-3">Not Found</h4>
              )}
            </tbody>
          </table>
        </div>

        </div>
        

        <Modal
          title="Update User"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={900}
          footer={false}
        >
          <>
            <div className="form-area mt-3">
              {getSingleData && (
                <div className="container">
                  <div className="grid grid-cols-1">
                    <div className="form-wrapper-area">
                      <Form
                      form={form}
                        onFinish={onFinish}
                        className="form-input-item"
                        layout="vertical"
                      >
                        <Form.Item
                          name="name"
                          initialValue={getSingleData?.data?.name}
                          label="Name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                            },
                          ]}
                        >
                          <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                          name="email"
                          initialValue={getSingleData?.data?.email}
                          label="Email"
                          rules={[
                            { required: true, message: "Email is required" },
                          ]}
                        >
                          <Input type="email" placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                          name="phone"
                          initialValue={getSingleData?.data?.phone}
                          label="Phone number"
                          rules={[
                            {
                              required: true,
                              message: "Please input your phone number!",
                            },
                          ]}
                        >
                          <Input placeholder="Phone number" />
                        </Form.Item>
                        <Form.Item
                          name="nid"
                          initialValue={getSingleData?.data?.nid}
                          label="NID"
                          rules={[
                            {
                              required: true,
                              message: "Please input your nid!",
                            },
                          ]}
                        >
                          <Input placeholder="NID" />
                        </Form.Item>
                        <Form.Item
                          initialValue={dayjs(
                            String(getSingleData?.data?.dob),
                            "YYYY-MM-DD"
                          )}
                          label="Date Of Birth"
                          name="dob"
                        >
                          <Space>
                            <DatePicker
                              format={"YYYY-MM-DD"}
                              style={{ width: "100% !important" }}
                              className="w-100"
                              placeholder="Enter your date of birth"
                              defaultValue={dayjs(
                                String(getSingleData?.data?.dob),
                                "YYYY-MM-DD"
                              )}
                              onChange={(value) => {
                                console.log("testtt", value);
                                setDob(value);
                              }}
                            />
                          </Space>
                        </Form.Item>
                        <p className="text-[red]">{getError}</p>
                        <Form.Item>
                          <button className="bg-[#E8F2FC] px-4 py-2 font-bold text-base text-[#28A0F7] rounded hover:bg-[#0b5394] hover:text-[white] "  htmlType="submit">
                            Submit
                          </button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        </Modal>
      </div>
    </>
  );
};

export default UserList;
