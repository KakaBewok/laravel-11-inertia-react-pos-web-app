import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex flex-col items-center min-h-screen px-10 bg-gray-100 pt-36 sm:justify-center sm:pt-0 dark:bg-gray-900 sm:p-10">
            <div>
                <Link href="/">
                    {/* <ApplicationLogo className="w-20 h-20 text-gray-500 fill-current" /> */}
                    Ini logo Home Roastery
                </Link>
            </div>

            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md dark:bg-gray-800 sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
