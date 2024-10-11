import { Heading } from "@/Components/ui/heading";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <MainLayout>
            <AuthenticatedLayout>
                <Head title="Profile" />
                <div className="py-8">
                    <div className="mx-auto space-y-6 max-w-7xl sm:px-6 lg:px-8">
                        <Heading
                            title="Edit Profile"
                            description="Manage your profile"
                        />
                        <div className="p-4 bg-white shadow-md sm:p-8 dark:bg-gray-700 sm:rounded-lg">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="p-4 bg-white shadow-md sm:p-8 dark:bg-gray-700 sm:rounded-lg">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>

                        <div className="p-4 bg-white shadow-md sm:p-8 dark:bg-gray-700 sm:rounded-lg">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </MainLayout>
    );
}
