const sdk = require('./1-init-sdk')

const app = sdk.getAppModule('0x09bEe13a2AD9D9Ff254ff252f72F43D32dC24A61')

const deployVoteModule = async () => {

    try {
        console.log('🔄 Deploying...')
        const voteModule = await app.deployVoteModule({
            name: '🌍GreenDAO Community Proposols',
            votingTokenAddress: '0x366758036472b97f2c95e1bf6206a2f79ae34590',
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: '0'
        })
        console.log('✅ Successfully deployed module with address ', voteModule.address)
        process.exit(0)
    }catch (e) {
        console.log('❌ ', e)
        console.log('❌ Module Deployment Failed!')
        process.exit(1)
    }
}

const setModuleMetaData = async () => {
    try {
        const voteModule = await app.deployVoteModule({
            name: '🌍GreenDAO Proposols',
            description: 'Community voting mechanism',
            votingTokenAddress: '0x366758036472b97f2C95E1Bf6206a2f79AE34590',
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 168 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: 0
        })
        console.log('✅ Successfully deployed module with address ', voteModule.address)
        process.exit(0)
    }catch (e) {
        console.log('❌ ', e.message)
        console.log('❌ Module Deployment Failed!')
        process.exit(1)
    }
}

deployVoteModule()