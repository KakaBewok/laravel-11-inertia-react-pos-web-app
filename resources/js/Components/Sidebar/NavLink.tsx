import { Link, InertiaLinkProps } from "@inertiajs/react";

export default function NavLink({
    active = false,
    className = "",
    children,
    ...props
}: InertiaLinkProps & { active: boolean }) {
    return (
        <Link
            {...props}
            className={
                "group relative flex items-center gap-3 rounded-sm py-2 px-4 font-medium text-slate-300 duration-200 ease-in-out hover:bg-slate-700 " +
                (active ? "bg-slate-700 dark:bg-slate-700" : "") +
                className
            }
        >
            {children}
        </Link>
    );
}
