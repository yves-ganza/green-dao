import React from 'react'

const Membership = ({mintNFT}) => {
    return(
        <div className={'absolute inset-0 bg-none flex items-center justify-center'}>
            <section className={'bg-gray-800 text-white flex flex-col justify-center items-center max-w-[500px] rounded shadow mx-auto'}>
                <h2 className={'text-xl text-center p-4'}>Mint your free <span>🌍GreenDAO</span> Membership NFT</h2>
                <button className={'py-4 px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'} onClick={mintNFT}>Mint NFT</button>
            </section>
        </div>

    )
}

export default Membership