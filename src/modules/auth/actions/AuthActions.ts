import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';
import { redirect } from "next/navigation";
import AuthService from "../services/AuthSercice";

const prisma = new PrismaClient

async function createAccount(formData: FormData) {

    'use server';

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.users.create({
        data: {
            name, email, password: hashPassword,
        },
    });

    redirect('/portal/login');
}
async function Login(formData: FormData) {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await prisma.users.findFirst({
        where: { email, }
    });

    if (!user) {
        console.log("Erro!")
        redirect('/portal/login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        console.log("Usuario ou senha invalidos!")
        redirect('/portal/login');
    }

    await AuthService.createSessionToken({ name: user.name, email: user.email })

    redirect("/portal")

}

const AuthActions = {
    createAccount,
    Login,
};

export default AuthActions;