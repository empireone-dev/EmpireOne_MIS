<?php

namespace App\Http\Controllers;

use App\Models\CompanyForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyFormController extends Controller
{
    public function index()
    {
        $forms = CompanyForm::orderBy('id', 'desc')->get();
        return response()->json([
            'data' => $forms
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'file'  => 'required|file|mimes:pdf|max:51200',
            'title' => 'required|string|max:255',
        ], [
            'file.required'  => 'A PDF file is required.',
            'file.mimes'     => 'Only PDF files are allowed.',
            'file.max'       => 'The file size cannot exceed 50MB.',
            'title.required' => 'A title is required.',
        ]);

        $file     = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $path     = $file->store('company_forms', 'public');

        $form = CompanyForm::create([
            'title'       => $request->title,
            'description' => $request->description,
            'file_path'   => $path,
            'file_name'   => $fileName,
            'uploaded_by' => $request->uploaded_by,
        ]);

        return response()->json([
            'data'    => $form,
            'message' => 'Form uploaded successfully.',
        ], 201);
    }

    public function destroy($id)
    {
        $form = CompanyForm::findOrFail($id);
        Storage::disk('public')->delete($form->file_path);
        $form->delete();

        return response()->json([
            'message' => 'Form deleted successfully.',
        ], 200);
    }
}
