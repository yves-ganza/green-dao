import React, {useEffect, useState} from 'react'
import {ThirdwebSDK} from "@3rdweb/sdk"
import {ethers} from "ethers";

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

    useEffect(() => {
        voteModule.getAll().then(data => {
            setState(data.map(p => ({...p, vote: '-1'})))
        })
    }, [])
    return(
        <section>
            <header className={'text-xl text-white pt-12 pb-8 text-center'}>
                <h2>🌍GreenDAO Proposals</h2>
            </header>
            <main className={'bg-white rounded max-w-[500px] p-4 flex flex-col items-center justify-center'}>
                {
                    state.length > 0 ?
                        state.map((p, i) => (
                            <article key={i}>
                                {/*<h3 className={'border inline px-4 py-2 rounded-lg'}>{`${p.proposer.slice(0, 5)}...${p.proposer.slice(-4)}`}</h3>*/}
                                <p className={'py-8'}>{p.description}</p>
                                <hr />
                                <form className={'pt-2'}>
                                    <div className={'flex items-center justify-between py-2 text-lg'}>
                                        <div>
                                            <input type="radio" id="for" name="vote" value="1" />
                                            <label htmlFor="for"> 👍</label>
                                        </div>

                                        <div>
                                            <input type="radio" id="against" name="vote" value="0" />
                                            <label htmlFor="against"> 👎</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="abstain" name="vote" value="-1" />
                                            <label htmlFor="abstain"> 😶</label>
                                        </div>
                                    </div>
                                    <div className={'flex items-center justify-center'}>
                                        <button className={'css-button-gradient--8'}>Vote</button>
                                    </div>
                                </form>

                            </article>
                        )) : '👀No proposal submitted yet!'
                }
            </main>
            <footer className={'flex items-center justify-center py-4'}>
                <button
                    className={'py-4 hover:border hover:border-white px-5 m-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded'}
                >Have Proposal🤔?</button>
            </footer>
        </section>
    )
}

export default Proposals

