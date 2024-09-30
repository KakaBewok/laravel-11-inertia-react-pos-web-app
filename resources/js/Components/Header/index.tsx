import DropdownUser from "./DropdownUser";
import LogoIcon from "../../images/logo/logo-icon.svg";
import DarkModeSwitcher from "./DarkModeSwitcher";

interface HeaderProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {
    return (
        <header className="sticky top-0 z-40 flex w-full bg-slate-100 drop-shadow-sm dark:bg-slate-700 dark:drop-shadow-none">
            <div className="flex items-center justify-between flex-grow px-4 py-4 shadow-2 md:px-6 2xl:px-11">
                <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls="sidebar"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSidebarOpen(!sidebarOpen);
                        }}
                        className="z-50 block rounded-sm border border-stroke bg-white dark:bg-slate-800 p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
                    >
                        <span className="relative block w-6 h-6 cursor-pointer">
                            <span className="absolute right-0 w-full h-full">
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-slate-600 delay-[0] duration-200 ease-in-out dark:bg-white ${
                                        !sidebarOpen && "!w-full delay-300"
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-slate-600 delay-150 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarOpen && "delay-400 !w-full"
                                    }`}
                                ></span>
                                <span
                                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-slate-600 delay-200 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarOpen && "!w-full delay-500"
                                    }`}
                                ></span>
                            </span>
                            <span className="absolute right-0 w-full h-full rotate-45">
                                <span
                                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                                        !sidebarOpen && "!h-0 !delay-[0]"
                                    }`}
                                ></span>
                                <span
                                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                                        !sidebarOpen && "!h-0 !delay-200"
                                    }`}
                                ></span>
                            </span>
                        </span>
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}
                </div>

                <DarkModeSwitcher className="hidden lg:block" />

                <div className="flex gap-5">
                    <DarkModeSwitcher className="block lg:hidden" />
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
