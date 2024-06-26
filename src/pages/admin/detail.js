import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../../components/Cards/User/CardDetailUser";
import PhotoProfileUser from "../../components/Cards/User/CardPhotosProfile";
// import CardDetailUser from "../../components/Cards/User/CardDetailUser";

export default function DetailUser() {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState({
        name: { first_name: "", last_name: "" },
        DetailProfil: {},
        sosialMedia: {},
    })

    const [skill, setSkill] = useState([]);
    const [workExperience, setWorkExperience] = useState([]);
    const [addorganization, setOrganization] = useState([]);
    const [addEducation, setAddEducation] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        if (!sessionStorage.getItem("data")) {
            navigate("/login");
        } else {
            const item = sessionStorage.getItem("data"); {
                if (item) {
                    setToken(JSON.parse(item));
                }
            }
        }
    }, []);

    // session timeout
    const timeout = () => {
        console.log("waktu jalan")
        setTimeout(() => {
            handleLogout()
            console.log("waktu end")
        }, token.expired)
    }

    // logout function
    const handleLogout = () => {
        sessionStorage.removeItem("data");
        navigate("/login");
    };

    useEffect(() => {
        if (token !== null) {
            getProfile(token);
            timeout()
        }
    }, [token]);

    const getProfile = async (token) => {
        await axios
            .get(`${process.env.REACT_APP_BASE_URL}/pelamar/getdetailpelamar/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token.data}`,
                },
            })
            .then((res) => {
                setProfile(res.data.data);
                setSkill(res.data.data.skills);
                setWorkExperience(res.data.data.workExperience);
                setOrganization(res.data.data.addorganization);
                setAddEducation(res.data.data.addEducation);
                // console.log(res.data.data.skills)
                // console.log(res.data.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }
    return (
        <>
            {/* Breadcrumb */}
            {/* <div className="relative flex flex-col min-w-0 break-words mb-3 mt-2 w-full px-4 m-10 overflow-x-auto container"> */}
            <nav className="flex px-5 py-3 text-gray-700 border mx-14 border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 mt-6" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3">
                    <li className="inline-flex items-center">
                        <a href="/admin" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                            Home
                        </a>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Detail Account</span>
                        </div>
                    </li>
                    {/* <li>
                            <div className="flex items-center">
                                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                <a href="#" className="ml-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ml-2 dark:text-gray-400 dark:hover:text-white">Profile Detail</a>
                            </div>
                        </li> */}
                </ol>
            </nav>
            {/* </div> */}
            <div className="flex flex-wrap mx-10">
                <div className="w-full px-4  xl:w-3/12">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Account Profile</h6>
                            </div>
                        </div>
                        {profile.img !== undefined ? (
                            <img className="w-40 h-40 rounded-full self-center" src={profile.img} />
                        ) : (
                            <img className="w-40 h-40 rounded-full self-center" src={`${process.env.PUBLIC_URL}/Logo Biru.png`} alt="Rounded avatar" />
                        )}
                        <h4 className="text-center font-bold mt-4">{profile.name.first_name} {profile.name.last_name}
                            {profile.DetailProfil !== undefined ? (
                                <div> {
                                    profile.DetailProfil.gender !== "laki - laki" ? (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">She/Her</span>
                                    ) : (
                                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">He/Him</span>
                                    )
                                }
                                </div>
                            ) : (
                                <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">undefined</span>
                            )}

                        </h4>
                        {profile.DetailProfil !== undefined ? (
                            <div>
                                <p className="text-center font-semibold text-sm text-gray-400">{profile.DetailProfil.location},{profile.DetailProfil.nationality}</p>
                                <p className="text-center font-semibold text-sm text-gray-400">{profile.DetailProfil.residentialStatus}</p>
                                <p className="text-center font-semibold text-sm text-gray-800 m-2">{profile.aboutme}</p>
                            </div>

                        ) : (
                            <div>
                                <p className="text-center font-semibold text-sm text-gray-400">Tidak Dicantumkan</p>
                                <p className="text-center font-semibold text-sm text-gray-400">Tidak Dicantumkan</p>
                                <p className="text-center font-semibold text-sm text-gray-800">Tidak Dicantumkan</p>
                            </div>

                        )}

                        <a href="/admin/profile/edit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none sm:w-auto m-6 focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Accept</a>
                        <a href="/admin/profile/edit" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none sm:w-auto m-6 focus:ring-red-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Denied</a>
                    </div>
                </div>
                <div className="w-full px-4 xl:w-9/12">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Detail Profile Account</h6>
                            </div>
                        </div>

                        <form>
                            <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                <div>
                                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">First name</label>
                                    <input type="text" id="first_name" defaultValue={profile.name.first_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" disabled />
                                </div>
                                <div>
                                    <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last name</label>
                                    <input type="text" id="last_name" defaultValue={profile.name.last_name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" disabled />
                                </div>
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email address</label>
                                    <input type="email" id="email" defaultValue={profile.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" disabled />
                                </div>
                                <div>
                                    <label for="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                                    <input type="tel" id="phone" defaultValue={profile.noHp} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0852-3365-2544" pattern="[0-9]{4}-[0-9]{4}-[0-9]{4}" disabled />
                                </div>
                            </div>
                            {profile.DetailProfil !== undefined ? (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    <div>
                                        <label for="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birth of Date</label>
                                        <input type="text" id="birth" defaultValue={profile.DetailProfil.tanggalLahir} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" disabled />
                                    </div>
                                    <div>
                                        <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                        <input type="text" id="twitter" defaultValue={profile.DetailProfil.gender} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="man" disabled />
                                    </div>
                                    <div>
                                        <label for="residential" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Residential Status</label>
                                        <input type="text" id="residential" defaultValue={profile.DetailProfil.residentialStatus} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahasiswa" disabled />

                                    </div>
                                    <div>
                                        <label for="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nationality</label>
                                        <input type="text" id="nationality" defaultValue={profile.DetailProfil.nationality} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Indonesia" disabled />

                                    </div>
                                </div>
                            ) : (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    <div>
                                        <label for="birth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Birth of Date</label>
                                        <input type="text" id="birth" defaultValue={'Belum Terisi'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="flowbite.com" disabled />
                                    </div>
                                    <div>
                                        <label for="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gender</label>
                                        <input type="text" id="twitter" defaultValue={'Belum Terisi'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="man" disabled />
                                    </div>
                                    <div>
                                        <label for="residential" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Residential Status</label>
                                        <input type="text" id="residential" defaultValue={'Belum Terisi'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Mahasiswa" disabled />

                                    </div>
                                    <div>
                                        <label for="nationality" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Nationality</label>
                                        <input type="text" id="nationality" defaultValue={'Belum Terisi'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Indonesia" disabled />

                                    </div>
                                </div>
                            )}
                            {profile.sosialMedia !== undefined ? (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    <div>
                                        <label for="twitter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Twitter Username</label>
                                        <input type="text" id="twitter" defaultValue={profile.sosialMedia.twitter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@HanifSatrio" disabled />

                                    </div>
                                    <div>
                                        <label for="linkedin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">linkedin Username</label>
                                        <input type="text" id="linkedin" defaultValue={profile.sosialMedia.linkedin} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hanif-Satrio" disabled />

                                    </div>

                                </div>
                            ) : (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    <div>
                                        <label for="twitter" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Twitter Username</label>
                                        <input type="text" id="twitter" defaultValue={"belum terisi"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="@HanifSatrio" disabled />

                                    </div>
                                    <div>
                                        <label for="linkedin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">linkedin Username</label>
                                        <input type="text" id="linkedin" defaultValue={"belum terisi"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Hanif-Satrio" disabled />

                                    </div>
                                </div>
                            )}
                            <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                {profile.DetailProfil !== undefined ? (
                                    <div>
                                        <label for="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                                        <textarea id="address" rows="4" cols="6" defaultValue={profile.DetailProfil.location} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Panorama street" disabled ></textarea>
                                    </div>
                                ) : (
                                    <div>
                                        <label for="adress" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Address</label>
                                        <textarea id="address" rows="4" cols="6" defaultValue={"belum terisi"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Panorama street" disabled ></textarea>
                                    </div>
                                )}
                                <div>
                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">About User</label>
                                    <textarea id="message" rows="4" cols="6" defaultValue={profile.aboutme} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="About" disabled></textarea>
                                </div>
                            </div>

                        </form>

                    </div>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Experience</h6>
                            </div>
                        </div>


                        <div className="">
                            {workExperience !== undefined ? (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    {
                                        workExperience.length > 0 ? (
                                            workExperience.map(val => (
                                                <div className="flex flex-wrap">
                                                    <div className=" xl:w-3/12 px-2">
                                                        <img className="w-40 h-35 rounded" src={`${process.env.PUBLIC_URL}/Logo Biru.png`} alt="Default avatar" />
                                                    </div>
                                                    <div className=" xl:w-9/12 px-2">
                                                        <p className="font-semibold text-xl">{val.company}</p>
                                                        <p className="font-medium">{val.jobPosition}</p>
                                                        <p className="font-normal text-gray-400 text-xs">{new Date(val.startDate).toDateString()} -{" "} {new Date(val.endDate).toDateString()}</p>
                                                        <a href="#" className="inline-flex items-center mt-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cridential <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="m-4 text-center">No Data</p>
                                        )}
                                </div>
                            ) : (
                                <p className="m-4 text-center font-semibold"><span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">No Data</span></p>
                            )}
                        </div>


                    </div>
                    {/* <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Lecense & Sertificate</h6>
                            </div>
                        </div>


                        <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                            <div className="flex flex-wrap">
                                <div className=" xl:w-3/12 px-2">
                                    <img className="w-40 h-35 rounded" src="https://law.uii.ac.id/wp-content/uploads/2021/11/logo-bangkit-2022.png" alt="Default avatar" />
                                </div>
                                <div className=" xl:w-9/12 px-2">
                                    <p className="font-semibold text-xl">Bangkit Academy</p>
                                    <p className="font-normal text-gray-400 text-xs">2022</p>
                                    <a href="#" className="inline-flex items-center mt-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cridential <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className=" xl:w-3/12 px-2">
                                    <img className="w-40 h-35 rounded" src="https://law.uii.ac.id/wp-content/uploads/2021/11/logo-bangkit-2022.png" alt="Default avatar" />
                                </div>
                                <div className=" xl:w-9/12 px-2">
                                    <p className="font-semibold text-xl">Bangkit Academy</p>
                                    <p className="font-normal text-gray-400 text-xs">2022</p>
                                    <a href="#" className="inline-flex items-center mt-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cridential<svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a>
                                </div>
                            </div>
                        </div>


                    </div> */}
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Educations</h6>
                            </div>
                        </div>


                        <div className="">
                            {addEducation !== undefined ? (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    {
                                        addEducation.length > 0 ? (
                                            addEducation.map(val => (
                                                <div className="flex flex-wrap">
                                                    <div className=" xl:w-3/12 px-2">
                                                        <img className="w-40 h-35 rounded" src={`${process.env.PUBLIC_URL}/Logo Biru.png`} alt="Default avatar" />
                                                    </div>
                                                    <div className=" xl:w-9/12 px-2">
                                                        <p className="font-semibold text-xl">{val.lembaga}</p>
                                                        <p className="font-medium">{val.gelar}</p>
                                                        <p className="font-medium text-gray-500">{val.bidangStudy}</p>
                                                        <p className="font-normal text-gray-400 text-xs">{new Date(val.startDate).toDateString()} -{" "} {new Date(val.endDate).toDateString()}</p>
                                                        {/* <a href="#" className="inline-flex items-center mt-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cridential <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a> */}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="m-4 text-center">No Data</p>
                                        )}
                                </div>
                            ) : (
                                <p className="m-4 text-center font-semibold"><span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">No Data</span></p>
                            )}
                        </div>


                    </div>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Organization</h6>
                            </div>
                        </div>


                        <div className="">
                            {addorganization !== undefined ? (
                                <div className="grid gap-6 mb-6 md:grid-cols-2 m-6">
                                    {
                                        addorganization.length > 0 ? (
                                            addorganization.map(val => (
                                                <div className="flex flex-wrap">
                                                    <div className=" xl:w-3/12 px-2">
                                                        <img className="w-40 h-35 rounded" src={`${process.env.PUBLIC_URL}/Logo Biru.png`} alt="Default avatar" />
                                                    </div>
                                                    <div className=" xl:w-9/12 px-2">
                                                        <p className="font-semibold text-xl">{val.organizationName}</p>
                                                        <p className="font-medium">{val.role}</p>
                                                        <p className="font-normal text-gray-400 text-xs">{new Date(val.startDate).toDateString()} -{" "} {new Date(val.endDate).toDateString()}</p>
                                                        {/* <a href="#" className="inline-flex items-center mt-2 py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">Cridential <svg className="ml-2 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg></a> */}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="m-4 text-center">No Data</p>
                                        )}
                                </div>
                            ) : (
                                <p className="m-4 text-center font-semibold"><span class="bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">No Data</span></p>
                            )}
                        </div>


                    </div>
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded-lg bg-blueGray-100 border-0 mt-8">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                            <div className="text-center flex justify-between">
                                <h6 className="text-blueGray-700 text-xl font-bold">Skills</h6>
                            </div>
                        </div>


                        <div className="grid gap-6 mb-6 md:grid-cols-2 m-6 px-2">
                            <div className="flex flex-wrap">
                                <div className=" xl:w-9/12 px-2">
                                    {skill !== undefined ? (
                                        <ol className="relative border-l border-gray-200 dark:border-gray-700">
                                            {skill.length > 0 ? (
                                                skill.map(val => (

                                            < li className="mb-10 ml-6">
                                            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-briefcase-fill w-3 h-3 text-blue-600 dark:text-blue-400" viewBox="0 0 16 16">
                                                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v1.384l7.614 2.03a1.5 1.5 0 0 0 .772 0L16 5.884V4.5A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5z" />
                                                    <path d="M0 12.5A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5V6.85L8.129 8.947a.5.5 0 0 1-.258 0L0 6.85v5.65z" />
                                                </svg>
                                            </span>
                                            <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">{val}</h3>
                                        </li>
                                    ))
                                    ) : (
                                    <div className="text-center flex flex-auto seft-center">
                                        <p className="text-center flex flex-auto">No data</p>
                                    </div>
                                            )}
                                </ol>
                                ) : (
                                <p className="text-center flex flex-auto">No data</p>
                                    )}



                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
        </>
    )
}