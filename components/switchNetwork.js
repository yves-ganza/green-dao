import React from 'react'
import {useWeb3, useSwitchNetwork} from "@3rdweb/hooks"

const SwitchNetwork = () => {
    const {switchNetwork} = useSwitchNetwork()
    return(
        <button className={'py-4 px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'} onClick={() => switchNetwork(1)}>Switch network</button>
    )
}

export default SwitchNetwork