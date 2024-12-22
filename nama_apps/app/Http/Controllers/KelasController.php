<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kelas;
use Illuminate\Support\Facades\Validator;

class KelasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // // Mengambil semua data kelas dari database
        // $dataKelas = Kelas::all(); // Atau bisa menggunakan Kelas::paginate(10); untuk paginasi

        // // Menggunakan dd untuk menampilkan data
        // dd($dataKelas);

        // // Mengambil semua data kelas dari database
        // $dataKelas = Kelas::all(); // Atau bisa menggunakan Kelas::paginate(10); untuk paginasi
        // $this->data['kelas'] = $dataKelas;

        // // Menggunakan dd untuk menampilkan data
        // return view('kelas.index', $this);

        // Mengambil semua data kelas dari database
        $dataKelas = Kelas::all(); // Atau bisa menggunakan Kelas::paginate(10); untuk paginasi

        // Mengirim data ke view dalam bentuk array
        return view('kelas.index', ['kelas' => $dataKelas]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('kelas.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'kode_kelas' => 'required|unique:kelas,kode_kelas',
            'nama_kelas' => 'required|string'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        Kelas::create([
            'kode_kelas' => $request->kode_kelas,
            'nama_kelas' => $request->nama_kelas,
        ]);

        return redirect()->route('kelas.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = Kelas::where('id', $id)->first(); //cara 1
        // $data = Kelas::find($id); //cara 2
        $this->data['kelas'] = $data;

        // dd($data);
        return view('kelas.show',$this->data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $this->data['kelas'] = Kelas::where('id', $id)->first();

        return view('kelas.edit', $this->data);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'kode_kelas' => 'required|unique:kelas,kode_kelas,' . $id,
            'nama_kelas' => 'required|string'
        ]);

        if ($validator->fails()) {
            return redirect()->back()
                ->withErrors($validator)
                ->withInput();
        }

        Kelas::where('id', $id)->update([
            'kode_kelas' => $request->kode_kelas,
            'nama_kelas' => $request->nama_kelas,
        ]);

        return redirect()->route('kelas.index');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $kelas = Kelas::where('id', $id)->first();
        $kelas->delete();

        return redirect()->route('kelas.index');
    }
}