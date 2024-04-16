import { Modal } from "antd";
import { useState } from "react";
import { AppstoreOutlined } from "@ant-design/icons";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAdminCategoryHandler } from "../../api/category";
import MyButton from "../styled-componets/button";
const Add = ({ fetch }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <>
      <div className="flex justify-between">
        <div className="flex items-center">
          <AppstoreOutlined style={{ fontSize: "20px", color: "#28A0F7" }} />
          <div className="ml-2">
            <h3 className="text-lg font-bold text-[#28A0F7]">Category</h3>
          </div>
        </div>
        <div>
       
          <MyButton onClick={showModal} children={"Add Category"}  />

         
        </div>
      </div>
      <hr className="mt-2 h-[0.5px]" />

      <Modal
        title="Add new category"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        footer={false}
        destroyOnClose={true}
      >
        <div className="form-area mt-3">
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
      </Modal>
    </>
  );
};

export default Add;
