const sdk = require('./1-init-sdk')

const bundleDrop = sdk.getBundleDropModule('0x99C00b0225ba5f1b675f64A2BF87Cea97538dcCC');

const setClaimConditions = async () => {
    try{
        const claimConditionFactory = bundleDrop.getClaimConditionFactory()
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 31_000,
            maxQuantityPerTransaction: 1
        })

        console.log('🔄 Setting conditions...')
        await bundleDrop.setClaimCondition(0, claimConditionFactory)
        console.log('✅ Claim conditions set successfully!')
        process.exit(0)
    }catch (e) {
        console.log('❌ Error: ', e)
        console.log('❗️ Failed to set claim conditions')
        process.exit(1)
    }
}

setClaimConditions()

