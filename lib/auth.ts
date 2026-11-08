import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubId = process.env.GITHUB_CLIENT_ID;
const githubSecret = process.env.GITHUB_CLIENT_SECRET;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  // এই ঠিকানাগুলো থেকে আসা অনুরোধ বিশ্বাসযোগ্য ধরা হবে
  trustedOrigins: [
    process.env.BETTER_AUTH_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter(Boolean) as string[],

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // সাইন আপের পর নিজে থেকে লগইন হবে না
  },

  // শুধু google ও github, আর কোনো key এখানে থাকবে না
  socialProviders: {
    ...(googleId && googleSecret
      ? { google: { clientId: googleId, clientSecret: googleSecret } }
      : {}),
    ...(githubId && githubSecret
      ? { github: { clientId: githubId, clientSecret: githubSecret } }
      : {}),
  },
});