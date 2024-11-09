<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create permissions
        $permissions = [
            'manage categories',
            'manage products',
            'manage payment_methods',
            'manage expenses',
            'manage orders'
        ];
        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                [
                    'name' => $permission
                ]
            );
        }

        // create roles
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);

        // give permission to roles
        $adminRole->syncPermissions('manage orders');

        //create super_admin user
        $superAdminUser = User::create([
            'name' => 'Super Admin',
            'email' => 'super.admin@gmail.com',
            'password' => bcrypt('superadmin')
        ]);
        $superAdminUser->assignRole($superAdminRole);

        //create admin user
        $adminUser = User::create([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('adminadmin')
        ]);
        $adminUser->assignRole($adminRole);
    }
}
