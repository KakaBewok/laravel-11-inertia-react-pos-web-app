import { Link, InertiaLinkProps } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function NavLink({
    active = false,
    setLoading,
    url,
    className = "",
    children,
    ...props
}: InertiaLinkProps & {
    active?: boolean;
    setLoading: (arg: boolean) => void;
    url: string;
}) {
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setLoading(true);

        router.get(
            route(url),
            {},
            {
                onFinish: () => setLoading(false),
            }
        );
    };

    return (
        <Link
            {...props}
            onClick={handleClick}
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
