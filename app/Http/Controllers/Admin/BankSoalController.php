<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BankSoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BankSoalController extends Controller
{
    public function index()
    {
        return inertia('Admin/BankSoal/Index');
    }

    public function create()
    {
        return inertia('Admin/BankSoal/CreateSoal');
    }

    public function getData(Request $request)
    {
        $data = BankSoal::query()->latest();

        if ($request->has('search') && $request->search != '') {
            $data->where('judul', 'like', '%' . $request->search . '%');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully get data',
            'result' => $data->paginate(5)
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'judul' => 'required|max:100',
            'jenis_soal' => 'required|in:bela_negara,pilar_negara',
            'waktu_pengerjaan' => 'required|integer',
            'status' => 'required|in:aktif,tidak_aktif',
            'batas_nilai_twk' => 'required|integer',
            'batas_nilai_tiu' => 'required|integer',
            'batas_nilai_tkp' => 'required|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        // create bank soal
        $bankSoal = BankSoal::create($request->all());

        return response()->json([
            'message' => 'Bank Soal created successfully',
            'data' => $bankSoal
        ], 201);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:bank_soal,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $user = BankSoal::find($request->id);
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
