<?php

namespace App\Http\Controllers;

use App\Mail\DeclinedContract;
use App\Mail\DeclinedRequirements;
use App\Mail\FinalvEmail;
use App\Models\Applicant;
use App\Models\JobOffer;
use App\Models\PreEmploymentFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class PreEmploymentFileController extends Controller
{
    public function index()
    {
        $preempfile = PreEmploymentFile::orderBy('id', 'desc')->get();
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
            PreEmploymentFile::create([
                'app_id' => $request->app_id,
                'reqs' => $request->reqs,
                'reqs_img' => $url,
                'status' => $request->status,
                'reas' => $request->reas,
                'created' => $request->created,

            ]);

            if ($request->reqs == 'Contract') {
                $jo = JobOffer::where([
                    ['app_id', '=', $request->app_id],
                    ['status', '=', 'Contract Signing']
                ])->first();
                if ($jo) {
                    $jo->update([
                        'status' => 'Hired',
                    ]);
                }
            }
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

    public function reupload_file(Request $request)
    {
        $preempfile = PreEmploymentFile::where('id', $request->id)->first();
        $applicant = Applicant::where('app_id', $request->app_id)->first();
        $job_offer = JobOffer::where('id', $request->id)->first();
        if (!$preempfile) {
            return response()->json(['error' => 'File not found'], 404);
        }
        if ($request->status == 'Approved') {
            if ($preempfile) {
                $preempfile->update([
                    'status' => $request->status,
                ]);
            }
        } else  if ($request->status !== 'Declined') {
            if ($request->hasFile('file')) {
                $uploadedFile = $request->file('file');
                $path = $uploadedFile->store(date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);

                if ($preempfile) {
                    $preempfile->update([
                        'status' => $request->status,
                        'reas' => $request->reas,
                        'reqs_img' => $url,
                    ]);
                }
            }
        } else if ($request->status === 'Declined') {

            if ($request->hasFile('file')) {
                $uploadedFile = $request->file('file');
                $path = $uploadedFile->store(date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);

                if ($preempfile) {
                    $preempfile->update([
                        'status' => 'Uploaded',
                        'reas' => '',
                        'reqs_img' => $url,
                    ]);
                }
            } else {
                if ($preempfile) {
                    $preempfile->update([
                        'status' => 'Declined',
                        'reas' => $request->reas,
                    ]);

                    $data = array_merge($preempfile->toArray(), $applicant->toArray(), $request->all());
                    $data['reason'] = $request->reas;
                    $data['reqs'] = $request->reqs;
                    $data['job_offer_id'] = $request->job_offer_id;

                    Mail::to($applicant->email)->send(new DeclinedRequirements($data));
                }
            }
        }


        if ($request->reqs == 'Contract' && $request->status != 'Declined') {
            $jo = JobOffer::where([
                ['app_id', '=', $request->app_id],
                ['status', '=', 'Contract Signing'],
            ])->first();
            if ($jo) {
                $jo->update([
                    'status' => 'Hired'
                ]);
            }
        } else if ($request->reqs == 'Contract' && $request->status == 'Declined') {
            if ($applicant) {
                $data = array_merge($job_offer->toArray(), $applicant->toArray(), $request->all());
                $data['reason'] = $request->reas;
                $data['site'] = $request->site;
                $data['job_offer_id'] = $request->job_offer_id;
                Mail::to($request->email)->send(new DeclinedContract($data));
            }
        }

        return response()->json([
            'waa',
            $request->hasFile('file'),
            'data' => $this->index()->original['data']
        ], 200);
    }
    public function update(Request $request, $id)
    {
        // $preempfile = PreEmploymentFile::where('id', $request->id)->first();

        // if (!$preempfile) {
        //     return response()->json(['error' => 'File not found'], 404);
        // }
        // if ($request->status !== 'Declined') {
        //     // $preempfile->update([
        //     //     'status' => $request->status,
        //     //     'reas' => $request->reas,
        //     // ]);

        // } elseif ($request->status === 'Declined') {
        //     $defaultReason = 'blurred contract';
        //     $reas = $request->reas ?: $defaultReason;

        //     if ($request->hasFile('file')) {
        //         $uploadedFile = $request->file('file');
        //         $path = $uploadedFile->store(date("Y"), 's3');
        //         $url = Storage::disk('s3')->url($path);

        //         $preempfile->update([
        //             'status' => 'Uploaded',
        //             'reas' => '',
        //             'reqs_img' => $url,
        //         ]);
        //     } else {
        //         $preempfile->update([
        //             'status' => 'Declined',
        //             'reas' => $reas,
        //         ]);
        //     }
        // }


        // if ($request->reqs == 'Contract' && $request->status != 'Declined') {
        //     $jo = JobOffer::where([
        //         ['app_id', '=', $request->app_id],
        //         ['status', '=', 'Contract Signing'],
        //     ])->first();
        //     $jo->update([
        //         'status' => 'Hired'
        //     ]);
        // } else if ($request->reqs == 'Contract' && $request->status == 'Declined') {
        //     Mail::to($request->email)->send(new DeclinedContract($request->all()));
        // }

        // return response()->json([
        //     'data' => $this->index()->original['data']
        // ], 200);
    }
}
