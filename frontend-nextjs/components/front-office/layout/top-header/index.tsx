import React from "react";
import {
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  GooglePlusOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
const TopHeader = () => {
  return (
    <>
      <div className="bg-[#147700] h-[30px]">
        <div className="container mx-auto">
          <div className="grid grid-cols-1">
              <div className="flex justify-between pt-[5px]">
                <div>
                  <FacebookOutlined
                    style={{
                      fontSize: "19px",
                      color: "white",
                      marginRight: "7px",
                    }}
                  />
                  <TwitterOutlined
                    style={{
                      fontSize: "19px",
                      color: "white",
                      marginRight: "7px",
                    }}
                  />
                  <LinkedinOutlined
                    style={{
                      fontSize: "19px",
                      color: "white",
                      marginRight: "7px",
                    }}
                  />
                  <GooglePlusOutlined
                    style={{
                      fontSize: "19px",
                      color: "white",
                      marginRight: "7px",
                    }}
                  />
                </div>
                <div className="text-white">
                  <PhoneOutlined
                    style={{
                      fontSize: "19px",
                      color: "white",
                      marginRight: "4px",
                    }}
                  />
                  +8801777975237
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopHeader;
