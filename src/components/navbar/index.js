import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Detailmenu from "./detailmenu";
import Notification from "./notification";
const Navbar = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(false);
  return (
    <>
      <header>
        <nav className="bg-white relativ md:ml-64  border-gray-200 px-2 sm:px-4 py-2.5 shadow-sm rounded dark:bg-gray-900">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <img
              onClick={() => { navigate("/") }}
              src={`${process.env.PUBLIC_URL}/HRCerdas.png`}
              className="mr-3 h-6 sm:h-9"
              alt="HRCerdas Logo"
            />
            <div className="flex items-center lg:order-2">
              {!sessionStorage.getItem("data") ? (
                <div className="flex justify-center">
                  <div className="mx-2">
                    <button
                      onClick={() => { navigate("/login") }}
                      type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                  </div>
                  <div className="mx-2">
                    <button
                      onClick={() => { navigate("/register") }}
                      type="button" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Register</button>
                  </div>
                  {/* <div>
                    <a type="button" href="/register" className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Register</a>
                  </div> */}
                  <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                  </button>
                </div>
              ) :
                <div className="flex md:order-2">
                  {/* button notification */}
                  <button
                    onClick={() => setNotification(true)}
                    id="dropdownNotificationButton" data-dropdown-toggle="dropdownNotification" className="inline-flex mx-4 items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400" type="button">
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path></svg>
                    <div className="flex relative">
                      <div className="inline-flex relative -top-2 right-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>
                  </button>
                  {
                    notification ? (
                      <Notification notification={notification} onClose={() => setNotification(false)} />
                    ) : null
                  }


                  {/* button avatar */}
                  <button onClick={() => setOpen(true)}>
                    <img
                      className="w-10 h-10 rounded-full"
                      src="https://cdna.artstation.com/p/assets/images/images/045/610/778/large/seonghwan-jang-jy-flcl38-02.jpg?1643130229"
                      alt="Rounded avatar"
                    />
                  </button>
                  {
                    open ? (
                      <Detailmenu open={open} onClose={() => setOpen(false)} />
                    ) : null
                  }
                </div>
              }
            </div>
            {/* <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Job Vacancy
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Company
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
