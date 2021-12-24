import React, {useEffect, useState} from 'react'

import {ThirdwebSDK} from "@3rdweb/sdk"
import {useWeb3} from "@3rdweb/hooks"
import {ethers} from "ethers"

const sdk = new ThirdwebSDK(ethers.getDefaultProvider(process.env.NEXT_PUBLIC_INFURA_API_URL,{
    infura: {
        projectId: process.env.NEXT_PUBLIC_INFURA_PROJECT_ID,
        projectSecret: process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET,
    }
}))

const voteModule = sdk.getVoteModule(process.env.NEXT_PUBLIC_VOTE_MODULE_ADDRESS)

const Proposal = ({p}) => {
    const {address, provider} = useWeb3()
    const [loading, setLoading] = useState(false)
    const [hasVoted, setHasVoted] = useState(null)
    const [vote, setVote] = useState('2')
    const signer = provider ? provider.getSigner() : undefined

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            console.log('🔄 Submitting vote...')
            const VoteType = Symbol(Number(vote))
            await voteModule.vote(p.proposalId, Number(vote))
            console.log('✅ Vote submitted successfully')
            setLoading(false)
        }catch (e) {
            console.log('❌ Vote submission failed\n', e)
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setVote(e.target.value)
    }

    useEffect(() => {
        sdk.setProviderOrSigner(signer)
        voteModule.hasVoted(p.proposalId, address).then(bol => {
                setHasVoted(bol)
        }).catch(e => {
            console.log('❌ ', e)
        })
    }, [signer])
    return(
        <article className={'bg-white rounded flex flex-col max-w-[500px] p-4'}>
            <h3>
                <span className={'border rounded-lg px-4'}>{`${p.proposer.slice(0, 5)}...${p.proposer.slice(-4)}`}</span>
            </h3>
            <p className={'pt-6'}>{p.description}</p>
            {
                hasVoted === null ? '' : hasVoted ? <p className={'text-center text-bold'}>Voted</p> :
                    <form className={'pt-2'} onSubmit = {handleSubmit}>
                        <div className={'flex items-center justify-between py-2 text-xl'}>
                            <div>
                                <input type="radio" id="for" name="vote" value="1" onChange={handleChange}/>
                                <label htmlFor="for"> 👍</label>
                            </div>

                            <div>
                                <input type="radio" id="against" name="vote" value="0" onChange={handleChange}/>
                                <label htmlFor="against"> 👎</label>
                            </div>
                            <div>
                                <input type="radio" id="abstain" name="vote" value="2" onChange={handleChange}/>
                                <label htmlFor="abstain"> 😶</label>
                            </div>
                        </div>
                        <div className={'flex items-center justify-center pt-3'}>
                            <button className={'css-button-gradient--8' + `${loading ? 'disabled': ''}`}>
                                {
                                    loading ? 'Please wait...' : 'Vote'
                                }
                            </button>
                        </div>
                    </form>
            }
        </article>
    )
}

export default Proposal