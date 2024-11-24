import React, { useState } from 'react';
import WorkingExperienceSection from './working-experience-section';
import { useDispatch, useSelector } from 'react-redux';
import { setApplicantForm } from '../../admin/recruitment/applicants/applicant_records/redux/applicant-slice';
import { get_applicant_thunk, store_applicant_thunk } from '../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk';
import store from '@/app/store/store';
import region from "@/app/address/region.json"
import province from "@/app/address/province.json"
import city from "@/app/address/city.json"
import barangay from "@/app/address/barangay.json"
import moment from 'moment';
import Input from '../../_components/input';
import Select from '../../_components/select';
import { useEffect } from 'react';
import { message } from 'antd';
import UploadResumeSection from '../../admin/employee_relation/employee_section/sections/upload-resume-section';
import { LoadingOutlined, SendOutlined } from '@ant-design/icons';

export default function ApplicationFormSection() {
  const [open, setOpen] = useState(false);
  const [applicationCount, setApplicationCount] = useState(0);
  const { applicantForm } = useSelector((state) => state.applicants);
  const [newProvince, setNewProvince] = useState([])
  const [newCity, setNewCity] = useState([])
  const [newBarangay, setNewBarangay] = useState([])
  const [error, setError] = useState({})
  console.log("applicants", applicantForm);
  const dispatch = useDispatch();
  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchApplicationCount = async () => {
      const count = 0;
      setApplicationCount(count);
    };
    fetchApplicationCount();
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
  function calculateAge(dob) {
    // Parse the date of birth (YYYY-MM-DD format) into a Date object
    const birthDate = new Date(dob);
    const today = new Date();
    // Calculate the preliminary age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    // Adjust age if the birthday hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age ?? 0;
  }

  async function submitApplicant(e) {
    e.preventDefault();
    setLoading(true);

    const dob = calculateAge(applicantForm.dob ?? new Date());

    const fd = new FormData();
    fd.append('files', uploadedFile)
    fd.append('site', applicantForm.site ?? '');
    fd.append('fname', applicantForm.fname ?? '');
    fd.append('mname', applicantForm.mname ?? '');
    fd.append('lname', applicantForm.lname ?? '');
    fd.append('suffix', applicantForm.suffix ?? '');
    fd.append('dob', applicantForm.dob ?? moment().format('YYYY-MM-DD'));
    fd.append('religion', applicantForm.religion ?? '');
    fd.append('email', applicantForm.email ?? '');
    fd.append('nationality', applicantForm.nationality ?? '');
    fd.append('phone', applicantForm.phone ?? '');
    fd.append('mmname', applicantForm.mmname ?? '');
    fd.append('ffname', applicantForm.ffname ?? '');
    fd.append('educ', applicantForm.educ ?? '');
    fd.append('courset', applicantForm.courset ?? '');
    fd.append('hired', applicantForm.hired ?? '');
    fd.append('lot', applicantForm.lot ?? '');
    fd.append('sss', applicantForm.sss ?? '');
    fd.append('pagibig', applicantForm.pagibig ?? '');
    fd.append('tin', applicantForm.tin ?? '');
    fd.append('philh', applicantForm.philh ?? '');
    fd.append('ename', applicantForm.ename ?? '');
    fd.append('eaddress', applicantForm.eaddress ?? '');
    fd.append('relationship', applicantForm.relationship ?? '');
    fd.append('ephone', applicantForm.ephone ?? '');
    fd.append('marital', applicantForm.marital ?? '');
    fd.append('gender', applicantForm.gender ?? '');
    fd.append('region', applicantForm.region ?? '');
    fd.append('city', applicantForm.city ?? '');
    fd.append('brgy', applicantForm.brgy ?? '');
    fd.append('province', applicantForm.province ?? '');

    applicantForm.work_experience.forEach((value) => {
      fd.append("work_experience[]", JSON.stringify({
        company: value.company,
        position: value.position,
        started_at: value.started_at,
        end_at: value.end_at,
      }));
    });

    try {
      const result = await store.dispatch(store_applicant_thunk(fd));

      if (result.status === 200) {
        message.success('Application has been submitted successfully');
      } else {
        setError(result.response.data.errors);
        message.error('Failed to submit Application');
      }
    } catch (error) {
      // message.error('Failed to submit application');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  console.log("province", province)
  const [showWorkingExperience, setShowWorkingExperience] = useState(false);
  const [showFirstTimeJobseeker, setShowFirstTimeJobseeker] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(null);


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
  console.log("ssssssssss", applicantForm);



  return (
    <div className="h-screen overflow-hidden ">
      <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
        <div className="container mx-auto px-10 flex justify-center">
          <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
            <div className="flex items-center justify-center p-3">
              <img className="w-60" src="images/newlogo.png" alt="logo" />
            </div>
            <div className='flex text-2xl items-center justify-center'>
              <h1><b>ONLINE APPLICATION FORM</b></h1>
            </div>
            <form
              className="border rounded-lg p-3.5"
              onSubmit={submitApplicant}
            >
              {/* <div className="w-1/4">
                        <Input
                            onChange={(event) => data_handler(event)}
                            // value={applicantForm.app_id ?? ""}
                            value={generateUniqueAppId()}
                            name="app_id"
                            label="Application ID"
                            type="text"
                            readOnly
                        />
                    </div> */}
              <h1 className="text-xl font-semibold mb-3 mt-4 text-gray-900 ">
                Site Information
              </h1>
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className='flex flex-col'>
                    <select
                      onChange={(event) => data_handler(event)}
                      name="site"
                      className="border p-2 rounded w-full"
                    >
                      <option disabled selected>
                        Select Site
                      </option>
                      <option>San Carlos </option>
                      <option>Carcar </option>
                    </select>
                    {error?.site && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required.
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-6">
                Personal Information
              </h1>
              <div className="flex flex-1 gap-4">
                <div className="flex flex-col w-full mb-4">
                  <div className="flex flex-1 gap-3">
                    {/* <input name='fname' type="text" placeholder="First name" className="border p-2 rounded w-full" />
                                <input name='mname' type="text" placeholder="Middle name" className="border p-2 rounded w-full" />
                                <input name='lname' type="text" placeholder="Last name" className="border p-2 rounded w-full" /> */}
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
                      required={error?.mname ? true : false}
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
                      name="suffix"
                      className="border p-2 rounded  w-1/5"
                    >
                      <option disabled selected>
                        Suffix
                      </option>
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
              <div className="flex flex-1 gap-4">
                <div className="flex w-full">
                  <div className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex flex-col w-full">
                      <select
                        onChange={(event) => data_handler(event)}
                        // value={applicantForm.gender ?? ""}
                        name="gender"
                        className="border p-2 rounded w-full"
                      >
                        <option className="" disabled selected>&nbsp; Gender</option>
                        <option> Male</option>
                        <option> Female</option>
                      </select>
                      {
                        error?.gender && <span className="text-red-500 text-sm mt-1">
                          This field is required.
                        </span>
                      }

                    </div>

                    <div className="flex flex-col w-full">
                      <Input
                        onChange={(event) =>
                          data_handler(event)
                        }
                        value={applicantForm.dob ?? ""}
                        required={error?.dob ? true : false}
                        name="dob"
                        label="Date of Birth"
                        type="date"
                        errorMessage={error?.dob}
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
                        errorMessage={error?.email}
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
                        errorMessage={error?.email}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex w-full">
                  <div className="flex flex-col gap-4 mb-4 w-full">
                    <div className="flex flex-col w-full">
                      <select
                        onChange={(event) => data_handler(event)}
                        name="marital"
                        className="border p-2 rounded w-full"
                      >
                        <option disabled selected>&nbsp; Marital Status</option>
                        <option> Single</option>
                        <option> Married</option>
                        <option> Widowed</option>
                        <option> Divorced</option>
                      </select>
                      {
                        error?.marital && <span className="text-red-500 text-sm mt-1">
                          This field is required.
                        </span>
                      }
                    </div>
                    <div className="flex flex-col w-full">
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
                    <div className="flex flex-col w-full">
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
              <div className="flex flex-1 gap-4 mb-4">
                <div className="w-full">
                  <select
                    name="educ"
                    className="border p-2.5 rounded w-full"
                    onChange={(event) => data_handler(event)}
                  >
                    <option disabled selected>&nbsp; Highest Educational Attainment</option>
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
              <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                Address Information
              </h1>
              <div className="flex flex-1 gap-4 mb-4 w-full">
                <div className="flex flex-col w-full">
                  <Select
                    onChange={(event) => data_handler(event)}
                    // value={applicantForm.region ?? ""}
                    options={region.map(res => ({
                      label: res.region_name,
                      value: JSON.stringify({ name: res.region_name, region_code: res.region_code }),
                    }))}
                    name="region"
                    label="Region"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Select
                    onChange={(event) => data_handler(event)}
                    // value={applicantForm.province ?? ""}
                    options={newProvince.map(res => ({
                      label: res.province_name,
                      value: JSON.stringify({ name: res.province_name, province_code: res.province_code }),
                    }))}
                    name="province"
                    label="Province"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Select
                    onChange={(event) => data_handler(event)}
                    // value={applicantForm.city ?? ""}
                    options={newCity.map(res => ({
                      label: res.city_name,
                      value: JSON.stringify({ name: res.city_name, city_code: res.city_code }),
                    }))}
                    name="city"
                    label="City/Municipality"
                  />
                </div>
              </div>
              <div className="flex flex-1 gap-4 mb-4">
                <div className="flex flex-col  w-1/2">
                  <Select
                    onChange={(event) => data_handler(event)}
                    // value={applicantForm.barangay ?? ""}
                    options={newBarangay.map(res => ({
                      label: res.brgy_name,
                      value: res.brgy_name,
                    }))}
                    name="brgy"
                    label="Barangay"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Input
                    onChange={(event) => data_handler(event)}
                    value={applicantForm.lot ?? ""}
                    name="lot"
                    label="House/Lot No., Street, Purok/Sitio"
                    type="text"
                  />
                </div>
              </div>
              <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                Government ID Information
              </h1>
              <div className="flex flex-1 gap-4 mb-4">
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
              <div className="flex flex-1 gap-4 mb-4">
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
              <div className="flex items-center mb-4 mt-6">
                <input
                  id="with-working-experience-checkbox"
                  type="checkbox"
                  value=""
                  checked={showWorkingExperience}
                  onChange={handleWorkingExperienceChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  -gray-800 focus:ring-2  "
                />
                <label
                  htmlFor="with-working-experience-checkbox"
                  className="ms-2 text-md font-medium text-gray-900 "
                >
                  <b>with Working Experience</b>
                </label>
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
                <label
                  htmlFor="first-time-jobseeker-checkbox"
                  className="ms-2 text-md font-medium text-gray-900 "
                >
                  <b>First Time Jobseeker</b>
                </label>
              </div>
              {showWorkingExperience && <WorkingExperienceSection />}
              <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-7">
                Emergency Contact Information
              </h1>
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
              <div className="flex flex-1 gap-4 mb-4">
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
              <div className="flex justify-end mt-2.5">

                <button
                  type="submit"
                  className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                    }`}
                  onClick={submitApplicant}
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingOutlined spin />
                  ) : (
                    <SendOutlined />
                  )}
                  {loading ? " SUBMITTING..." : " SUBMIT APPLICATION"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
