import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
            <div className="items-center justify-center hidden md:flex bg-gradient-to-r from-blue-500 via-purple-500 to-pink-400">
                <div className="text-center text-white lg:text-left lg:px-20">
                    <h1 className="text-5xl font-bold">Welcome back!</h1>
                    <p className="py-6">
                        Effortless Sales Management, Right at Your Fingertips{" "}
                        <br />
                        Streamline your operations with our powerful POS system.
                    </p>
                </div>
            </div>

            <div className="flex flex-col items-center min-h-screen px-10 pt-36 sm:justify-center sm:pt-0 sm:p-10 bg-gradient-to-l from-slate-600 via-slate-700 to-slate-800">
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-gray-800 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
