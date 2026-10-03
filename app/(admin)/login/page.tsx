import { signInUser } from "@/lib/action";



export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold mb-4">Admin Login</h1>
            <form action={signInUser} className="flex flex-col gap-4 w-full max-w-sm">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white rounded px-3 py-2 hover:bg-blue-600 transition-colors"
                >
                    Login
                </button>
            </form>
        </div>
    );
}