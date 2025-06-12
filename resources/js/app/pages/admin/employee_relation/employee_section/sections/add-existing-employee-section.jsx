import { useDispatch, useSelector } from 'react-redux';
import store from '@/app/store/store';
import region from "@/app/address/region.json"
import province from "@/app/address/province.json"
import city from "@/app/address/city.json"
import barangay from "@/app/address/barangay.json"
import moment from 'moment';
// import Input from '../../_components/input';
// import Select from '../../_components/select';
import { useEffect } from 'react';
import { UserAddOutlined } from '@ant-design/icons'
import { message, Modal } from 'antd';
import React, { useState } from 'react'
import UploadResumeSection from './upload-resume-section';
import WorkingExperienceSection from './working-experience-section';
import { setApplicantForm } from '../../../recruitment/applicants/applicant_records/redux/applicant-slice';
import { get_applicant_thunk, store_applicant_thunk } from '../../../recruitment/applicants/applicant_records/redux/applicant-thunk';
import Input from '@/app/pages/_components/input';
import Select from '@/app/pages/_components/select';
import { store_employee_thunk } from '../redux/employee-section-thunk';
import { wait } from 'ckeditor5';
import { get_job_position_thunk } from '../../../sourcing/job_title_section/redux/job-title-thunk';
import { get_department_thunk } from '../../../sourcing/department/redux/department-thunk';

export default function AddExistingEmployeeSection() {
    const [open, setOpen] = useState(false);
    const { job_positions } = useSelector((state) => state.job_positions);
    const { departments } = useSelector((state) => state.departments);
    const { accounts } = useSelector((state) => state.accounts);
    const { users } = useSelector((state) => state.app);
    const [showWorkingExperience, setShowWorkingExperience] = useState(false);
    const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState({})

    const [applicationCount, setApplicationCount] = useState(0);
    const { applicantForm } = useSelector((state) => state.applicants);
    const [newProvince, setNewProvince] = useState([])
    const [newCity, setNewCity] = useState([])
    const [newBarangay, setNewBarangay] = useState([])
    const dispatch = useDispatch();

    useEffect(() => {
        if (open) {
            store.dispatch(get_job_position_thunk())
            store.dispatch(get_department_thunk())
        }
    }, [open]);

    useEffect(() => {
        const fetchApplicationCount = async () => {
            const count = 0;
            setApplicationCount(count);
        };
        fetchApplicationCount();
        setLoading(false)
    }, []);

    function changeHandler(e) {
        const data = e.target.name;
        if (data == "image") {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [data]: e.target.files,
                })
            );
        } else {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [data]: e.target.value,
                })
            );
        }
    }
    console.log('query', applicantForm)

    async function submitApplicant(e) {
        e.preventDefault();
        setLoading(true)
        const fd = new FormData()
        fd.append('files', uploadedFile)
        fd.append('site', applicantForm.site ?? "")
        fd.append('app_id', applicantForm.app_id?? "")
        fd.append('fname', applicantForm.fname?? "")
        fd.append('mname', applicantForm.mname?? "")
        fd.append('lname', applicantForm.lname?? "")
        fd.append('suffix', applicantForm.suffix?? "")
        fd.append('dob', applicantForm.dob?? "")
        fd.append('religion', applicantForm.religion?? "")
        fd.append('email', applicantForm.email?? "")
        fd.append('nationality', applicantForm.nationality?? "")
        fd.append('phone', applicantForm.phone?? "")
        fd.append('mmname', applicantForm.mmname?? "")
        fd.append('ffname', applicantForm.ffname?? "")
        fd.append('courset', applicantForm.courset?? "")
        fd.append('hired', applicantForm.hired?? "")
        fd.append('lot', applicantForm.lot?? "")
        fd.append('sss', applicantForm.sss?? "")
        fd.append('pagibig', applicantForm.pagibig?? "")
        fd.append('tin', applicantForm.tin?? "")
        fd.append('philh', applicantForm.philh?? "")
        fd.append('ename', applicantForm.ename?? "")
        fd.append('eaddress', applicantForm.eaddress?? "")
        fd.append('relationship', applicantForm.relationship?? "")
        fd.append('ephone', applicantForm.ephone?? "")
        fd.append('marital', applicantForm.marital?? "")
        fd.append('gender', applicantForm.gender?? "")
        fd.append('account', applicantForm.account?? "")
        fd.append('region', applicantForm.region?? "")
        fd.append('city', applicantForm.city?? "")
        fd.append('brgy', applicantForm.brgy?? "")
        fd.append('position', applicantForm.position?? "")
        fd.append('dept', applicantForm.dept?? "")
        fd.append('account', applicantForm.account?? "")
        fd.append('sup_id', applicantForm.sup_id?? "")
        fd.append('province', applicantForm.province?? "")
        fd.append('status', applicantForm.status?? "")

        try {
            applicantForm.work_experience.forEach((value) => {
                fd.append("work_experience[]", JSON.stringify({
                    app_id: applicantForm.app_id,
                    company: value.company,
                    position: value.position,
                    started_at: value.started_at,
                    end_at: value.end_at,
                }));
            });
            await dispatch(
                setApplicantForm({
                    ...applicantForm,
                    submitted: moment().format('YYYY-MM-DD'),
                    app_id: applicantForm.app_id
                })
            );
            await store.dispatch(store_employee_thunk(fd));
            await store.dispatch(get_applicant_thunk())
            message.success('Employee Saved successfully')
            setLoading(false)
            setOpen(false);
        } catch (error) {
            message.error('Employee failed to saved')
            setLoading(false)
        }
    }


    const handleWorkingExperienceChange = (e) => {
        setShowWorkingExperience(e.target.checked);
        setShowFirstTimeJobseeker(false);
    };

    const handleFirstTimeJobseekerChange = (e) => {
        setShowFirstTimeJobseeker(e.target.checked);
        setShowWorkingExperience(false);
    };

    function data_handler(e) {
        if (e.target.name == 'region') {
            const region = JSON.parse(e.target.value)
            const prov = province.filter(obj => obj.region_code === region.region_code);
            setNewProvince(prov)
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: region.name,
                })
            );
        } else if (e.target.name == 'province') {
            const province = JSON.parse(e.target.value)
            const ct = city.filter(obj => obj.province_code === province.province_code);
            setNewCity(ct)
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: province.name,
                })
            );
        } else if (e.target.name == 'city') {
            const city = JSON.parse(e.target.value)
            const brgy = barangay.filter(obj => obj.city_code === city.city_code);
            setNewBarangay(brgy)
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: city.name,
                })
            );
        } else {
            dispatch(
                setApplicantForm({
                    ...applicantForm,
                    [e.target.name]: e.target.value,
                })
            );
        }


    }
    console.log("ssssssssss", users);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <UserAddOutlined className='text-xl' />
                    Add Existing Employee
                </button>
            </div>
            <Modal
                title="Existing Employee"
                // centered
                confirmLoading={loading}
                open={open}
                onOk={submitApplicant}
                onCancel={() => setOpen(false)}
                width={1200}
                okText="Save"
                cancelText="Cancel"
            >
                <form className='border rounded-lg p-3.5' onSubmit={submitApplicant}>
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <select
                                onChange={(event) => data_handler(event)}
                                name='site'
                                className="border p-2 rounded w-full">
                                <option disabled selected>Select Site</option>
                                <option value="San Carlos">San Carlos </option>
                                <option value="Carcar">Carcar </option>
                            </select>
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6 text-center">Personal Information</h1>
                    <div className="mb-4">
                        <Input
                            onChange={(event) => data_handler(event)}
                            value={applicantForm.app_id ?? ""}
                            required={error?.app_id ? true : false}
                            name="app_id"
                            label="Employee No."
                            type="text"
                        />
                    </div>
                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <label htmlFor=""><b>Full Name</b></label>
                            <div className='flex flex-1 gap-3'>
                                <Input
                                    onChange={(event) => data_handler(event)}
                                    value={applicantForm.fname ?? ""}
                                    required={error?.fname ? true : false}
                                    name="fname"
                                    label="First Name"
                                    type="text"
                                />
                                <Input
                                    onChange={(event) => data_handler(event)}
                                    value={applicantForm.mname ?? ""}
                                    name="mname"
                                    label="Middle Name"
                                    type="text"
                                />
                                <Input
                                    onChange={(event) => data_handler(event)}
                                    value={applicantForm.lname ?? ""}
                                    required={error?.lname ? true : false}
                                    name="lname"
                                    label="Last Name"
                                    type="text"
                                />
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='suffix'
                                    className="border p-2 rounded  w-1/5">
                                    <option disabled selected>Suffix</option>
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
                                    <select
                                        onChange={(event) => data_handler(event)}
                                        name='gender'
                                        className="border p-2 rounded w-full">
                                        <option disabled selected>Gender</option>
                                        <option> Male</option>
                                        <option> Female</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <Input
                                        onChange={(event) =>
                                            data_handler(event)
                                        }
                                        value={applicantForm.dob ?? ""}
                                        required={error?.dob ? true : false}
                                        name="dob"
                                        label="Date of Birth"
                                        type="date"
                                    />
                                </div>
                                <div className=" w-full">
                                    <Input
                                        onChange={(event) => data_handler(event)}
                                        value={applicantForm.email ?? ""}
                                        required={error?.email ? true : false}
                                        name="email"
                                        label="Email"
                                        type="email"
                                    />
                                </div>
                                <div className="w-full">
                                    <Input
                                        onChange={(event) => data_handler(event)}
                                        value={applicantForm.phone ?? ""}
                                        required={error?.phone ? true : false}
                                        name="phone"
                                        label="Phone Number"
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full'>
                            <div className="flex flex-col gap-4 mb-4 w-full">
                                <div className='flex flex-col w-full'>
                                    <select
                                        onChange={(event) => data_handler(event)}
                                        name='marital'
                                        className="border p-2 rounded w-full">
                                        <option disabled selected>Marital Status</option>
                                        <option> Single</option>
                                        <option> Married</option>
                                        <option> Widowed</option>
                                        <option> Divorced</option>
                                    </select>
                                </div>
                                <div className='flex flex-col w-full'>
                                    <Input
                                        onChange={(event) =>
                                            data_handler(event)
                                        }
                                        value={applicantForm.religion ?? ""}
                                        required={error?.religion ? true : false}
                                        name="religion"
                                        label="Religion"
                                        type="text"
                                    />
                                </div>
                                <div className='flex flex-col w-full'>
                                    <Input
                                        onChange={(event) =>
                                            data_handler(event)
                                        }
                                        value={applicantForm.nationality ?? ""}
                                        required={error?.nationality ? true : false}
                                        name="nationality"
                                        label="Nationality"
                                        type="text"
                                    />
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="mb-4">
                        <Input
                            onChange={(event) => data_handler(event)}
                            value={applicantForm.mmname ?? ""}
                            name="mmname"
                            label="Mothers maiden name"
                            type="text"
                        />
                    </div>
                    <div className="mb-4">
                        <Input
                            onChange={(event) => data_handler(event)}
                            value={applicantForm.ffname ?? ""}
                            name="ffname"
                            label="Fathers fullname"
                            type="text"
                        />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <select
                                onChange={(event) => data_handler(event)}
                                name='educ'
                                className="border p-2 rounded w-full">
                                <option disabled selected>Select Educational Attainment</option>
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
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.courset ?? ""}
                                name="courset"
                                label="Course taken"
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <div className='flex flex-1 gap-3'>
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='position'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>Job Position</option>
                                    {
                                        job_positions
                                            .filter(res => res.site === "San Carlos")
                                            .map((res, i) => (
                                                <option value={res.jPosition} key={i}>
                                                    {res.jPosition}
                                                </option>
                                            ))
                                    }
                                </select>
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='dept'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>Department</option>
                                    {
                                        departments
                                            .filter(res => res.site === "San Carlos")
                                            .map((res, i) => (
                                                <option value={res.dept} key={i}>
                                                    {res.dept}
                                                </option>
                                            ))
                                    }
                                </select>
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='account'
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>Account (If Applicable)</option>
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
                    <div className='flex flex-1 gap-4'>
                        <div className='flex flex-col w-full mb-4'>
                            <div className='flex flex-1 gap-3'>
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='sup_id'
                                    value={applicantForm.sup_id}
                                    className="border p-2 rounded  w-full">
                                    <option disabled selected>Supervisor</option>
                                    {
                                        users
                                            .filter(
                                                (res) =>
                                                    res.site === "San Carlos" &&
                                                    ["Manager", "Account Manager", "Supervisor", "Team Leader", "Director", "CEO"].includes(res.position)
                                            )
                                            .map((res) => (
                                                <option value={res.id} key={res.id}>
                                                    {res.employee_fname} {res.employee_lname}
                                                </option>
                                            ))
                                    }
                                </select>
                                <Input
                                    onChange={(event) => data_handler(event)}
                                    value={applicantForm.hired ?? ""}
                                    name="hired"
                                    label="Hired Date"
                                    type="date"
                                />
                                <select
                                    onChange={(event) => data_handler(event)}
                                    name='status'
                                    className="border p-2 rounded  w-full"
                                    required
                                >
                                    <option disabled selected>Status</option>
                                    <option> Probationary</option>
                                    <option> Regular</option>
                                    <option> Contractual</option>
                                    <option> Trainee</option>
                                    <option> Fallout</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Address Information</h1>
                    <div className="flex flex-1 gap-4 mb-4 w-full">
                        <div className='flex flex-col w-full'>
                            <Select
                                onChange={(event) => data_handler(event)}
                                // value={applicantForm.region ?? ""}
                                options={region.map(res => ({
                                    label: res.region_name,
                                    value: JSON.stringify({ name: res.region_name, region_code: res.region_code }),
                                }))}
                                required="true"
                                name="region"
                                label="Region"
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <Select
                                onChange={(event) => data_handler(event)}
                                // value={applicantForm.province ?? ""}
                                options={newProvince.map(res => ({
                                    label: res.province_name,
                                    value: JSON.stringify({ name: res.province_name, province_code: res.province_code }),
                                }))}
                                required="true"
                                name="province"
                                label="Province"
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <Select
                                onChange={(event) => data_handler(event)}
                                // value={applicantForm.city ?? ""}
                                options={newCity.map(res => ({
                                    label: res.city_name,
                                    value: JSON.stringify({ name: res.city_name, city_code: res.city_code }),
                                }))}
                                required="true"
                                name="city"
                                label="City/Municipality"
                            />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4 mb-4">
                        <div className='flex flex-col  w-1/2'>
                            <Select
                                onChange={(event) => data_handler(event)}
                                // value={applicantForm.barangay ?? ""}
                                options={newBarangay.map(res => ({
                                    label: res.brgy_name,
                                    value: res.brgy_name,
                                }))}
                                required="true"
                                name="brgy"
                                label="Barangay"
                            />
                        </div>
                        <div className='flex flex-col w-full'>
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.lot ?? ""}
                                name="lot"
                                label="House/Lot No., Street, Purok/Sitio"
                                type="text"
                            />
                        </div>
                    </div>
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Government ID Information</h1>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.sss ?? ""}
                                name="sss"
                                label="SSS No."
                                type="text"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.pagibig ?? ""}
                                name="pagibig"
                                label="Pag-IBIG No."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.tin ?? ""}
                                name="tin"
                                label="Tin No."
                                type="text"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.philh ?? ""}
                                name="philh"
                                label="Philhealth No."
                                type="text"
                            />
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="with-working-experience-checkbox"
                            type="checkbox"
                            value=""
                            checked={showWorkingExperience}
                            onChange={handleWorkingExperienceChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  -gray-800 focus:ring-2  "
                        />
                        <label htmlFor="with-working-experience-checkbox" className="ms-2 text-md font-medium text-gray-900 "><b>with Working Experience</b></label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input
                            id="first-time-jobseeker-checkbox"
                            type="checkbox"
                            value=""
                            checked={showFirstTimeJobseeker}
                            onChange={handleFirstTimeJobseekerChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  -gray-800 focus:ring-2  "
                            disabled={showWorkingExperience}
                        />
                        <label htmlFor="first-time-jobseeker-checkbox" className="ms-2 text-md font-medium text-gray-900 "><b>First Time Jobseeker</b></label>
                    </div>
                    {showWorkingExperience && <WorkingExperienceSection />}
                    <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Emergency Contact Information</h1>
                    <div className="mb-4 w-full">
                        <Input
                            onChange={(event) => data_handler(event)}
                            value={applicantForm.ename ?? ""}
                            name="ename"
                            label="Emergency Contact Fullname"
                            type="text"
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <Input
                            onChange={(event) => data_handler(event)}
                            value={applicantForm.eaddress ?? ""}
                            name="eaddress"
                            label="Address"
                            type="text"
                        />
                    </div>
                    <div className='flex flex-1 gap-4 mb-4'>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.relationship ?? ""}
                                name="relationship"
                                label="Relationship"
                                type="text"
                            />
                        </div>
                        <div className="w-full">
                            <Input
                                onChange={(event) => data_handler(event)}
                                value={applicantForm.ephone ?? ""}
                                name="ephone"
                                label="Contact No."
                                type="number"
                            />
                        </div>
                    </div>
                    <UploadResumeSection
                        files={uploadedFile}
                        setFiles={setUploadedFile}
                    />
                    {/* <div className="flex justify-end mt-2.5">
                                <button
                                    type="submit" id="theme-toggle" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition-colors">
                                    SUBMIT
                                </button>
                            </div> */}
                </form>
            </Modal>
        </div>
    )
}
