"use strict";
// // api/index.ts
// import mongoose from 'mongoose';
// import app from '../app';
// // import app from '../src/app';
// let isConnected = false;
// const connectDB = async () => {
//   if (!isConnected) {
//     await mongoose.connect(process.env.DB_URI as string);
//     isConnected = true;
//   }
// };
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// export default async function handler(req: any, res: any) {
//   await connectDB();
//   return app(req, res);
// }
