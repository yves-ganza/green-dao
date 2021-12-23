import {useWeb3} from '@3rdweb/hooks'
import {ThirdwebSDK} from "@3rdweb/sdk"
import React, {useEffect, useState} from "react"
import {ethers} from "ethers"

import Dashboard from "./dashboard"
import Membership from "../components/membership"

const sdk = new ThirdwebSDK(ethers.getDefaultProvider(process.env.NEXT_PUBLIC_INFURA_API_URL,{
    infura: {
        projectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
        projectSecret: process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET,
    }
}));

const bundleDrop = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC');
const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590');

export default function Home() {
    const {connectWallet, address, balance, error, provider, chainId} = useWeb3()
    const [hasClaimedNFT, setHasClaimedNFT] = useState(false)
    const [status, setStatus] = useState('')
    const [members, setMembers] = useState([])
    const signer = provider?.getSigner() || undefined

    const handleConnect = () => {
        try {
            setStatus('Connecting Wallet')
            connectWallet('injected')
            console.log(`Wallet connected!`)
            setStatus('')
        }catch(e){
            console.log(e)
            setStatus(`Error: ${e.message}`)
        }
    }


    const checkClaimStatus = async (address) => {
        if(!address) return

        try{
            setStatus('Checking membership status...')
            const balance = await bundleDrop.balanceOf(address, '0')
            console.log(balance)
            if(balance.gt(0)){
                setStatus('')
                setHasClaimedNFT(true)
                console.log('🔥 User is a member')
                return
            }
            setHasClaimedNFT(false)
            console.log('👀 No Membership')
            setStatus('')
        }catch (e) {
            console.log(e)
            setHasClaimedNFT(false)
            setStatus('Error: Please refresh the page!')
        }
    }

    const mintNFT = async () => {
        try {
            setStatus('Minting: Please wait...')
            await bundleDrop.claim('0',1)
            setStatus('')
            console.log('🎉 Woohoo NFT minted successfully, ', `https://tests.opensea.io/assets/${bundleDrop.address}/0`)
            setStatus('Getting list...')
            let list = await bundleDrop.getAllClaimerAddresses('0')
            console.log(list)
            setStatus('')
            setHasClaimedNFT(true)
        }catch (e) {
            console.log(e)
            setStatus(`Error: Operation failed!`)
        }
    }

    const getAllMembers = async () => {
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

    const init = async () => {
        if(!address) return
        await checkClaimStatus(address)
        sdk.setProviderOrSigner(signer)
        await getAllMembers()
    }

    useEffect(() => {
        init()
    }, [address])

    if(!address){
        return(
            <div className={'absolute inset-0 bg-none flex items-center justify-center'}>
                <section className={'bg-gray-800 text-white flex flex-col justify-center items-center max-w-96 rounded shadow mx-auto'}>
                    <h1 className={'text-xl p-4'}>👋Welcome to 🌍GreenDAO </h1>
                    <button className={'py-4 px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'} onClick={handleConnect}>Connect Wallet</button>
                </section>
            </div>

        )
    }

    return(
        <div>
            {
                status ? <div className={'statusModal'}>{status}</div> : ''
            }
            {
                hasClaimedNFT ?
                    <Dashboard /> :
                    <Membership mintNFT={mintNFT}/>
            }
        </div>
    )
}
