const { ServerConfig, CodestashAppView } = require('@codestash-lex/codestash')
const { Secp256k1Keypair } = require('@atproto/crypto')
const cluster = require('cluster')
const dd = require('dd-trace')

dd.tracer
  .init()
  .use('http2', {
    client: true, // calls into dataplane
    server: false,
  })
  .use('express', {
    hooks: {
      request: (span, req) => {
        maintainXrpcResource(span, req)
      },
    },
  })

const main = async () => {
    const env = getEnv()
    const config = ServerConfig.readEnv()
    const signingKey = await Secp256k1Keypair.import(env.serviceSigningKey)

    const codestash = CodestashAppView.create({ config, signingKey });
    await codestash.start();
}

const maybeParseInt = (str) => {
    if (!str) return
    const int = parseInt(str, 10)
    if (isNaN(int)) return
    return int
}

const getEnv = () => ({
    serviceSigningKey: process.env.CODESTASH_SERVICE_SIGNING_KEY || undefined,
}); const workerCount = maybeParseInt(process.env.CLUSTER_WORKER_COUNT)

if (workerCount) {
    if (cluster.isPrimary) {
        console.log(`primary ${process.pid} is running`)
        const workers = new Set()
        for (let i = 0; i < workerCount; ++i) {
            workers.add(cluster.fork())
        }
        let teardown = false
        cluster.on('exit', (worker) => {
            workers.delete(worker)
            if (!teardown) {
                workers.add(cluster.fork()) // restart on crash
            }
        })
        process.on('SIGTERM', () => {
            teardown = true
            console.log('disconnecting workers')
            workers.forEach((w) => w.disconnect())
        })
    } else {
        console.log(`worker ${process.pid} is running`)
        main()
    }
} else {
    main() // non-clustering
}