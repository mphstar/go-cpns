<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        return inertia('Admin/Users/Index');
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required',
            'level' => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        // create user
        $request['password'] = bcrypt($request->password);
        $request['role'] = $request->level;
        $user = User::create($request->all());

        return response()->json([
            'message' => 'User created successfully',
            'user' => $user
        ], 201);
    }

    public function getData(Request $request)
    {
        $users = User::query()->latest();

        if ($request->has('search') && $request->search != '') {
            $users->where('name', 'like', '%' . $request->search . '%');
        }

        if ($request->has('filter') && $request->filter != '' && $request->filter != 'all') {
            $users->where('role', $request->filter);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Successfully get data',
            'result' => $users->paginate(5)
        ], 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email,' . $request->id,
            'level' => 'required|in:admin,user',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $user = User::find($request->id);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->level;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'User updated successfully',
            'result' => $user
        ], 200);
    }

    public function delete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => "Validation error",
                'errors' => $validator->errors()->first()
            ], 422);
        }

        $user = User::find($request->id);
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'User deleted successfully',
        ], 200);
    }
}
