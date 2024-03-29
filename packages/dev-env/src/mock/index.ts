import { TestNetwork } from '../index'

// NOTE
// deterministic date generator
// we use this to ensure the mock dataset is always the same
// which is very useful when testing
// (not everything is currently deterministic but it could be)
// function* dateGen(): Generator<string, never> {
//   let start = 1657846031914
//   while (true) {
//     yield new Date(start).toISOString()
//     start += 1e3
//   }
// }

export async function generateMockSetup(env: TestNetwork) {
  // const date = dateGen()


  // const alice = users[0]
  // const bob = users[1]
  // const carla = users[2]

  // let _i = 1
  // // for (const user of users) {
  // //   const res = await clients.loggedout.api.com.atproto.server.createAccount({
  // //     email: user.email,
  // //     handle: user.handle,
  // //     password: user.password,
  // //   })
  // //   user.agent.api.setHeader('Authorization', `Bearer ${res.data.accessJwt}`)
  // //   user.did = res.data.did
  // //   await user.agent.api.org.codestash.actor.profile.create(
  // //     { repo: user.did },
  // //     {
  // //       displayName: ucfirst(user.handle).slice(0, -5),
  // //       description: `Test user ${_i++}`,
  // //     },
  // //   )
  // // }

  // Create moderator accounts
  // const triageRes =
  //   await clients.loggedout.api.com.atproto.server.createAccount({
  //     email: 'triage@test.com',
  //     handle: 'triage.test',
  //     password: 'triage-pass',
  //   })
  // env.ozone.addAdminDid(triageRes.data.did)
  // const modRes = await clients.loggedout.api.com.atproto.server.createAccount({
  //   email: 'mod@test.com',
  //   handle: 'mod.test',
  //   password: 'mod-pass',
  // })
  // env.ozone.addAdminDid(modRes.data.did)
  // const adminRes = await clients.loggedout.api.com.atproto.server.createAccount(
  //   {
  //     email: 'admin-mod@test.com',
  //     handle: 'admin-mod.test',
  //     password: 'admin-mod-pass',
  //   },
  // )
  // env.ozone.addAdminDid(adminRes.data.did)

  // // Report one user
  // const reporter = picka(users)
  // await reporter.agent.api.com.atproto.moderation.createReport({
  //   reasonType: picka([
  //     COM_ATPROTO_MODERATION.DefsReasonSpam,
  //     COM_ATPROTO_MODERATION.DefsReasonOther,
  //   ]),
  //   reason: picka(["Didn't look right to me", undefined, undefined]),
  //   subject: {
  //     $type: 'com.atproto.admin.defs#repoRef',
  //     did: picka(users).did,
  //   },
  // })


  // // create the dev-env moderator
  // {
  //   const res = await clients.loggedout.api.com.atproto.server.createAccount({
  //     email: 'mod-authority@test.com',
  //     handle: 'mod-authority.test',
  //     password: 'hunter2',
  //   })
  //   const agent = env.pds.getClient()
  //   agent.api.setHeader('Authorization', `Bearer ${res.data.accessJwt}`)
  //   await agent.api.org.codestash.actor.profile.create(
  //     { repo: res.data.did },
  //     {
  //       displayName: 'Dev-env Moderation',
  //       description: `The pretend version of mod.bsky.app`,
  //     },
  //   )

  //   await agent.api.org.codestash.labeler.service.create(
  //     { repo: res.data.did, rkey: 'self' },
  //     {
  //       policies: {
  //         labelValues: [
  //           '!hide',
  //           '!warn',
  //           'porn',
  //           'sexual',
  //           'nudity',
  //           'sexual-figurative',
  //           'graphic-media',
  //           'self-harm',
  //           'sensitive',
  //           'extremist',
  //           'intolerant',
  //           'threat',
  //           'rude',
  //           'illicit',
  //           'security',
  //           'unsafe-link',
  //           'impersonation',
  //           'misinformation',
  //           'scam',
  //           'engagement-farming',
  //           'spam',
  //           'rumor',
  //           'misleading',
  //           'inauthentic',
  //         ],
  //         labelValueDefinitions: [
  //           {
  //             identifier: 'spam',
  //             blurs: 'content',
  //             severity: 'inform',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Spam',
  //                 description:
  //                   'Unwanted, repeated, or unrelated actions that bother users.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'impersonation',
  //             blurs: 'none',
  //             severity: 'inform',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Impersonation',
  //                 description:
  //                   'Pretending to be someone else without permission.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'scam',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Scam',
  //                 description: 'Scams, phishing & fraud.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'intolerant',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Intolerance',
  //                 description: 'Discrimination against protected groups.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'self-harm',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Self-Harm',
  //                 description:
  //                   'Promotes self-harm, including graphic images, glorifying discussions, or triggering stories.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'security',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Security Concerns',
  //                 description:
  //                   'May be unsafe and could harm your device, steal your info, or get your account hacked.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'misleading',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Misleading',
  //                 description:
  //                   'Altered images/videos, deceptive links, or false statements.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'threat',
  //             blurs: 'content',
  //             severity: 'inform',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Threats',
  //                 description:
  //                   'Promotes violence or harm towards others, including threats, incitement, or advocacy of harm.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'unsafe-link',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Unsafe link',
  //                 description:
  //                   'Links to harmful sites with malware, phishing, or violating content that risk security and privacy.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'illicit',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Illicit',
  //                 description:
  //                   'Promoting or selling potentially illicit goods, services, or activities.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'misinformation',
  //             blurs: 'content',
  //             severity: 'inform',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Misinformation',
  //                 description:
  //                   'Spreading false or misleading info, including unverified claims and harmful conspiracy theories.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'rumor',
  //             blurs: 'content',
  //             severity: 'inform',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Rumor',
  //                 description:
  //                   'Approach with caution, as these claims lack evidence from credible sources.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'rude',
  //             blurs: 'content',
  //             severity: 'inform',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Rude',
  //                 description:
  //                   'Rude or impolite, including crude language and disrespectful comments, without constructive purpose.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'extremist',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Extremist',
  //                 description:
  //                   'Radical views advocating violence, hate, or discrimination against individuals or groups.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'sensitive',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'warn',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Sensitive',
  //                 description:
  //                   'May be upsetting, covering topics like substance abuse or mental health issues, cautioning sensitive viewers.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'engagement-farming',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Engagement Farming',
  //                 description:
  //                   'Insincere content or bulk actions aimed at gaining followers, including frequent follows, posts, and likes.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'inauthentic',
  //             blurs: 'content',
  //             severity: 'alert',
  //             defaultSetting: 'hide',
  //             adultOnly: false,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Inauthentic Account',
  //                 description: 'Bot or a person pretending to be someone else.',
  //               },
  //             ],
  //           },
  //           {
  //             identifier: 'sexual-figurative',
  //             blurs: 'media',
  //             severity: 'none',
  //             defaultSetting: 'show',
  //             adultOnly: true,
  //             locales: [
  //               {
  //                 lang: 'en',
  //                 name: 'Sexually Suggestive (Cartoon)',
  //                 description:
  //                   'Art with explicit or suggestive sexual themes, including provocative imagery or partial nudity.',
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //       createdAt: date.next().value,
  //     },
  //   )
  // }
}

// create a labeler account
// {
//   const res = await clients.loggedout.api.com.atproto.server.createAccount({
//     email: 'labeler@test.com',
//     handle: 'labeler.test',
//     password: 'hunter2',
//   })
//   const agent = env.pds.getClient()
//   agent.api.setHeader('Authorization', `Bearer ${res.data.accessJwt}`)
//   await agent.api.org.codestash.actor.profile.create(
//     { repo: res.data.did },
//     {
//       displayName: 'Test Labeler',
//       description: `Labeling things across the atmosphere`,
//     },
//   )

// await agent.api.org.codestash.labeler.service.create(
//   { repo: res.data.did, rkey: 'self' },
//   {
//     policies: {
//       labelValues: [
//         '!hide',
//         'porn',
//         'rude',
//         'spam',
//         'spider',
//         'misinfo',
//         'cool',
//         'curate',
//       ],
//       labelValueDefinitions: [
//         {
//           identifier: 'rude',
//           blurs: 'content',
//           severity: 'alert',
//           defaultSetting: 'warn',
//           adultOnly: true,
//           locales: [
//             {
//               lang: 'en',
//               name: 'Rude',
//               description: 'Just such a jerk, you wouldnt believe it.',
//             },
//           ],
//         },
//         {
//           identifier: 'spam',
//           blurs: 'content',
//           severity: 'inform',
//           defaultSetting: 'hide',
//           locales: [
//             {
//               lang: 'en',
//               name: 'Spam',
//               description:
//                 'Low quality posts that dont add to the conversation.',
//             },
//           ],
//         },
//         {
//           identifier: 'spider',
//           blurs: 'media',
//           severity: 'alert',
//           defaultSetting: 'warn',
//           locales: [
//             {
//               lang: 'en',
//               name: 'Spider!',
//               description: 'Oh no its a spider.',
//             },
//           ],
//         },
//         {
//           identifier: 'cool',
//           blurs: 'none',
//           severity: 'inform',
//           defaultSetting: 'warn',
//           locales: [
//             {
//               lang: 'en',
//               name: 'Cool',
//               description: 'The coolest peeps in the atmosphere.',
//             },
//           ],
//         },
//         {
//           identifier: 'curate',
//           blurs: 'none',
//           severity: 'none',
//           defaultSetting: 'warn',
//           locales: [
//             {
//               lang: 'en',
//               name: 'Curation filter',
//               description: 'We just dont want to see it as much.',
//             },
//           ],
//         },
//       ],
//     },
//     createdAt: date.next().value,
//   },
// )
// await createLabel(env.codestash.db, {
//   uri: alice.did,
//   cid: '',
//   val: 'rude',
//   src: res.data.did,
// })
// await createLabel(env.codestash.db, {
//   uri: `at://${alice.did}/app.bsky.feed.generator/alice-favs`,
//   cid: '',
//   val: 'cool',
//   src: res.data.did,
// })
// await createLabel(env.codestash.db, {
//   uri: bob.did,
//   cid: '',
//   val: 'cool',
//   src: res.data.did,
// })
// await createLabel(env.codestash.db, {
//   uri: carla.did,
//   cid: '',
//   val: 'spam',
//   src: res.data.did,
// })
// }
// }

// function ucfirst(str: string): string {
//   return str.at(0)?.toUpperCase() + str.slice(1)
// }

// const createLabel = async (
//   db: Database,
//   opts: { uri: string; cid: string; val: string; src?: string },
// ) => {
//   await db.db
//     .insertInto('label')
//     .values({
//       uri: opts.uri,
//       cid: opts.cid,
//       val: opts.val,
//       cts: new Date().toISOString(),
//       neg: false,
//       src: opts.src ?? EXAMPLE_LABELER,
//     })
//     .execute()
// }
