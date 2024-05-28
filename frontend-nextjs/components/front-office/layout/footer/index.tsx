"use client"
import Image from "next/image";
import Link from "next/link";

import selfTestLogo from "../../../../assets/images/logo-dhaka-shop.png";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const Footer = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <div className="footer-area white-bg">
        <div className="container mx-auto">
          <div className="grid gap-12 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 py-[50px]">
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="0"
              className="single-menu-content"
            >
              <div className="mb-8">
                <Link href="/">
                  <div className="w-[175px]">
                    <Image src={selfTestLogo} alt="self test" />
                  </div>
                </Link>
              </div>
              <div className="update">
                <h2 className="text-base font-bold mb-3">
                  To get regular updates
                </h2>
                <div className="relative overflow-hidden">
                  <input
                    placeholder="Enter your email"
                    className="primary-border-color w-full primary-border-radius p-3 mt-3"
                    type="text"
                  />
                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer">
                    <button className="primary-btn px-4 py-[5px] mt-3">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="300"
              className="single-menu-content"
            >
              <h2 className="text-lg font-bold mb-2">Usefull Links</h2>
              <ul>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">FAQ</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">About Us</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  {" "}
                  <Link href="#">Privacy policy</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">Blog</Link>
                </li>
              </ul>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="600"
              className="single-menu-content"
            >
              <h2 className="text-lg font-bold mb-2">Contact Us</h2>
              <ul>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">Events</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">Contact</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">Course</Link>
                </li>
                <li className="text-base font-[600] mb-2 text-black hover:text-[#3A58EE]">
                  <Link href="#">Model test</Link>
                </li>
              </ul>
            </div>
            <div
              data-aos="fade-up"
              data-aos-duration="1500"
              data-aos-delay="600"
              className="single-menu-content"
            >
              <div className="m-auto">
                <h2 className="text-lg font-bold mb-2">Pay with</h2>
              </div>
              <Image width={100} height={100} src={selfTestLogo} alt="pay" />
            </div>
          </div>
          <div className="grid grid-cols-1">
            <hr />
            <div className="text-center py-8">
              <h2 className="text-base font-bold">
                {" "}
                Copyright@2023 Teletalk,All right reserved
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
