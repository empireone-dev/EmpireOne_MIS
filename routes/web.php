<?php

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

Route::get('/', function () {
    return Inertia::render('login/page');
});



Route::get('/online_application', function () {
    return Inertia::render('online_application/page');
});

Route::get('/onboarding-documents', function () {
    return Inertia::render('onboarding-documents/page');
});

Route::get('/pre-employment', function () {
    return Inertia::render('pre-employment/page');
});
Route::get('/virtual-contract', function () {
    return Inertia::render('virtual-contract/page');
});


Route::prefix('admin')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });

    Route::get('/file_201', function () {
        return Inertia::render('admin/file_201/page');
    });

    Route::prefix('sourcing')->group(function () {

        Route::prefix('job_title_section')->group(function () {
            Route::get('/', function () {
                return Inertia::render('admin/sourcing/job_title_section/page');
            });
            Route::get('/job_analysis', function () {
                return Inertia::render('admin/sourcing/job_title_section/job_analysis/page');
            });
            Route::get('/job_description', function () {
                return Inertia::render('admin/sourcing/job_title_section/job_description/page');
            });
        });

        Route::prefix('resource_requests')->group(function () {
            Route::prefix('erf_record')->group(function () {
                Route::get('/', function () {
                    return Inertia::render('admin/sourcing/resource_requests/page');
                });
                Route::get('/erf_job_analysis', function () {
                    return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_analysis/page');
                });
                Route::get('/erf_job_description', function () {
                    return Inertia::render('admin/sourcing/resource_requests/erf_record/erf_job_description/page');
                });
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
        });

        Route::prefix('resource_requests')->group(function () {
            Route::get('/erf_record', function () {
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
        });

        Route::prefix('resource_requests')->group(function () {
            Route::get('/erf_record', function () {
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
        });
    });

    Route::prefix('recruitment')->group(function () {
        Route::get('/guide_question', function () {
            return Inertia::render('admin/recruitment/guide_question/page');
        });

        Route::prefix('applicants')->group(function () {
            Route::get('/applicant_records', function () {
                return Inertia::render('admin/recruitment/applicants/applicant_records/page');
            });
            Route::get('/pendings', function () {
                return Inertia::render('admin/recruitment/applicants/pendings/page');
            });
            Route::get('/initial', function () {
                return Inertia::render('admin/recruitment/applicants/initial/page');
            });
            Route::get('/final', function () {
                return Inertia::render('admin/recruitment/applicants/final/page');
            });
            Route::get('/passed', function () {
                return Inertia::render('admin/recruitment/applicants/passed/page');
            });
            Route::get('/failed', function () {
                return Inertia::render('admin/recruitment/applicants/failed/page');
            });
            Route::get('/{slug}/{id}', function () {
                return Inertia::render('admin/recruitment/applicants/id/page');
            });
        });
    });
    Route::prefix('hiring')->group(function () {
        Route::get('/pre_employment', function () {
            return Inertia::render('admin/hiring/pre_employment/page');
        });
        Route::get('/hiring_section', function () {
            return Inertia::render('admin/hiring/hiring_section/page');
        });
    });
    Route::prefix('onboarding')->group(function () {
        Route::get('/onboarding_docu', function () {
            return Inertia::render('admin/onboarding/onboarding_docu/page');
        });
        Route::get('/acknowledgement', function () {
            return Inertia::render('admin/onboarding/acknowledgement/page');
        });
    });
    Route::prefix('employee_relation')->group(function () {
        Route::get('/employee_section', function () {
            return Inertia::render('admin/employee_relation/employee_section/page');
        });
        Route::get('/upload_memo', function () {
            return Inertia::render('admin/employee_relation/upload_memo/page');
        });
    });

    Route::prefix('employee_wellness')->group(function () {
        Route::get('/medicine_records', function () {
            return Inertia::render('admin/employee_wellness/medicine_records/page');
        });
        Route::get('/employee_health_data', function () {
            return Inertia::render('admin/employee_wellness/employee_health_data/page');
        });
    });

    Route::prefix('attrition')->group(function () {
        Route::get('/attrition_section', function () {
            return Inertia::render('admin/attrition/attrition_section/page');
        });
    });

    Route::prefix('engagement_section')->group(function () {
        Route::get('/engagement_dashboard', function () {
            return Inertia::render('admin/engagement_section/engagement_dashboard/page');
        });
        Route::get('/calendar_activities', function () {
            return Inertia::render('admin/engagement_section/calendar_activities/page');
        });
    });

    Route::get('/ceo_section', function () {
        return Inertia::render('admin/ceo_section/page');
    });





    Route::get('/profile', function () {
        return Inertia::render('admin/profile/page');
    });
});

Route::prefix('employee')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('employee/dashboard/page');
    });
    Route::get('/employee_relation', function () {
        return Inertia::render('employee/employee_relation/page');
    });
    Route::get('/engagement', function () {
        return Inertia::render('employee/engagement/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('employee/profile/page');
    });
});

Route::prefix('engagement')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('engagement/dashboard/page');
    });
    Route::get('/employee_relation', function () {
        return Inertia::render('engagement/employee_relation/page');
    });
    Route::get('/employee_wellness', function () {
        return Inertia::render('engagement/employee_wellness/page');
    });
    Route::get('/engagement_section', function () {
        return Inertia::render('engagement/engagement_section/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('engagement/profile/page');
    });
});

Route::prefix('managers')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('managers/dashboard/page');
    });
    Route::get('/attrition', function () {
        return Inertia::render('managers/attrition/page');
    });
    Route::get('/employee_relation', function () {
        return Inertia::render('managers/employee_relation/page');
    });
    Route::get('/engagement_section', function () {
        return Inertia::render('managers/engagement_section/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('managers/profile/page');
    });
    Route::get('/recruitment', function () {
        return Inertia::render('managers/recruitment/page');
    });
    Route::get('/sourcing', function () {
        return Inertia::render('managers/sourcing/page');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
