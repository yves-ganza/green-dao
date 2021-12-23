const sdk = require('./1-init-sdk')
const {ethers} = require('ethers')
require('dotenv').config()

const voteModule = sdk.getVoteModule(process.env.NEXT_PUBLIC_VOTE_MODULE_ADDRESS)
const tokenModule = sdk.getTokenModule('0x366758036472b97f2C95E1Bf6206a2f79AE34590')

const amount = 310_000

const createProposal = async () => {
    try{
        console.log('🔄 Submitting proposal...')
        const id = await voteModule.propose(
            `Should the community mint an additional ${amount} tokens into the treasury?`,
            [
                {
                    nativeTokenValue: 0,
                    toAddress: tokenModule.address,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        'mint',
                        [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
                    )
                }
            ]
        )
        console.log('✅ Proposal successfully created id: ', id)
        process.exit(0)
    }catch(e){
        console.log('❌ Failed to create proposal')
        console.log(e.message)
        process.exit(1)
    }
}

createProposal()