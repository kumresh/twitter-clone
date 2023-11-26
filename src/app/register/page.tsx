import RegistrationForm from "@/components/forms/register-form";
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
        <RegistrationForm />
        </>
    )
}

export default LoginPage;

