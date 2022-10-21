import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { data } from "autoprefixer";

const CardDetailPost = () => {
    const [token, setToken] = useState(null);
    const [detail, setDetail] = useState([]);
    const [detailp, setDetailProfile] = useState([]);
    const [filter, setFilter] = useState(false);
    const [Aldata, setAldata] = useState()
    const param = useParams();
    console.log(typeof param.id)


    // Get TOken
    useEffect(() => {
        const item = sessionStorage.getItem("data");
        if (item) {
            setToken(JSON.parse(item));
        }
    }, []);

    useEffect(() => {
        if (token !== null) {
            getDetail(token);
            getDetailProfile(token);
            // getallLowongan(token);
        }
    }, [token]);


    const getDetail = async () => {
        await axios
            .post(`${process.env.REACT_APP_BASE_URL}/lowonganpekerjaan/getdetailpelamar`, {
                idLowongan: param.id
            }, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDetail(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    };

    const getDetailProfile = async () => {
        await axios
            .get(`${process.env.REACT_APP_BASE_URL}/pelamar/getdetailpelamar/id/${detail.id_pelamar}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                if (res.status === 200) {
                    setDetailProfile(res.data.data);
                    console.log(setDetailProfile)
                }
            })
            .catch((err) => {
                console.log(err.response.data);
            });
    }

    return (
        <>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded p-4">
                <div className="overflow-x-auto relative">
                    <div className="pb-4 bg-white dark:bg-gray-900 p-2">
                        <label for="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            </div>
                            <input type="text" className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search the employes" />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 px-6">
                                    Nama
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Alasan
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Nomor Hp
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Score
                                </th>
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {detail.length > 0 ? (
                            detail.map(val => (
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                        <th scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src="https://cssh.northeastern.edu/wp-content/uploads/2020/01/PHIL-Nathanson-web.jpg" alt="hanip" />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold"> {val.name} </div>
                                            </div>
                                        </th>
                                        <td className="py-4 px-6">
                                            {val.alasan}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-gray-200 dark:text-gray-300">{val.nomer}</span>
                                        </td>

                                        <td className="py-4 px-6">
                                            <span className="bg-blue-100 text-blue-800 text-sm font-bold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800">{val.score_utama}</span>
                                        </td>

                                        <td className="flex items-center py-4 px-6 space-x-3">
                                            <a href={`/admin/listpost/detailPost/${val.id_pelamar}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                                <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                            </svg></a>
                                            <a href={`/admin/analytic/${val.id_pelamar}`} className="font-medium text-gray-600 dark:text-gray-500 hover:underline"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2-data-fill" viewBox="0 0 16 16">
                                                <path d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
                                                <path d="M4.085 1H3.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1h-.585c.055.156.085.325.085.5V2a1.5 1.5 0 0 1-1.5 1.5h-5A1.5 1.5 0 0 1 4 2v-.5c0-.175.03-.344.085-.5ZM10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7Zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1Zm4-3a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0V9a1 1 0 0 1 1-1Z" />
                                            </svg></a>
                                        </td>
                                    </tr>
                                </tbody>
                            ))
                        ) : (
                            <p>No Data</p>
                        )}
                    </table>
                </div>
            </div>

        </>
    );
};
export default CardDetailPost;