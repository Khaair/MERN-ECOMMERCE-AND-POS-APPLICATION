"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";

import React, { useState } from "react";
import Layout from "../admin-layout";
import ReactSelect from "react-select";
import { reactSelectStyles } from "@/lib/react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import SubmitBtn from "@/components/common/button";
import { toast } from "react-toastify";
import { fetchAdminBlogListHandler } from "@/services/todo/todo";
import {
  CategorySchema,
  courseResourceWithSourceVideoSchema,
} from "@/validation-schema/resource-sechema";
import InputField from "@/components/common/input";

const DashboardContainer = () => {
  const [shorted, setShorted] = useState<any>(undefined);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [getError, setError] = useState<string>("");

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const submitForm = async (value: any, { resetForm }: any) => {
    console.log("data here", value);
    try {
      setLoading(true);
      await fetchAdminBlogListHandler()
        .then((res) => res.json())
        .then((res) => {
          if (res?.statusCode === 200) {
            setLoading(false);
            setError("");
            toast?.success(res?.message);
            resetForm();
          } else if (res?.statusCode === 400 && res?.status === "error") {
            setLoading(false);
            setError(res?.message);
            toast?.warn(res?.message);
          } else if (res?.statusCode === 400) {
            setLoading(false);
            setError(res?.message);
            toast?.warn(res?.message);
          } else if (res?.statusCode === 500) {
            setLoading(false);
            setError(res?.message);
            toast?.warn(res?.message);
          }
        });
    } catch (e: any) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="primary-box-shadow bg-[white] min-screen-height ">
        <div className="admin-header-wrapper flex justify-between py-5 px-8">
          <div className="filter-option w-[200px]">
            <ReactSelect
              placeholder={"Filter"}
              options={[
                {
                  label: "YES",
                  value: "YES",
                },
                {
                  label: "NO",
                  value: "NO",
                },
              ]}
              onChange={(data: any) => {
                setShorted(data?.value);
              }}
              components={{
                IndicatorSeparator: () => null,
              }}
              styles={reactSelectStyles}
            />
          </div>
          <div>
            <button onClick={onOpenModal} className="primary-btn">
              Add New
            </button>
          </div>
        </div>
        <hr />
      </div>
      <Modal focusTrapped={false} open={open} onClose={onCloseModal} center>
        <div className="w-[500px]">
          <Formik
            initialValues={{
              name: "",
              url: "",
            }}
            onSubmit={submitForm}
            validationSchema={CategorySchema}
          >
            {({ values }) => (
              <Form>
                <div className="grid grid-cols-1 ">
                  <div className="single-field">
                    <InputField
                      htmlFor={"name"}
                      placeholder={"Category name"}
                      label={"Category name"}
                      id={"name"}
                      name={"name"}
                      required={true}
                    />
                  </div>

                  <div className="single-field">
                    <InputField
                      htmlFor={"url"}
                      placeholder={"Image url"}
                      label={"Image url"}
                      id={"url"}
                      name={"url"}
                      required={true}
                    />
                  </div>

                  <SubmitBtn
                    btnColor={"primary-btn"}
                    value="SAVE"
                    loading={loading}
                    textAlign={"text-right"}
                    fluid={false}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </Layout>
  );
};

export default DashboardContainer;
