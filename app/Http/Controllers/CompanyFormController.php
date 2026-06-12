<?php

namespace App\Http\Controllers;

use App\Models\CompanyForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

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
            'title' => 'required|string|max:255',
        ]);

        $file = $request->files->get('file');

        Log::info('CompanyForm upload attempt', [
            'has_file'   => !is_null($file),
            'error_code' => $file ? $file->getError() : 'n/a',
            'is_valid'   => $file ? $file->isValid() : false,
            'file_name'  => $file ? $file->getClientOriginalName() : 'n/a',
        ]);

        if (!$file) {
            return response()->json([
                'message' => 'A file is required.',
                'errors'  => ['file' => ['A file is required.']],
            ], 422);
        }

        if (!$file->isValid()) {
            Log::error('CompanyForm file upload PHP error', [
                'error_code' => $file->getError()
            ]);

            return response()->json([
                'message' => 'The file could not be processed.',
                'errors'  => ['file' => ['The file could not be processed.']],
            ], 422);
        }

        if ($file->getSize() > 104857600) { // 100MB
            return response()->json([
                'message' => 'The file size cannot exceed 100MB.',
                'errors'  => ['file' => ['The file size cannot exceed 100MB.']],
            ], 422);
        }

        $form = CompanyForm::create([
            'title'          => $request->title,
            'description'    => $request->description,
            'file_name'      => $file->getClientOriginalName(),
            'file_type'      => $file->getMimeType(),
            'file_size'      => $file->getSize(),
            'file_data'      => file_get_contents($file->getRealPath()),
            'uploaded_by'    => $request->uploaded_by,
            'folder_id'      => $request->folder_id ?: null,
        ]);

        return response()->json([
            'data'    => $form,
            'message' => 'Form uploaded successfully.',
        ], 201);
    }

    public function view($id)
    {
        $form = CompanyForm::findOrFail($id);

        return response($form->file_data, 200)
            ->header('Content-Type', $form->file_type ?: 'application/octet-stream')
            ->header('Content-Disposition', 'inline; filename="' . addslashes($form->file_name) . '"')
            ->header('Cache-Control', 'private, max-age=3600');
    }

    public function destroy($id)
    {
        $form = CompanyForm::findOrFail($id);
        $form->delete();

        return response()->json([
            'message' => 'Form deleted successfully.',
        ], 200);
    }

    public function updateFolder(Request $request, $id)
    {
        $request->validate([
            'folder_id' => 'nullable|exists:company_form_folders,id',
        ]);

        $form = CompanyForm::findOrFail($id);
        $form->folder_id = $request->folder_id ?: null;
        $form->save();

        return response()->json([
            'data'    => $form,
            'message' => 'Form moved successfully.',
        ], 200);
    }
}
