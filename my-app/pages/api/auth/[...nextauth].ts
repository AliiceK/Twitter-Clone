import CredentialsProvider from 'next-auth/providers/credentials';
{/*It is a built-in authentication provider that allows users to authenticate
 using email and password credentials. */}
import {PrismaAdapter} from '@next-auth/prisma-adapter';
{/* It is an adapter that allows NextAuth.js to work with a Prisma database.*/}

import prisma from '@/libs/prismadb';
{/* It represents an instance of the Prisma client, which is used to interact with the database.*/}
import NextAuth from 'next-auth';
{/*it is the main NextAuth.js module used for configuring and running the authentication. */}
import bcrypt from 'bcrypt';




export default NextAuth({
    adapter : PrismaAdapter(prisma),
    providers : [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'},
                password : {label: 'password', type: 'text'}
            },

            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid credentials');
                }

                const user = await prisma.user.findUnique({
                    where : {
                        email: credentials.email
                    }
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error('Invalid credentials');
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials');
                }

                return user;
            }
        })
    ],

    debug: process.env.Node_ENV === 'development',
    session : {
        strategy : 'jwt'
    },

    jwt : {
        secret: process.env.NEXTAUTH_JWT_SECRET,
    },

    secret: process.env.NEXTAUTH_SECRET
});

{/*The adapter property is set to PrismaAdapter(prisma), 
indicating that Prisma will be used as the data adapter for NextAuth.js. 

-- The providers property is an array that configures the available authentication providers.
 In this case, only the CredentialsProvider is used.

The debug property is set to true when the Node environment is 'development', enabling debug logs for NextAuth.js.
The session property is an object that configures the session behavior. In this case, the strategy is set to 'jwt', indicating that JSON Web Tokens (JWTs) will be used for session management.
The jwt property is an object that provides the JWT configuration, including the secret property which holds the secret key used to sign and verify JWTs.
The secret property holds the secret key used by NextAuth.js to sign and verify session cookies.*/}