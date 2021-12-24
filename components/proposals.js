import React, {useEffect, useState} from 'react'
import {ThirdwebSDK} from "@3rdweb/sdk"
import {ethers} from "ethers"

import Proposal from './proposal'

const sdk = new ThirdwebSDK(ethers.getDefaultProvider(process.env.NEXT_PUBLIC_INFURA_API_URL,{
    infura: {
        projectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
        projectSecret: process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET,
    }
}));

const voteModule = sdk.getVoteModule(process.env.NEXT_PUBLIC_VOTE_MODULE_ADDRESS)

const Proposals = () => {
    const [state, setState] = useState([])

    const setVote = (proposalId, vote) => {
        data.forEach(p => {
            if(p.proposalId === proposalId){
                p.vote = vote
            }
        })
    }

    const submitVote = async (id) => {
        const proposal = state.filter(p.proposalId === proposalId)
        const vote = proposal.vote
        await voteModule.vote(id,)
    }

    useEffect(() => {
        voteModule.getAll().then(data => {
            setState(data.map(p => ({...p, vote: '-1'})))
        })
    }, [])
    return(
        <section className={'mt-12 lg:mt-0'}>
            <header className={'text-gray-100 text-2xl font-semibold text-center'}>
                <h2>Proposals</h2>
            </header>
            <main className={'p-4 flex flex-col items-center justify-center'}>
                {
                    state.length > 0 ?
                        state.map((p, i) => (
                            <Proposal key={i} p={p} />
                        )) : '👀No proposal submitted yet!'
                }
            </main>
            <footer className={'flex items-center justify-center'}>
                <button
                    className={'py-4 hover:border hover:border-white px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'}
                >Have Proposal🤔?</button>
            </footer>
        </section>
    )
}

export default Proposals

