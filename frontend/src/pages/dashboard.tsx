import React, { ReactElement, useState } from 'react'
import AuthMiddleware from '@/middlewares/auth/AuthMiddleware'
import Header from '@/components/Header'
import Navbar from "../components/Navbar"
import Transaction from '@/components/form/Transaction'
import WagmiWrapperLayout from '@/layouts/Wagmi'
import dynamic from 'next/dynamic'


const ConnectLayout = dynamic(() => import("@/layouts/Connect"), {
    ssr: false,
});

const Dashboard = (): JSX.Element => {

    return (
        <>
            <div className=' md:px-2 sm:px-2 max-sm:px-2 '>
                {/* <Header /> */}
                <Transaction />
            </div>
        </>
    )
}

Dashboard.getLayout = function getLayout(page: ReactElement) {
    return (
        <WagmiWrapperLayout>
            <AuthMiddleware>
                <ConnectLayout>
                    <Navbar />
                    {page}
                </ConnectLayout>
            </AuthMiddleware>
        </WagmiWrapperLayout>
    )
}

export default Dashboard