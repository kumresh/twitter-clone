import LoginForm from "@/components/forms/LoginForm";
import { authOptions } from "@/lib/auth";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

const LoginPage = async () => {
    const session = await getServerSession(authOptions);
    
    if (session){
        redirect("/")
    }

    return (
        <>
        <LoginForm />
        </>
    )
}

export default LoginPage;

