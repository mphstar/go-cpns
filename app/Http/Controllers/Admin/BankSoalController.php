<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BankSoal;
use App\Models\DetailJawaban;
use App\Models\DetailSoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Facades\Image;

class BankSoalController extends Controller
{
    private function createFolder($path)
    {
        if (!file_exists($path)) {
            try {
                mkdir($path, 0777, true);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }

    private function deleteFile($path)
    {
        if (file_exists($path)) {
            try {
                unlink($path);
            } catch (\Throwable $th) {
                //throw $th;
            }
        }
    }

    public function deleteSoal(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:detail_bank_soal,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $data = DetailSoal::find($request->id);

        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data deleted successfully',
        ], 200);
    }

    public function updateSoal(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'soal' => 'required',
            'jawaban' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $result_jawaban = json_decode($request->jawaban, true);

        if ($request->id == 0) {
            $data = new DetailSoal;
            $data->bank_soal_id = $request->bank_soal_id;
        } else {
            $data = DetailSoal::find($request->id);
        }

        $data->soal = $request->soal;

        $data->tipe_soal = $request->tipe_soal;

        if ($request->gambar_soal == null) {
            $this->deleteFile(public_path('uploads/soal') . "/" . $data->gambar_soal);
            $data->gambar_soal = null;
        }

        if ($request->hasFile('gambar_soal')) {

            $this->deleteFile(public_path('uploads/soal') . "/" . $data->gambar_soal);

            $gambar_soal = $request->file('gambar_soal');

            $image_name = time() . '.' . $gambar_soal->getClientOriginalExtension();


            $this->createFolder(public_path('uploads/soal/'));

            $path = public_path('uploads/soal/') . "/" . $image_name;

            Image::make($gambar_soal->getRealPath())->resize(700, null, function ($constraint) {
                $constraint->aspectRatio();
            })->save($path);

            $data->gambar_soal = $image_name;
        }

        $data->save();

        foreach ($result_jawaban as $key => $value) {

            if ($request->id == 0) {
                $jawaban = new DetailJawaban;
                $jawaban->detail_bank_soal_id = $data->id;
                $jawaban->opsi = $value['option'];
            } else {
                $jawaban = DetailJawaban::find($value['id_jawaban']);
            }

            $jawaban->jawaban = $value['jawaban'];
            $jawaban->nilai = $value['score'] == "" ? 0 : $value['score'];

            if ($jawaban->opsi == 'A') {
                if ($request->gambar_jawaban_A == null) {
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);
                    $jawaban->gambar_jawaban = null;
                }

                if ($request->hasFile('gambar_jawaban_A')) {

                    // cek jika ada gambar di storage maka hapus terlebih dahulu
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);

                    $gambar_jawaban = $request->file('gambar_jawaban_A');
                    $image_name = time() . '.' . $gambar_jawaban->getClientOriginalExtension();

                    $this->createFolder(public_path('uploads/jawaban/'));

                    $path = public_path('uploads/jawaban/') . "/" . $image_name;

                    Image::make($gambar_jawaban->getRealPath())->resize(700, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($path);

                    $jawaban->gambar_jawaban = $image_name;
                }
            }

            if ($jawaban->opsi == 'B') {
                if ($request->gambar_jawaban_B == null) {
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);
                    $jawaban->gambar_jawaban = null;
                }

                if ($request->hasFile('gambar_jawaban_B')) {

                    // cek jika ada gambar di storage maka hapus terlebih dahulu
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);

                    $gambar_jawaban = $request->file('gambar_jawaban_B');
                    $image_name = time() . '.' . $gambar_jawaban->getClientOriginalExtension();

                    $this->createFolder(public_path('uploads/jawaban/'));

                    $path = public_path('uploads/jawaban/') . "/" . $image_name;

                    Image::make($gambar_jawaban->getRealPath())->resize(700, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($path);

                    $jawaban->gambar_jawaban = $image_name;
                }
            }

            if ($jawaban->opsi == 'C') {
                if ($request->gambar_jawaban_C == null) {
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);
                    $jawaban->gambar_jawaban = null;
                }

                if ($request->hasFile('gambar_jawaban_C')) {

                    // cek jika ada gambar di storage maka hapus terlebih dahulu
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);

                    $gambar_jawaban = $request->file('gambar_jawaban_C');
                    $image_name = time() . '.' . $gambar_jawaban->getClientOriginalExtension();

                    $this->createFolder(public_path('uploads/jawaban/'));

                    $path = public_path('uploads/jawaban/') . "/" . $image_name;

                    Image::make($gambar_jawaban->getRealPath())->resize(700, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($path);

                    $jawaban->gambar_jawaban = $image_name;
                }
            }

            if ($jawaban->opsi == 'D') {
                if ($request->gambar_jawaban_D == null) {
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);
                    $jawaban->gambar_jawaban = null;
                }

                if ($request->hasFile('gambar_jawaban_D')) {

                    // cek jika ada gambar di storage maka hapus terlebih dahulu
                    $this->deleteFile(public_path('uploads/jawaban') . "/" . $jawaban->gambar_jawaban);

                    $gambar_jawaban = $request->file('gambar_jawaban_D');
                    $image_name = time() . '.' . $gambar_jawaban->getClientOriginalExtension();

                    $this->createFolder(public_path('uploads/jawaban/'));

                    $path = public_path('uploads/jawaban/') . "/" . $image_name;

                    Image::make($gambar_jawaban->getRealPath())->resize(700, null, function ($constraint) {
                        $constraint->aspectRatio();
                    })->save($path);

                    $jawaban->gambar_jawaban = $image_name;
                }
            }

            $jawaban->save();
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Data updated successfully',
            'data' => $data
        ], 200);
    }

    public function getSoal(Request $request)
    {

        $data = DetailSoal::with(['jawaban'])->where('id', $request->id_soal)->first();


        return response()->json([
            'status' => 'success',
            'message' => 'Successfully get data',
            'result' => $data
        ], 200);
    }

    public function index()
    {
        return inertia('Admin/BankSoal/Index');
    }

    public function create($id)
    {
        $data = BankSoal::with(['soal.jawaban'])->where('id', $id)->first();

        if (!$data) {
            return redirect()->route('admin.bank-soal');
        }


        return inertia('Admin/BankSoal/CreateSoal', [
            'data' => $data
        ]);
    }

    public function getData(Request $request)
    {
        $data = BankSoal::query()->latest();

        $data->with(['soal']);

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

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id_bank_soal' => 'required|exists:bank_soal,id',
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

        $bankSoal = BankSoal::find($request->id_bank_soal);

        // filter request
        $data = $request->except('id_bank_soal');
        $bankSoal->update($data);

        return response()->json([
            'message' => 'Bank Soal updated successfully',
            'data' => $bankSoal
        ], 200);
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
