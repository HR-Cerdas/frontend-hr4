import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/alert";

function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirst] = useState("");
  const [lastName, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConf] = useState("");
  const [namaPerusahaan, setPerusahaan] = useState("")
  const [showAlert, handleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");


  const navigate = useNavigate();

  const handleSubmit = async () => {
    // console.log({firstName, lastName, username,email,password,confirmPassword,phone})
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/hr/register`, {
        first_name: firstName,
        last_name: lastName,
        username: username,
        email: email,
        password: password,
        confPassword: confirmPassword,
        noHp: phone,
        namaPerusahaan: namaPerusahaan,
      })
      .then(response => {
        if (response.status === 200) {
          // sessionStorage.setItem("data", JSON.stringify(res.data.data));
          navigate("/login");
        }
      })
      .catch(err => {
        if (err.response.status === 400) {
          console.log(err.response.data);
        } else {
          console.log(err.response.data);
        }
        handleAlert(true);
        setAlertMsg(err.response.data.message);
      });
  };
  return (
    <>
      <title>HR Cerdas | Register</title>
      <section className="bg-gray-50 dark:bg-gray-900 m-8">
        <div className="flex flex-col items-center justify-center px-12 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="mr-3 h-6 sm:h-9"
              src={`${process.env.PUBLIC_URL}/HRCerdas.png`}
              alt="HRCerdas Logo"
            />

          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              {showAlert && <Alert msg={alertMsg} />}
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create and account
              </h1>
              <form
                className="space-y-4 md:space-y-6 "
                action="#"
                onSubmit={e => {
                  handleSubmit();
                  e.preventDefault();
                }}>
                <div className="grid gap-3 mb-4 md:grid-cols-2 ">
                  <div>
                    <label
                      for="firstName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={firstName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your first name"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setFirst(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="lastName"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={lastName}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your last name"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setLast(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      value={username}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your Username"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setUsername(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="Company"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={namaPerusahaan}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your Username"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setPerusahaan(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter your work email address"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setEmail(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={password}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onFocus={() => handleAlert(false)}
                      onChange={e => setPassword(e.target.value)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="confpassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Password
                    </label>
                    <input
                      type="password"
                      name="confpassword"
                      id="confpassword"
                      value={confirmPassword}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e => setConf(e.target.value)}
                      onFocus={() => handleAlert(false)}
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      for="noHp"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      No Hp
                    </label>
                    <input
                      type="tel"
                      name="noHp"
                      id="noHp"
                      value={phone}
                      placeholder="Enter your mobile number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={e => setPhone(e.target.value)}
                      onFocus={() => handleAlert(false)}
                      required=""
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        for="terms"
                        className="font-light text-gray-500 dark:text-gray-300">
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#">
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Register;
