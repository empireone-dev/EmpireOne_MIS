<?php

use App\Http\Controllers\PrintCoeController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('redirectBasedOnRole')->get('/', function () {
    return Inertia::render('login/page');
})->name('login.page');

Route::middleware('redirectBasedOnRole')->get('/login/change_password', function () {
    return Inertia::render('login/change_password/page');
})->name('login.change_password.page');

Route::get('/confirmation/{app_id}/{iffdate}/{ifftime}/{meet_link?}', function ($app_id, $iffdate, $ifftime, $meet_link = null) {
    $meetLink = $meet_link ? base64_decode($meet_link) : null;

    return Inertia::render('confirmation/page', [
        'appId' => $app_id,
        'date' => $iffdate,
        'time' => $ifftime,
        'meetLink' => $meetLink,
    ]);
});

Route::get('/final/{app_id}/{iffdate}/{ifftime}/{meet_link?}', function ($app_id, $iffdate, $ifftime, $meet_link = null) {
    $meetLink = $meet_link ? base64_decode($meet_link) : null;

    return Inertia::render('final/page', [
        'appId' => $app_id,
        'date' => $iffdate,
        'time' => $ifftime,
        'meetLink' => $meetLink,
    ]);
});


Route::get('/online_application', function () {
    return Inertia::render('online_application/page');
});

Route::get('/video', function () {
    return Inertia::render('video/page');
});
Route::get('/video_quiz/{type}', function () {
    return Inertia::render('video_quiz/page');
});



Route::get('/onboarding-documents/{app_id}', function () {
    return Inertia::render('onboarding-documents/page');
});

Route::get('/pre-employment/{app_id}/{site}', function () {
    return Inertia::render('pre-employment/page');
});
Route::get('/virtual-contract/{app_id}', function () {
    return Inertia::render('virtual-contract/page');
});
// Route::get('/exit_interview/{app_id}', function () {
//     return Inertia::render('exit_interview/page');
// });
// Route::get('/exit_clearance/{app_id}', function () {
//     return Inertia::render('exit_clearance/page');
// });
Route::get('/print_coe/{app_id}', function () {
    return Inertia::render('print_coe/page');
});

Route::prefix('job_offer')->group(function () {
    Route::get('/{app_id}/{site}', function () {
        return Inertia::render('job_offer/page');
    });
    Route::get('/confirmation', function () {
        return Inertia::render('job_offer/confirmation/page');
    });
});


// admin = 1
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::get('/initial_rate/{app_id}', function () {
        return Inertia::render('admin/initial_rate/page');
    });
    Route::get('/initial_result/{app_id}', function () {
        return Inertia::render('admin/initial_result/page');
    });
    Route::get('/final_rate/{app_id}', function () {
        return Inertia::render('admin/final_rate/page');
    });
    Route::get('/overall_result/{app_id}', function () {
        return Inertia::render('admin/overall_result/page');
    });
    Route::get('/interviewer_sched', function () {
        return Inertia::render('admin/interviewer_sched/page');
    });

    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });

    Route::get('/file_201/{app_id}/{jobPos}/{salary}/{allowance}', function () {
        return Inertia::render('admin/file_201/page');
    });

    Route::get('/file_201/{app_id}', function () {
        return Inertia::render('admin/file_201/page');
    });

    Route::get('/exit_interview/{app_id}', function () {
        return Inertia::render('admin/exit_interview/page');
    });

    Route::get('/exit_clearance/{app_id}', function () {
        return Inertia::render('admin/exit_clearance/page');
    });

    Route::prefix('sourcing')->group(function () {

        Route::get('/department', function () {
            return Inertia::render('admin/sourcing/department/page');
        });
        Route::prefix('job_title_section')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/sourcing/job_title_section/page');
            });
            Route::get('/job_analysis/{ref_id}', function () {
                return Inertia::render('admin/sourcing/job_title_section/job_analysis/page');
            });
            Route::get('/job_description/{ref_id}', function () {
                return Inertia::render('admin/sourcing/job_title_section/job_description/page');
            });
        });

        Route::prefix('erf_record')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/sourcing/resource_requests/erf_record/page');
            });

            Route::get('/new_position', function () {
                return Inertia::render('admin/sourcing/resource_requests/new_position/page');
            });
            Route::get('/existing_position', function () {
                return Inertia::render('admin/sourcing/resource_requests/existing_position/page');
            });
            Route::get('/approved_erf', function () {
                return Inertia::render('admin/sourcing/resource_requests/approved_erf/page');
            });
            Route::get('/declined_erf', function () {
                return Inertia::render('admin/sourcing/resource_requests/declined_erf/page');
            });
            //         Route::get('/erf_job_analysis', function () {
            //             return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_analysis/page');
            //         });
            //         Route::get('/erf_job_description', function () {
            //             return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_description/page');
            //         });
        });
        // Route::prefix('resource_requests')->group(function () {
        //     Route::prefix('erf_record')->group(function () {
        //         Route::get('/', function () {
        //             return Inertia::render('admin/sourcing/resource_requests/page');
        //         });
        //         Route::get('/erf_job_analysis', function () {
        //             return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_analysis/page');
        //         });
        //         Route::get('/erf_job_description', function () {
        //             return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_description/page');
        //         });
        //     });
        //     Route::get('/new_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/new_position/page');
        //     });
        //     Route::get('/existing_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/existing_position/page');
        //     });
        //     Route::get('/approved_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/approved_erf/page');
        //     });
        //     Route::get('/declined_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/declined_erf/page');
        //     });
        // });

        // Route::prefix('resource_requests')->group(function () {
        //     Route::get('/erf_record', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/erf_record/page');
        //     });
        //     Route::get('/new_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/new_position/page');
        //     });
        //     Route::get('/existing_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/existing_position/page');
        //     });
        //     Route::get('/approved_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/approved_erf/page');
        //     });
        //     Route::get('/declined_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/declined_erf/page');
        //     });
        // });

        // Route::prefix('resource_requests')->group(function () {
        //     Route::get('/erf_record', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/erf_record/page');
        //     });
        //     Route::get('/new_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/new_position/page');
        //     });
        //     Route::get('/existing_position', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/existing_position/page');
        //     });
        //     Route::get('/approved_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/approved_erf/page');
        //     });
        //     Route::get('/declined_erf', function () {
        //         return Inertia::render('admin/sourcing/resource_requests/declined_erf/page');
        //     });
        // });
    });

    Route::prefix('recruitment')->group(function () {
        Route::get('/guide_question', function () {
            return Inertia::render('admin/recruitment/guide_question/page');
        });

        Route::get('/applicant_records', function () {
            return Inertia::render('admin/recruitment/applicants/applicant_records/page');
        });
        // Route::prefix('applicants')->group(function () {
        //     Route::get('/applicant_records', function () {
        //         return Inertia::render('admin/recruitment/applicants/applicant_records/page');
        //     });
        //     Route::get('/pendings', function () {
        //         return Inertia::render('admin/recruitment/applicants/pendings/page');
        //     });
        //     Route::get('/initial', function () {
        //         return Inertia::render('admin/recruitment/applicants/initial/page');
        //     });
        //     Route::get('/final', function () {
        //         return Inertia::render('admin/recruitment/applicants/final/page');
        //     });
        //     Route::get('/passed', function () {
        //         return Inertia::render('admin/recruitment/applicants/passed/page');
        //     });
        //     Route::get('/failed', function () {
        //         return Inertia::render('admin/recruitment/applicants/failed/page');
        //     });
        //     Route::get('/{slug}/{id}', function () {
        //         return Inertia::render('admin/recruitment/applicants/id/page');
        //     });
        // });
    });
    Route::prefix('hiring')->group(function () {
        Route::get('/pre_employment', function () {
            return Inertia::render('admin/hiring/pre_employment/page');
        });
        Route::get('/hiring_section', function () {
            return Inertia::render('admin/hiring/hiring_section/page');
        });
        Route::get('/{id}', function () {
            return Inertia::render('admin/hiring/id/page');
        });
    });
    Route::prefix('onboarding')->group(function () {
        Route::prefix('onboarding_docu')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/onboarding/onboarding_docu/page');
            });
            Route::get('/view_docu/{id}', function () {
                return Inertia::render('admin/onboarding/onboarding_docu/view_docu/page');
            });
            Route::get('/edit_docu/{id}', function () {
                return Inertia::render('admin/onboarding/onboarding_docu/edit_docu/page');
            });
        });
        Route::get('/acknowledgement', function () {
            return Inertia::render('admin/onboarding/acknowledgement/page');
        });
    });

    Route::prefix('employee_relation')->group(function () {
        Route::prefix('/employee_section')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/employee_relation/employee_section/page');
            });
            Route::get('/update_employee/{app_id}', function () {
                return Inertia::render('admin/employee_relation/employee_section/update_employee/page');
            });
        });
        Route::get('/upload_memo', function () {
            return Inertia::render('admin/employee_relation/upload_memo/page');
        });
    });

    Route::prefix('employee_wellness')->group(function () {
        Route::get('/medicine_records', function () {
            return Inertia::render('admin/employee_wellness/medicine_records/page');
        });
        Route::prefix('employee_health_data')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/employee_wellness/employee_health_data/page');
            });
            Route::get('/employee_med_form', function () {
                return Inertia::render('admin/employee_wellness/employee_health_data/employee_med_form/page');
            });
            Route::get('/employee_acquire_medicine', function () {
                return Inertia::render('admin/employee_wellness/employee_health_data/employee_acquire_medicine/page');
            });
        });
    });

    Route::prefix('attrition')->group(function () {
        Route::get('/attrition_section', function () {
            return Inertia::render('admin/attrition/attrition_section/page');
        });
    });

    Route::prefix('compliance')->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/compliance/page');
        });
        Route::get('/{id}', function () {
            return Inertia::render('admin/compliance/id/page');
        });
    });

    Route::prefix('coaching_logs')->group(function () {
        Route::get('/', function () {
            return Inertia::render('admin/coaching_logs/page');
        });
        Route::get('/{id}', function () {
            return Inertia::render('admin/coaching_logs/id/page');
        });
    });

    Route::prefix('engagement_section')->group(function () {
        Route::get('/engagement_dashboard', function () {
            return Inertia::render('admin/engagement_section/engagement_dashboard/page');
        });
        Route::prefix('calendar_activities')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/engagement_section/calendar_activities/page');
            });
            Route::get('/all_events_rate', function () {
                return Inertia::render('admin/engagement_section/calendar_activities/all_events_rate/page');
            });
        });
        Route::get('/emart', function () {
            return Inertia::render('admin/engagement_section/emart/page');
        });
    });

    Route::get('/ceo_section', function () {
        return Inertia::render('admin/ceo_section/page');
    });





    Route::get('/profile', function () {
        return Inertia::render('admin/profile/page');
    });
});

// // HR = 2
// Route::middleware('auth:sanctum', 'role:2')->prefix('hr')->group(function () {});
// // IT = 3
// Route::middleware('auth:sanctum', 'role:3')->prefix('it')->group(function () {});
// // IT = 4
// Route::middleware('auth:sanctum', 'role:4')->prefix('accounting')->group(function () {});
// // manager =5
// Route::prefix('manager', 'role:5')->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('managers/dashboard/page');
//     });
//     Route::get('/attrition', function () {
//         return Inertia::render('managers/attrition/page');
//     });
//     Route::get('/employee_relation', function () {
//         return Inertia::render('managers/employee_relation/page');
//     });
//     Route::get('/engagement_section', function () {
//         return Inertia::render('managers/engagement_section/page');
//     });
//     Route::get('/profile', function () {
//         return Inertia::render('managers/profile/page');
//     });
//     Route::get('/recruitment', function () {
//         return Inertia::render('managers/recruitment/page');
//     });
//     Route::get('/sourcing', function () {
//         return Inertia::render('managers/sourcing/page');
//     });
// });
// // engagement = 6
// Route::prefix('engagement', 'role:6')->group(function () {
//     Route::get('/dashboard', function () {
//         return Inertia::render('engagement/dashboard/page');
//     });
//     Route::get('/employee_relation', function () {
//         return Inertia::render('engagement/employee_relation/page');
//     });
//     Route::get('/employee_wellness', function () {
//         return Inertia::render('engagement/employee_wellness/page');
//     });
//     Route::get('/engagement_section', function () {
//         return Inertia::render('engagement/engagement_section/page');
//     });
//     Route::get('/profile', function () {
//         return Inertia::render('engagement/profile/page');
//     });
// });
// employee = 7
Route::prefix('employee', 'role:7')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('employee/dashboard/page');
    });
    Route::get('/employee_relation', function () {
        return Inertia::render('employee/employee_relation/page');
    });
    Route::get('/announcement', function () {
        return Inertia::render('employee/announcement/page');
    });
    Route::get('/list_memo', function () {
        return Inertia::render('employee/list_memo/page');
    });
    Route::get('/engagement', function () {
        return Inertia::render('employee/engagement/page');
    });
    Route::prefix('engagement')->group(function () {
        Route::get('/today_event', function () {
            return Inertia::render('employee/engagement/today_event/page');
        });
        Route::get('/upcoming_event', function () {
            return Inertia::render('employee/engagement/upcoming_event/page');
        });
        Route::get('/birthday', function () {
            return Inertia::render('employee/engagement/birthday/page');
        });
    });
    Route::get('/profile', function () {
        return Inertia::render('employee/profile/page');
    });
});





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
