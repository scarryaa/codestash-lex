// import { ServiceImpl } from '@connectrpc/connect'
// import { Service } from '../../../proto/codestash_connect'
// import { Database } from '../db'

// export default (db: Database): Partial<ServiceImpl<typeof Service>> => ({
//     async getRepositories(req) {
//         const { uris } = req;
//         if (uris.length === 0) {
//             return { repositories: [] };
//         }

//         // Fetch additional information related to repositories
//         const repositoryData = await db.db
//             .selectFrom('repository')
//             .where('url', 'in', uris)
//             .execute();

//         // Process fetched data and prepare the response
//         const repositories = uris.map((url) => {
//             // TODO double check this
//             const repository: any = repositoryData.find((data: any) => data.url === url);
//             return {
//                 name: repository?.name ?? '',
//                 owner: repository?.owner ?? '',
//                 description: repository?.description ?? '',
//                 createdAt: repository?.createdAt ?? '',
//                 updatedAt: repository?.updatedAt ?? '',
//                 defaultBranch: repository?.defaultBranch ?? '',
//                 url: repository?.url ?? '',
//                 homepage: repository?.homepage ?? '',
//                 languages: repository?.languages ?? [],
//                 license: repository?.license ?? '',
//                 stars: repository?.stars ?? 0,
//                 forks: repository?.forks ?? 0,
//                 watchers: repository?.watchers ?? 0,
//                 // Include any additional properties here
//             };
//         });

//         return { repositories };
//     }
// })

// // async getDidsByHandles(req) {
// //     const { handles } = req
// //     if (handles.length === 0) {
// //         return { dids: [] }
// //     }
// //     const res = await db.db
// //         .selectFrom('actor')
// //         .where('handle', 'in', handles)
// //         .selectAll()
// //         .execute()
// //     const byHandle = keyBy(res, 'handle')
// //     const dids = handles.map((handle) => byHandle[handle]?.did ?? '')
// //     return { dids }
// // },)
