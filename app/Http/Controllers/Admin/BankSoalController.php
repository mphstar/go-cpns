<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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
}
