<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Materi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MateriController extends Controller
{
    public function index()
    {
        return inertia('Admin/Materi/Index');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'file' => 'required|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $data = new Materi;
        $data->name = $request->name;

        // save file to public path
        $file = $request->file('file');

        // buat folder uploads/materi jika tidak ada
        if (!file_exists(public_path('uploads/materi'))) {
            mkdir(public_path('uploads/materi'), 0777, true);
        }

        // rename file random
        $filename = time() . '-' . $file->getClientOriginalExtension();
        $file->move(public_path('uploads/materi'), $filename);

        $data->file = $filename;
        $data->save();

        return response()->json([
            'message' => 'Data created successfully',
            'data' => $data
        ], 201);
    }

    public function getData(Request $request)
    {
        $data = Materi::query()->latest();

        if ($request->has('search') && $request->search != '') {
            $data->where('name', 'like', '%' . $request->search . '%');
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully get data',
            'result' => $data->paginate(5)
        ], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'file' => 'file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $data = Materi::find($request->id);


        $data->name = $request->name;

        if ($request->hasFile('file')) {
            // save file to public path
            $file = $request->file('file');

            // buat folder uploads/materi jika tidak ada
            if (!file_exists(public_path('uploads/materi'))) {
                mkdir(public_path('uploads/materi'), 0777, true);
            }

            // hapus file lama
            if (file_exists(public_path('uploads/materi/' . $data->file))) {
                unlink(public_path('uploads/materi/' . $data->file));
            }

            // rename file random
            $filename = time() . '-' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/materi'), $filename);

            $data->file = $filename;
        }
        $data->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Data updated successfully',
            'result' => $data
        ], 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:materi,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $data = Materi::find($request->id);

        // hapus file
        if (file_exists(public_path('uploads/materi/' . $data->file))) {
            unlink(public_path('uploads/materi/' . $data->file));
        }

        $data->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Data deleted successfully',
        ], 200);
    }
}
