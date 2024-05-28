import { useEffect, useMemo, useState } from "react";
import { Dialog, Disclosure, Popover } from "@headlessui/react";
import {
  AlignRightOutlined,
  ArrowRightOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../assets/images/logo-dhaka-shop.png";

const buttonWidth = 70;
const gap = 8;
const btnProps = {
  style: {
    width: buttonWidth,
  },
};
const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#" },
  { name: "Contact sales", href: "#" },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [arrow, setArrow] = useState("Show");
  const [userData, setUserData] = useState("");
  const options = ["Show", "Hide", "Center"];

  useEffect(() => {
    const userLogedinData: any = localStorage.getItem("userLogedinData");
    const fetchLogedinData = JSON.parse(userLogedinData);
    setUserData(fetchLogedinData);
    console.log("userLogedinData", userLogedinData);
  }, []);
  const mergedArrow = useMemo(() => {
    if (arrow === "Hide") {
      return false;
    }
    if (arrow === "Show") {
      return true;
    }
    return {
      pointAtCenter: true,
    };
  }, [arrow]);

  console.log("userData", userData);

  return (
    <div className="navbar-area bg-white shadow sticky z-20 top-0">
      <div className="container mx-auto">
        <div className="grid grid-cols-1">
          <div>
            <header>
              <nav
                className="mx-auto flex items-center py-2 justify-between"
                aria-label="Global"
              >
                <div className="flex items-center">
                  
                  <div className="ml-3 ">
                    <Image height={80}  src={logo} alt="Logo" />
                  </div>
                </div>
                <div className="flex lg:hidden">
                  <button
                    type="button"
                    className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open main menu</span>
                    <AlignRightOutlined
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                  <Link
                    href="/"
                    className="text-lg font-bold primary-color leading-6 hover:text-[#147700]"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about-us"
                    className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                  >
                    About us
                  </Link>

                  <Link
                    href="/contact"
                    className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/notices"
                    {...btnProps}
                    className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                  >
                    Categories
                  </Link>
                  <Link
                    href="/notices"
                    {...btnProps}
                    className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                  >
                    Offers
                  </Link>
                  {userData ? (
                    <Link
                      className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                      href="/student-profile"
                    >
                      profile
                    </Link>
                  ) : (
                    <Link
                      className="text-lg primary-color font-bold leading-6  hover:text-[#147700]"
                      href="/user-auth"
                    >
                      Log in
                    </Link>
                  )}
                </Popover.Group>
              </nav>
              <Dialog
                as="div"
                className="lg:hidden"
                open={mobileMenuOpen}
                onClose={setMobileMenuOpen}
              >
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                    <Link href="/">
                      <AppstoreOutlined
                        style={{ fontSize: "55px", color: "#06BBCC" }}
                      />
                    </Link>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <AlignRightOutlined
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <Disclosure as="div" className="-mx-3">
                          {({ open }) => (
                            <>
                              <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                Product
                                <ArrowRightOutlined
                                  className={classNames(
                                    open ? "rotate-180" : "",
                                    "h-5 w-5 flex-none"
                                  )}
                                  aria-hidden="true"
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="mt-2 space-y-2">
                                {[...products, ...callsToAction].map((item) => (
                                  <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                  >
                                    {item.name}
                                  </Disclosure.Button>
                                ))}
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                        <Link
                          href="#"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          About us
                        </Link>
                        <Link
                          href="#"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Contact us
                        </Link>
                        <Link
                          href="#"
                          className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        >
                          Notices
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Dialog>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}
