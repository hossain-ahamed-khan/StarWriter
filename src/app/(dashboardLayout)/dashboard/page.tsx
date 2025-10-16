"use client";

import Image from 'next/image';
import React from 'react';
import barchartImg from "../../../../public/resources/images/barchart-icon.png";
import { FaUserPlus } from "react-icons/fa6";
import { OverView, type OverviewError, type OverviewSuccess } from '@/services/Overview';

export default function DashboardPage() {
    const [data, setData] = React.useState<OverviewSuccess | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        let isMounted = true;
        (async () => {
            setLoading(true);
            const res = await OverView();
            if (!isMounted) return;
            if ('success' in res && res.success === false) {
                setError(res.error || 'Failed to load dashboard');
            } else {
                setData(res as OverviewSuccess);
            }
            setLoading(false);
        })();
        return () => { isMounted = false; };
    }, []);

    const fullName = data?.admin_full_name ?? 'Admin';

    return (
        <>
            <div className='w-full mx-auto m-4 p-8 bg-white rounded-lg'>
                <p className='text-[#1A1A1A]'>Hi, Good Morning</p>
                <h2 className='text-[#1A1A1A] text-2xl font-semibold'>{fullName}</h2>
            </div>

            <div className='w-full mx-auto flex-col lg:flex lg:flex-row gap-4'>
                <div className='w-full lg:w-8/12 bg-white rounded-lg p-8'>
                    <div className='flex items-center justify-between mb-8'>
                        <h2 className='text-[#1A1A1A] text-2xl font-semibold'>User&apos;s Overview</h2>
                        {loading && <span className='text-sm text-gray-500'>Loading…</span>}
                        {error && !loading && <span className='text-sm text-red-600'>{error}</span>}
                    </div>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
                        <div className='text-[#1A1A1A] w-56 h-44 bg-[#EFF5FF] p-8 rounded-2xl'>
                            <Image src={barchartImg} width={40} height={40} alt="barchart icon" />
                            <h2 className='text-2xl font-semibold mt-4'>{data?.total_users ?? '-'}</h2>
                            <p className='font-medium mt-1'>Total Users</p>
                        </div>
                        <div className='text-[#1A1A1A] w-56 h-44 bg-[#EFF5FF] p-8 rounded-2xl'>
                            <Image src={barchartImg} width={40} height={40} alt="barchart icon" />
                            <h2 className='text-2xl font-semibold mt-4'>{data?.todays_new_users ?? '-'}</h2>
                            <p className='font-medium mt-1'>Today&apos;s New User</p>
                        </div>
                        <div className='text-[#1A1A1A] w-56 h-44 bg-[#EFF5FF] p-8 rounded-2xl'>
                            <Image src={barchartImg} width={40} height={40} alt="barchart icon" />
                            <h2 className='text-2xl font-semibold mt-4'>{data?.total_subscribers ?? '-'}</h2>
                            <p className='font-medium mt-1'>Total Subscribers</p>
                        </div>
                        <div className='text-[#1A1A1A] w-56 h-44 bg-[#EFF5FF] p-8 rounded-2xl'>
                            <Image src={barchartImg} width={40} height={40} alt="barchart icon" />
                            <h2 className='text-2xl font-semibold mt-4'>{data?.total_earned != null ? `$${data.total_earned}` : '-'}</h2>
                            <p className='font-medium mt-1'>Total Revenue</p>
                        </div>
                    </div>
                </div>

                <div className='w-full lg:w-4/12 bg-white rounded-lg p-8'>
                    <h2 className='text-[#1A1A1A] text-2xl font-semibold mb-8'>Income</h2>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='text-[#1A1A1A] w-56 h-44 bg-[#EFF5FF] p-8 rounded-2xl'>
                            <FaUserPlus className='bg-[#0030A8] p-2 w-10 h-10 rounded-full text-white text-2xl' />
                            <h2 className='text-2xl font-semibold mt-4'>{data?.total_earned != null ? `$${data.total_earned}` : '-'}</h2>
                            <p className='font-medium mt-1'>Total Revenue</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
