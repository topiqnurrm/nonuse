<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Kelas;

class KelasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Kelas::create([
            'kode_kelas' => 'MTK01',
            'nama_kelas' => 'Matematika Kelas 1'
        ]);
        Kelas::create([
            'kode_kelas' => 'IPA01',
            'nama_kelas' => 'IPA Kelas 1'
        ]);
        Kelas::create([
            'kode_kelas' => 'TIK01',
            'nama_kelas' => 'Teknologi Informasi dan Komunikasi Kelas 1'
        ]);
    }
}