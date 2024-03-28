const { ServerConfig, CodestashAppView } = require('@codestash-lex/codestash')
const { Secp256k1Keypair } = require('@atproto/crypto')

const main = async () => {
    const env = getEnv()
    const config = ServerConfig.readEnv()
    const signingKey = await Secp256k1Keypair.import(env.serviceSigningKey)

    const codestash = CodestashAppView.create({ config, signingKey });
    await codestash.start();
}

const getEnv = () => ({
    serviceSigningKey: process.env.CODESTASH_SERVICE_SIGNING_KEY || undefined,
});