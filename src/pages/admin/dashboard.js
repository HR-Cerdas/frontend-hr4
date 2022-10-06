import React from "react";
import HeaderStats from "../../components/HeaderStats.js/HeaderStasts";

export default function Dashboard() {
    return (
        <>
            <div className="flex flex-wrap">
                <div className="w-full mb-12 px-4">
                    <HeaderStats />
                </div>
            </div>
        </>
    )
}