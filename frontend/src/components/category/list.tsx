import {
  Form,
  Modal,
 
  notification,
  Popconfirm,
  message,
} from "antd";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../../utils/api-url";
import { CheckCircleOutlined } from "@ant-design/icons";
import _ from "lodash";
import { ErrorMessage, Field, Formik } from "formik";
import { addAdminCategoryHandler } from "../../api/category";
import * as Yup from "yup";

const List = ({ data }: any) => {
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
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      description: Yup.string(),
    });
  

  // Initial form values
  const initialValues = {
    name: "",
    description: "",
  };

  // Submit function
  const onSubmit = async (values: any, { resetForm }: any) => {
    const categoryObj = {
      name: values?.name,
      description: values?.description,
    };
    try {
      setLoading(true);
      await addAdminCategoryHandler(categoryObj)
        .then((res) => res.json())
        .then((res) => {
          if (res?.status === 201) {
            setLoading(false);
            setError("");
            setIsModalOpen(false);
            fetch();
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
    } catch (e: any) {
      console.error(e);
    }
    resetForm(); // Reset the form after submission (optional)
  };
  const deleteUser = async (id: any) => {
    try {
      const mydata = await axios.delete(`${baseUrl}/delete-user/${id}`);
      console.log(mydata);
    } catch (er) {
      console.log(er);
    }
  };

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
    message.success("User deleted Successfully!");
    deleteUser(getDelId);
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const users  = [
    { 'user': 'barney',  'age': 36, 'active': true },
    { 'user': 'fred',    'age': 40, 'active': false },
    { 'user': 'pebbles', 'age': 1,  'active': true }
  ];

  const result = _.find(users,  { 'age': 1, 'active': true });

  console.log("result", result)

  return (
    <>
      {contextHolder}
      <div className="list-area">
        <div className="grid grid-cols-1">
          <div style={{ overflowX: "auto" }} className="table-area mt-5">
            <table id="customers">
              <thead>
                <tr>
                  <th>SL</th>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  _.map(data, (item: any, index: any) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.name}</td>
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
                              <button className="bg-[#E8F2FC] px-4 py-2 font-bold text-base text-[red] rounded hover:bg-[red] hover:text-[white]">
                                Delete
                              </button>
                            </Popconfirm>
                          </div>
                        </td>
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
              {true && (
                  <div className="grid grid-cols-1">
                    <div className="form-wrapper-area">
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        <Form>
                          <div className="mb-4">
                            <label
                              htmlFor="name"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Name:
                            </label>
                            <Field
                              type="text"
                              id="name"
                              name="name"
                              className="w-full px-3 py-2 border rounded-md"
                              placeholder="Enter your name"
                            />
                            <ErrorMessage
                              name="name"
                              component="div"
                              className="text-[red] text-base mt-1"
                            />
                          </div>

                          <div className="mb-4">
                            <label
                              htmlFor="description"
                              className="block text-gray-700 text-sm font-bold mb-2"
                            >
                              Description:
                            </label>
                            <Field
                              as="textarea"
                              id="description"
                              name="description"
                              className="w-full px-3 py-2 border rounded-md"
                              placeholder="Enter a description (optional)"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </div>

                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                          >
                            Submit
                          </button>
                        </Form>
                      </Formik>
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

export default List;
