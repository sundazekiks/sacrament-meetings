import { signOutUser } from "@/lib/action";

export default function logout() {
    return (
        <form action={signOutUser} method="POST">
            <button type="submit" className="bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600 transition-colors">
                Sign Out
            </button>
        </form>
    );
}