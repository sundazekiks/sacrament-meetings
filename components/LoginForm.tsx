"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function LoginForm({ onSubmit }: { onSubmit: (formData: FormData) => Promise<{ success: boolean; message?: string } | undefined> }) {
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();
    async function handleSubmit(formData: FormData) {
        const result: { success: boolean; message?: string } | undefined = await onSubmit(formData);
        console.log("Login result:", result);

        if (!result?.success) {
            // Handle error (e.g., show a message to the user)
            console.log(result);
            setError(true);
            setErrorMessage("Invalid username or password. Please try again.");
            return;
        }
        // Redirect to the desired page after successful login
        router.push("/");
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-100">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
                    <p className="mt-1 text-sm text-gray-500">Sign in to your account</p>
                </div>
                {error && (
                    <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                        {errorMessage || "An error occurred. Please try again."}
                    </p>
                )}

                <form action={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            autoComplete="username"
                            required
                            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            className="rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 active:scale-[0.98]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}