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
import { InboxOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { router } from '@inertiajs/react';
import Dragger from 'antd/es/upload/Dragger';

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

  const [files, setFiles] = useState([]);

  const handleFiles = async (fileList) => {
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

    const fileArray = Array.from(fileList);

    // Remove files that already exist in state
    const newUniqueFiles = fileArray.filter(
      (file) =>
        !files.some(
          (existing) =>
            existing.file.name === file.name &&
            existing.file.size === file.size &&
            existing.file.lastModified === file.lastModified
        )
    );

    const base64Files = await Promise.all(
      newUniqueFiles.map(async (file) => ({
        file,
        files: await toBase64(file),
      }))
    );

    setFiles((prevFiles) => [...prevFiles, ...base64Files]);
  };

  const props = {
    name: "file",
    multiple: true,
    method: "GET",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        const newFiles = info.fileList
          .map((file) => file.originFileObj)
          .filter(Boolean);
        handleFiles(newFiles);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setFiles((prevFiles) =>
        prevFiles.filter((f) => f.file.name !== file.name)
      );
      return true;
    },
  };


  useEffect(() => {
    const fetchApplicationCount = async () => {
      const count = 0;
      setApplicationCount(count);
    };
    fetchApplicationCount();
  }, []);

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
    // e.preventDefault();
    setLoading(true);

    const dob = calculateAge(applicantForm.dob ?? new Date());

    const fd = new FormData();
    files.forEach((fileObj) => {
      fd.append("files", fileObj.file); // ✅ appending raw files
    });
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

    if (Array.isArray(applicantForm.work_experience)) {
      applicantForm.work_experience.forEach((value) => {
        fd.append("work_experience[]", JSON.stringify({
          company: value.company,
          position: value.position,
          started_at: value.started_at,
          end_at: value.end_at,
        }));
      });
    }



    try {
      const result = await store.dispatch(store_applicant_thunk(fd));
      if (result.status === 200) {
        message.success('Application has been submitted successfully');
        router.visit("/online_application")
        setFiles([]);
      } else {
        setError(result.response.data.errors);
        message.error('Failed to submit Application/Application Exist');
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
        <div className="container mx-auto px-2 flex justify-center">
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
              <div className="">
                <h1 className="text-xl font-semibold mb-3 mt-4 text-gray-900">
                  Site Information
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
                  <div className="flex flex-col">
                    <select
                      onChange={(event) => data_handler(event)}
                      name="site"
                      className={`border p-2.5 rounded-md w-full ${error?.site ? 'border-red-500' : ''}`}
                    >
                      <option disabled selected>
                        Select Site
                      </option>
                      <option>San Carlos</option>
                      <option>Carcar</option>
                    </select>
                    {error?.site && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required.
                      </span>
                    )}
                  </div>
                </div>
              </div>


              <div className="">
                <h1 className="text-xl font-semibold mb-3 text-gray-900 mt-6">
                  Personal Information
                </h1>

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.fname ?? ""}
                    required={!!error?.fname}
                    name="fname"
                    label="First Name"
                    type="text"
                    errorMessage={error?.fname}
                  />
                  <Input
                    onChange={data_handler}
                    value={applicantForm.mname ?? ""}
                    required={!!error?.mname}
                    name="mname"
                    label="Middle Name"
                    type="text"
                  />
                  <Input
                    onChange={data_handler}
                    value={applicantForm.lname ?? ""}
                    required={!!error?.lname}
                    name="lname"
                    label="Last Name"
                    type="text"
                    errorMessage={error?.lname}
                  />
                  <div>
                    <select
                      onChange={data_handler}
                      name="suffix"
                      className="border p-2.5 rounded-md w-full"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Select Suffix
                      </option>
                      <option></option>
                      <option>Sr.</option>
                      <option>Jr.</option>
                      <option>II</option>
                      <option>III</option>
                      <option>IV</option>
                      <option>V</option>
                      <option>VI</option>
                      <option>VII</option>
                    </select>
                  </div>
                </div>

                {/* Gender, DOB, Email, Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <select
                      onChange={data_handler}
                      name="gender"
                      className={`border p-2.5 rounded-md w-full ${error?.gender ? 'border-red-500' : ''}`}
                      defaultValue=""
                    >
                      <option disabled value="">&nbsp; Gender</option>
                      <option></option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                    {error?.gender && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required.
                      </span>
                    )}
                  </div>

                  <Input
                    onChange={data_handler}
                    value={applicantForm.dob ?? ""}
                    required={!!error?.dob}
                    name="dob"
                    label="Date of Birth"
                    type="date"
                    errorMessage={error?.dob}
                  />

                  <Input
                    onChange={data_handler}
                    value={applicantForm.email ?? ""}
                    required={!!error?.email}
                    name="email"
                    label="Email"
                    type="email"
                    errorMessage={error?.email}
                  />

                  <Input
                    onChange={data_handler}
                    value={applicantForm.phone ?? ""}
                    required={!!error?.phone}
                    name="phone"
                    label="Phone Number"
                    type="number"
                    errorMessage={error?.phone}
                  />
                </div>

                {/* Marital Status, Religion, Nationality */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <select
                      onChange={data_handler}
                      name="marital"
                      className={`border p-2.5 rounded-md w-full ${error?.marital ? 'border-red-500' : ''}`}
                      defaultValue=""
                    >
                      <option disabled value="">&nbsp; Marital Status</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Widowed</option>
                      <option>Divorced</option>
                    </select>
                    {error?.marital && (
                      <span className="text-red-500 text-sm mt-1">
                        This field is required.
                      </span>
                    )}
                  </div>

                  <Input
                    onChange={data_handler}
                    value={applicantForm.religion ?? ""}
                    required={!!error?.religion}
                    name="religion"
                    label="Religion"
                    type="text"
                  />

                  <Input
                    onChange={data_handler}
                    value={applicantForm.nationality ?? ""}
                    required={!!error?.nationality}
                    name="nationality"
                    label="Nationality"
                    type="text"
                  />
                </div>

                {/* Parents’ Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.mmname ?? ""}
                    name="mmname"
                    label="Mother’s Maiden Name"
                    type="text"
                  />
                  <Input
                    onChange={data_handler}
                    value={applicantForm.ffname ?? ""}
                    name="ffname"
                    label="Father’s Full Name"
                    type="text"
                  />
                </div>

                {/* Educational Background */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <select
                      name="educ"
                      className="border p-2.5 rounded-md w-full"
                      onChange={data_handler}
                      defaultValue=""
                    >
                      <option disabled value="">
                        &nbsp; Highest Educational Attainment
                      </option>
                      <option>Elementary Undergraduate</option>
                      <option>Elementary Graduate</option>
                      <option>Highschool/K-12 Undergraduate</option>
                      <option>Highschool/K-12 Graduate</option>
                      <option>College Level</option>
                      <option>College Graduate</option>
                      <option>Vocational Graduate</option>
                      <option>Masteral Degree</option>
                      <option>Doctoral Degree</option>
                    </select>
                  </div>

                  <Input
                    onChange={data_handler}
                    value={applicantForm.courset ?? ""}
                    name="courset"
                    label="Course Taken"
                    type="text"
                  />
                </div>
              </div>

              <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
                Address Information
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 w-full">
                <div className="flex flex-col w-full">
                  <Select
                    onChange={data_handler}
                    options={region.map(res => ({
                      label: res.region_name,
                      value: JSON.stringify({
                        name: res.region_name,
                        region_code: res.region_code,
                      }),
                    }))}
                    name="region"
                    label="Region"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Select
                    onChange={data_handler}
                    options={newProvince.map(res => ({
                      label: res.province_name,
                      value: JSON.stringify({
                        name: res.province_name,
                        province_code: res.province_code,
                      }),
                    }))}
                    name="province"
                    label="Province"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <Select
                    onChange={data_handler}
                    options={newCity.map(res => ({
                      label: res.city_name,
                      value: JSON.stringify({
                        name: res.city_name,
                        city_code: res.city_code,
                      }),
                    }))}
                    name="city"
                    label="City/Municipality"
                  />
                </div>
              </div>

              {/* Barangay and Lot/Street */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex flex-col w-full">
                  <Select
                    onChange={data_handler}
                    options={newBarangay.map(res => ({
                      label: res.brgy_name,
                      value: res.brgy_name,
                    }))}
                    name="brgy"
                    label="Barangay"
                  />
                </div>
                <div className="flex flex-col w-full space-y-1 sm:space-y-2">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.lot ?? ""}
                    name="lot"
                    label="House/Lot No., Street, Purok/Sitio"
                    type="text"
                    className="w-full"
                  />
                </div>

              </div>
              <h1 className="text-xl font-semibold mb-3 text-gray-900 mt-9">
                Government ID Information
              </h1>

              {/* SSS & Pag-IBIG */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.sss ?? ""}
                    name="sss"
                    label="SSS No."
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.pagibig ?? ""}
                    name="pagibig"
                    label="Pag-IBIG No."
                    type="text"
                  />
                </div>
              </div>

              {/* TIN & PhilHealth */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.tin ?? ""}
                    name="tin"
                    label="Tin No."
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.philh ?? ""}
                    name="philh"
                    label="PhilHealth No."
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
              <h1 className="text-xl font-semibold mb-3 text-gray-900 mt-7">
                Emergency Contact Information
              </h1>

              {/* Fullname */}
              <div className="mb-4 w-full">
                <Input
                  onChange={data_handler}
                  value={applicantForm.ename ?? ""}
                  name="ename"
                  label="Emergency Contact Fullname"
                  type="text"
                />
              </div>

              {/* Address */}
              <div className="mb-4 w-full">
                <Input
                  onChange={data_handler}
                  value={applicantForm.eaddress ?? ""}
                  name="eaddress"
                  label="Address"
                  type="text"
                />
              </div>

              {/* Relationship and Contact Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.relationship ?? ""}
                    name="relationship"
                    label="Relationship"
                    type="text"
                  />
                </div>
                <div className="w-full">
                  <Input
                    onChange={data_handler}
                    value={applicantForm.ephone ?? ""}
                    name="ephone"
                    label="Contact No."
                    type="number"
                  />
                </div>
              </div>
              <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload your CV
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly
                  prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
              {/* <UploadResumeSection
                files={uploadedFile}
                setFiles={setUploadedFile}
              /> */}
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
