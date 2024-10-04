<?php

namespace App\Http\Controllers;

use App\Models\PreEmploymentFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PreEmploymentFileController extends Controller
{
    public function index(){
        $preempfile = PreEmploymentFile::get();
        return response()->json([
            'data' => $preempfile
        ], 200);
    }


    public function store(Request $request)
    {

        if ($request->hasFile('file')) {
            $uploadedFile = $request->file('file');

            // Store the file on S3 and retrieve the path
            $path = $uploadedFile->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);

            // Optionally, you can save the URL or file info to the database here
            // PreEmploymentFile::create([
            //     'app_id' => $request->app_id,
            //     'reqs' => $request->reqs,
            //     'reqs_img' => $url,
            //     'status' => $request->status,
            //     'reas' => $request->reas,
            //     'created' => $request->created,

            // ]);
            return response()->json([
                'data' => 'success',
                'url' => $url, // Return the URL of the uploaded file,
                'path' => $path
            ], 200);
        }

        return response()->json([
            'data' => 'No file uploaded'
        ], 400);
    }

    public function update(Request $request, $id){
        $preempfile = PreEmploymentFile::find($id);
        $preempfile->update([
            'status'=>$request->status,
            'reas'=>$request->reas,
        ]);

        return response()->json([
            'data' => $this->index()->original['data']
        ], 200);
    }
}
