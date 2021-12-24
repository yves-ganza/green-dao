import React, {useEffect, useState} from 'react';
import {ethers} from "ethers";
import {useWeb3} from "@3rdweb/hooks";
import {ThirdwebSDK} from "@3rdweb/sdk";

import Proposals from "../components/proposals";

const sdk = new ThirdwebSDK(process.env.NEXT_PUBLIC_INFURA_API_URL)

const bundleDrop = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC');
const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590');

const Dashboard = () => {
    const {address, balance, disconnectWallet, provider} = useWeb3()
    const [members, setMembers] = useState([])
    const signer = provider?.getSigner() || undefined

    const getMembers = async () => {
        try{
            let list = await bundleDrop.getAllClaimerAddresses('0')
            console.log(list)
            const tokenHolders = await tokenModule.getAllHolderBalances()

            list = list.map(address => ({
                address,
                amount: ethers.utils.formatUnits(tokenHolders[address] || 0, 18)
            }))
            setMembers([...list])
        }catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        sdk.setProviderOrSigner(signer)
    }, [signer])

    useEffect(() => {
        getMembers()
    }, [])

    return (
        <div className={'p-4 lg:grid lg:grid-cols-5 lg:grid-rows-6 lg:max-h-screen md:pl-8 xl:pl-12'}>
            <header className={'p-4 mb-12 lg:mb-0 lg:row-start-1 lg:row-end-3 lg:col-start-1 lg:col-end-5 mx-auto text-center flex items-center justify-center'}>
                <h1 className={'text-4xl text-gray-100 font-bold'}>
                    <span className={'block md:inline animate-pulse text-9xl text-center'}>🌍</span>
                    <span className={'ml-1 lg:ml-5 text-center'}>GreenDAO</span>
                </h1>
            </header>
            <aside className='lg:row-start-3 lg:row-end-5 lg:col-start-1 col-end-3 flex items-center justify-center'>
                <section className='bg-white shadow rounded flex flex-col justify-center w-full  max-w-96 px-4'>
                    <h2 className={'text-gray-500 text-xl text-center py-4'}>Your Wallet</h2>
                    <p className={'pb-4 text-md'}>Address: <span className={'block pl-4 overflow-x-auto whitespace-nowrap'}>{address}</span></p>
                    <p className={'pb-4 text-md whitespace-nowrap'}>Balance: <span className={'block pl-4 overflow-x-auto whitespace-nowrap'}>{balance?.formatted} ETH</span></p>
                    <div className={'flex items-center justify-center'}>
                        <button
                            className={'py-4 px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'}
                            onClick={disconnectWallet}
                        >Switch Account</button>
                    </div>
                </section>
            </aside>
            <main className={'lg:row-start-3 lg:row-end-7 lg:col-start-3 lg:col-end-6 lg:ml-24 lg:border-l-1'}>
                <Proposals />
            </main>
            <aside className={'lg:row-start-5 lg:row-end-7 lg:col-start-1 lg:col-end-3'}>
                <section className='flex flex-col justify-center max-w-96'>
                    <h2 className={'text-gray-100 text-xl text-center py-4'}>Community members</h2>
                    <table className={'w-full'}>
                        <tbody>
                        {
                            members.map((member, i) => (
                                <tr key={i} className='flex justify-between bg-white shadow my-2 rounded p-4'>
                                    <td>
                                        {member['address'].toString().slice(0,5)}
                                        ...
                                        {member['address'].toString().slice(-4)}
                                    </td>
                                    <td>{member['amount']} ANKH</td>
                                </tr>
                            ))
                        }
                        </tbody>

                    </table>
                </section>
            </aside>
        </div>
    )
}

export default Dashboard