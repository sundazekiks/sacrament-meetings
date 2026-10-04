import LoginForm from "@/components/LoginForm";
import { signInUser } from "@/lib/action";


export default function LoginPage() {

    return (<LoginForm onSubmit={signInUser} />);
}