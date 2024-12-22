<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    public function run()
    {
        User::updateOrCreate(
            ['email' => 'admin@gmail.com'], // Kondisi cek email
            [
                'name' => 'Admin',
                'password' => Hash::make('qwe123'),
            ]
        );
    }
}