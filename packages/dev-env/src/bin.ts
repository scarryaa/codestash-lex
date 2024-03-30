import './env';
import { TestNetwork } from './network';
import { mockMailer } from './util';

const run = async () => {
  console.log(`
██████╗
██╔═══██╗
██║██╗██║
██║██║██║
╚█║████╔╝
 ╚╝╚═══╝  protocol

[ created by Bluesky ]`);

  const network = await TestNetwork.create({
    pds: {
      port: 2583,
      hostname: 'localhost',
      enableDidDocWithSession: true,
    },
    bsky: {
      dbPostgresSchema: 'codestash',
      port: 2584,
      publicUrl: 'http://localhost:2584',
    },
    plc: { port: 2582 },
  });
  mockMailer(network.pds);
  // await generateMockSetup(network)

  console.log(
    `👤 DID Placeholder server started http://localhost:${network.plc.port}`,
  );
  console.log(
    `🌞 Personal Data server started http://localhost:${network.pds.port}`,
  );
  console.log(`🗼 Ozone server started http://localhost:${network.ozone.port}`);
  console.log(
    `🌅 Codestash Appview started http://localhost:${network.codestash.port}`,
  );
  for (const fg of network.feedGens) {
    console.log(`🤖 Feed Generator started http://localhost:${fg.port}`);
  }
};

run();
