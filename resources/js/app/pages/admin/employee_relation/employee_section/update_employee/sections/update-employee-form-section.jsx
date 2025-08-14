import Input from '@/app/pages/_components/input';
import { LoadingOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import UpdateEmployeeAddressSection from './update-employee-address-section';
import store from '@/app/store/store';
import { useState } from 'react';
import { update_applicant_thunk } from '@/app/pages/admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import { useEffect } from 'react';
import { get_applicant_by_app_id_thunk } from '@/app/pages/admin/final_rate/redux/final-rate-thunk';
import { get_employee_by_id_thunk } from '../../redux/employee-section-thunk';

export default function UpdateEmployeeFormSection() {
    const { employee } = useSelector((state) => state.employees);
    const { applicant } = useSelector((state) => state.final_rate);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { user } = useSelector((state) => state.app);
    const { users } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(null);
    const [form, setForm] = useState({});
    const app_id = window.location.pathname.split('/')[5]
    const employee_id = window.location.pathname.split('/')[6]

    useEffect(() => {
        setForm({
            app_id: applicant?.app_id,
            id: applicant?.id,
            emp_id: applicant?.employee?.emp_id || "",
            fname: applicant?.fname || "",
            mname: applicant?.mname || "",
            lname: applicant?.lname || "",
            suffix: applicant?.suffix || "",
            gender: applicant?.gender || "",
            dob: applicant?.dob || "",
            email: applicant?.email || "",
            phone: applicant?.phone || "",
            marital: applicant?.marital || "",
            religion: applicant?.religion || "",
            nationality: applicant?.nationality || "",
            mmname: applicant?.mmname || "",
            ffname: applicant?.ffname || "",
            educ: applicant?.educ || "",
            courset: applicant?.courset || "",
            position: applicant?.joboffer?.find(offer => offer.status === "Hired")?.jobPos || employee?.position || "",
            dept: applicant?.joboffer?.find(offer => offer.status === "Hired")?.department || employee?.dept?.dept || "",
            account: applicant?.joboffer?.find(offer => offer.status === "Hired")?.account || employee?.account || "",
            sup_id: applicant?.employee?.sup_id || employee?.sup_id || "",
            hired: applicant?.employee?.hired || employee?.hired || "",
            status: applicant?.employee?.status || employee?.status || "",
            sss: applicant?.sss || "",
            tin: applicant?.tin || "",
            pagibig: applicant?.pagibig || "",
            philh: applicant?.philh || "",
            ename: applicant?.ename || "",
            eaddress: applicant?.eaddress || "",
            relationship: applicant?.relationship || "",
            ephone: applicant?.ephone || "",
        });
    }, [applicant, employee]);



    console.log('emploeesss', applicant)

    async function edit_information(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(update_applicant_thunk(
                {
                    ...form,
                    employee_id: employee_id,
                    fname: form.fname,
                    mname: form.mname,
                    lname: form.lname,
                    suffix: form.suffix,
                }
            ));
            await store.dispatch(get_applicant_by_app_id_thunk(app_id));
            await store.dispatch(get_employee_by_id_thunk(app_id));
            message.success('Updated Successfully');
        } catch (error) {
            message.error(error.message || 'Error updating changes');
        } finally {
            setLoading(false);
        }
    }


    console.log('applicant', applicant)
    return (
        <div>
            <div className='flex text-2xl items-center justify-center'>
                <h1><b>Personal Information</b></h1>
            </div>
            <form className='border rounded-lg p-3.5' onSubmit={edit_information}>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
                <div className='mb-4'>
                    <div className='flex flex-col w-full'>
                        <label htmlFor=""><b>Employee No.</b></label>
                        <input type="text"
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    emp_id: e.target.value,
                                })
                            }
                            value={form?.emp_id ?? ''}
                        />
                    </div>
                </div>
                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>
                        <label htmlFor=""><b>Full Name</b></label>
                        <div className='flex flex-1 gap-3'>
                            <input type="text"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        fname: e.target.value,
                                    })
                                }
                                value={form?.fname}
                                name="fname"
                                className="border p-2 rounded w-full" />
                            <input type="text"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        mname: e.target.value,
                                    })
                                }
                                value={form?.mname}
                                className="border p-2 rounded w-full" />
                            <input type="text"
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        lname: e.target.value,
                                    })
                                }
                                value={form?.lname}
                                className="border p-2 rounded w-full" />
                            <select
                                value={form?.suffix ?? ''}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        suffix: e.target.value,
                                    })
                                }
                                className="border p-2 rounded  w-1/5">
                                <option disabled selected>{applicant?.suffix}</option>
                                <option> Sr.</option>
                                <option> Jr.</option>
                                <option> II</option>
                                <option> III</option>
                                <option> IV</option>
                                <option> V</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 gap-4'>
                    <div className='flex w-full'>
                        <div className="flex flex-col gap-4 mb-4 w-full">
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Gender</b></label>
                                <select
                                    value={form?.gender ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            gender: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full">
                                    <option disabled selected>{applicant?.gender}</option>
                                    <option> Male</option>
                                    <option> Female</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Date of Birth</b></label>
                                <input type="date"
                                    value={form?.dob ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dob: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full" />
                            </div>
                            <div className=" w-full">
                                <label htmlFor=""><b>Email</b></label>
                                <input type="email"
                                    value={form?.email ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            email: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full " />
                            </div>
                            <div className="w-full">
                                <label htmlFor=""><b>Phone Number</b></label>
                                <input type="number"
                                    value={form?.phone ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            phone: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full " />
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <div className="flex flex-col gap-4 mb-4 w-full">
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Marital Status</b></label>
                                <select
                                    value={form?.marital ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            marital: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full">
                                    <option disabled selected>{applicant?.marital}</option>
                                    <option> Single</option>
                                    <option> Married</option>
                                    <option> Widowed</option>
                                    <option> Divorced</option>
                                </select>
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Religion</b></label>
                                <input type="text"
                                    value={form?.religion ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            religion: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <label htmlFor=""><b>Nationality</b></label>
                                <input type="text"
                                    value={form?.nationality ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            nationality: e.target.value,
                                        })
                                    }
                                    className="border p-2 rounded w-full" />
                            </div>
                        </div>
                    </div>

                </div>
                <div className="mb-4">
                    <label htmlFor=""><b>Mother's Maiden Name</b></label>
                    <input type="text"
                        value={form?.mmname ?? ''}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                mmname: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full " />
                </div>
                <div className="mb-4">
                    <label htmlFor=""><b>Father's Full Name</b></label>
                    <input type="text"
                        value={form?.ffname ?? ''}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ffname: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full " />
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Highest Educational Attainment</b></label>
                        <select
                            value={form?.educ ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    educ: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full">
                            <option disabled selected>{applicant?.educ}</option>
                            <option> Elementary Undergraduate</option>
                            <option> Elementary Graduate</option>
                            <option> Highschool/K-12 Undergraduate</option>
                            <option> Highschool/K-12 Graduate</option>
                            <option> College Level</option>
                            <option> College Graduate</option>
                            <option> Vocational Graduate</option>
                            <option> Masteral Degree</option>
                            <option> Doctoral Degree</option>
                        </select>
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Course Taken (Only if Applicable)</b></label>
                        <input type="text"
                            value={form?.courset ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    courset: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                </div>

                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>

                        <div className='flex flex-1 gap-3'>
                            <div className='w-full'>
                                <label htmlFor=""><b>Job Position</b></label>
                                <select
                                    value={form?.position ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            position: e.target.value,
                                        })
                                    }
                                    name='position'
                                    className="border p-2 rounded  w-full">
                                    <option value="">Select Job Position</option>
                                    {
                                        job_positions
                                            .filter(res =>
                                                user?.role_id === 1 || user?.role_id === 2 || res.site === user?.site
                                            )
                                            .map((res, i) => (
                                                <option value={res.jPosition} key={i}>
                                                    {res.jPosition}
                                                </option>
                                            ))
                                    }


                                </select>
                            </div>
                            <div className='w-full'>
                                <label htmlFor=""><b>Department</b></label>
                                <select
                                    value={form?.dept ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            dept: e.target.value,
                                        })
                                    }
                                    name='dept'
                                    className="border p-2 rounded  w-full">
                                    <option value="">Select Department</option>
                                    {
                                        departments
                                            .filter(res =>
                                                user?.role_id === 1 || user?.role_id === 2 || res.site === user?.site
                                            )
                                            .map((res, i) => (
                                                <option value={res.dept} key={i}>
                                                    {res.dept}
                                                </option>
                                            ))
                                    }

                                </select>
                            </div>
                            <div className='w-full'>
                                <label htmlFor=""><b>Account (If Applicable)</b></label>
                                <select
                                    value={form?.account ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            account: e.target.value,
                                        })
                                    }
                                    name='account'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>Account (If Applicable)</option>
                                    <option value="">--</option>
                                    {
                                        accounts
                                            // .filter(res => res.site === "San Carlos")
                                            .map((res, i) => (
                                                <option value={res.acc} key={i}>
                                                    {res.acc}
                                                </option>
                                            ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-1 gap-4'>
                    <div className='flex flex-col w-full mb-4'>
                        <div className='flex flex-1 gap-3'>
                            <div className='w-full'>
                                <label htmlFor=""><b>Supervisor</b></label>
                                <select
                                    value={form?.sup_id ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            sup_id: e.target.value,
                                        })
                                    }
                                    name='sup_id'
                                    className="border p-2 rounded  w-full">
                                    <option value="">Select Supervisor</option>
                                    {
                                        users
                                            .filter(res =>
                                                user?.role_id === 1 || user?.role_id === 2 || res.site === user?.site
                                            )
                                            .filter(res =>
                                                ["Manager", "Account Manager", "Supervisor", "Team Leader", "Director", "CEO"].includes(res.position)
                                            )
                                            .map((res, i) => (
                                                <option value={res.id} key={res.id}>
                                                    {res.employee_fname} {res.employee_lname}
                                                </option>
                                            ))
                                    }


                                    {/* {
                                    departments
                                        .filter(res => user?.role_id === 1 || (res.site === user?.site && res.role_id === user?.role_id))
                                        .map((res, i) => (
                                            <option value={res.dept} key={i}>
                                                {res.dept}
                                            </option>
                                        ))
                                } */}
                                </select>
                            </div>
                            <div className='w-full mt-4'>
                                <label htmlFor=""><b></b></label>
                                <Input
                                    value={form?.hired ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            hired: e.target.value,
                                        })
                                    }
                                    name="hired"
                                    label="Hired Date"
                                    type="date"
                                />
                            </div>
                            <div className='w-full'>
                                <label htmlFor=""><b>Status</b></label>
                                <select
                                    value={form?.status ?? ''}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            status: e.target.value,
                                        })
                                    }
                                    name='status'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>{employee?.status}</option>
                                    <option> Probationary</option>
                                    <option> Regular</option>
                                    <option> Contractual</option>
                                    <option> Trainee</option>
                                    <option> Fallout</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Address Information</h1>
                <div className="flex flex-1 gap-1 mb-4 w-full">
                    <div className='flex flex-col w-full'>
                        <div className='flex'>
                            <input type="text" value={applicant?.caddress} className="border p-2 rounded w-full" readOnly />
                            <UpdateEmployeeAddressSection />
                        </div>
                    </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6">Government ID Information</h1>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>SSS No.</b></label>
                        <input type="text"
                            value={form?.sss ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    sss: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Pag-IBIG No.</b></label>
                        <input type="text"
                            value={form?.pagibig ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    pagibig: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Tin No.</b></label>
                        <input type="text"
                            value={form?.tin ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    tin: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Philhealth No.</b></label>
                        <input type="text"
                            value={form?.philh ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    philh: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Emergency Contact Information</h1>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Emergency Contact Fullname</b></label>
                    <input type="text"
                        value={form?.ename ?? ''}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ename: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full " />
                </div>
                <div className="mb-4 w-full">
                    <label htmlFor=""><b>Address</b></label>
                    <input type="text"
                        value={form?.eaddress ?? ''}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                eaddress: e.target.value,
                            })
                        }
                        className="border p-2 rounded w-full " />
                </div>
                <div className='flex flex-1 gap-4 mb-4'>
                    <div className="w-full">
                        <label htmlFor=""><b>Relationship</b></label>
                        <input type="text"
                            value={form?.relationship ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    relationship: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                    <div className="w-full">
                        <label htmlFor=""><b>Contact No.</b></label>
                        <input type="number"
                            value={form?.ephone ?? ''}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    ephone: e.target.value,
                                })
                            }
                            className="border p-2 rounded w-full " />
                    </div>
                </div>
                <div className='flex gap-2 justify-end items-center mt-6'>
                    <button
                        type="submit"
                        className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${loading ? "cursor-not-allowed opacity-75" : ""
                            }`}
                        onClick={edit_information}
                        disabled={loading}
                    >
                        {loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            <></>
                        )}
                        {loading ? " UPDATING..." : "  Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}
