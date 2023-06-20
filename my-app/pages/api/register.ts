import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt';

import prisma from "@/libs/prismadb";

{/* Remember that handle is an API handler : an API route handler is a function that defines how the server
 responds to incoming HTTP requests to a specific API endpoint. */}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method != 'POST') {
        return res.status(405).end();
    }

    try {
        const {email, username, name, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                name,
                hashedPassword
            }
        });

        return res.status(200).json(user);
    } catch (error){
        console.log(error);
        return res.status(400).end();
    }
   
}