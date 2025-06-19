// MyForm.jsx
import Input2 from "@/app/pages/_components/input2";
import Select from "@/app/pages/_components/select";
import Select2 from "@/app/pages/_components/select2";
import { PlusIcon, UserPlusIcon } from "@heroicons/react/24/outline";
import { Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import region from "@/app/address/region.json";
import province from "@/app/address/province.json";
import city from "@/app/address/city.json";
import barangay from "@/app/address/barangay.json";
import Checkbox from "@/app/pages/_components/checkbox";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import store from "@/app/store/store";
import { useSelector } from "react-redux";
import { store_applicant_thunk } from "../../admin/recruitment/applicants/applicant_records/redux/applicant-thunk";
const { Dragger } = Upload;

export default function ApplicationFormSection() {
  const { user } = useSelector((state) => state.app);
  const [newProvince, setNewProvince] = useState([]);
  const [newCity, setNewCity] = useState([]);
  const [newBarangay, setNewBarangay] = useState([]);
  const [address, setAddress] = useState({});
  const [open, setOpen] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [files, setFiles] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    defaultValues: {
      work_experience: [
        { company: "", position: "", started_at: "", end_at: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience",
  });

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


  console.log("files", files);
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
        message.success(
          `${info.file.name} file uploaded successfully.`
        );
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onRemove(file) {
      setFiles((prevFiles) =>
        prevFiles.filter((f) => f.file.name !== file.name)
      );
      return true; // allow UI to remove it too
    },

    // onDrop(e) {
    //     console.log("Dropped files", e.dataTransfer.files);
    // },
  };
  const onSubmit = async (data) => {
    // data.prevent.defaultValues
    // console.log("Form Submitted:");
    try {
      const result = await store.dispatch(
        store_applicant_thunk({
          ...data,
          province: JSON.parse(data?.province).name,
          city: JSON.parse(data?.city).name,
          region: JSON.parse(data?.region).name,
          files: files.map((res) => res.files),
          is_experience: hasExperience,
        })
      );
      await store.dispatch(get_applicant_thunk())
      reset();
      setFiles([]);
      setOpen(false);
      message.success('Application has been submitted successfully');
    } catch (error) { }

    // reset(); // optional: reset the form after submit
  };

  function data_handler(e) {
    console.log("dadwa", e.target.value);
    if (e.target.name == "region") {
      const region = JSON.parse(e.target.value);
      const prov = province.filter(
        (obj) => obj.region_code === region.region_code
      );
      setNewProvince(prov);
      setAddress({
        ...address,
        [e.target.name]: region.name,
      });
    } else if (e.target.name == "province") {
      const province = JSON.parse(e.target.value);
      const ct = city.filter(
        (obj) => obj.province_code === province.province_code
      );
      setNewCity(ct);
      setAddress({
        ...address,
        [e.target.name]: province.name,
      });
    } else if (e.target.name == "city") {
      const city = JSON.parse(e.target.value);
      const brgy = barangay.filter(
        (obj) => obj.city_code === city.city_code
      );
      setNewBarangay(brgy);
      setAddress({
        ...address,
        [e.target.name]: city.name,
      });
    }
  }
  return (
    <>
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
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 px-8 py-8"
              >
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Site Information
                </h1>
                <div className="flex-none w-1/2">
                  <Select
                    register={{
                      ...register("site", {
                        required: false,
                      }),
                    }}
                    options={[
                      { label: "San Carlos", value: "San Carlos" },
                      { label: "Carcar", value: "Carcar" },
                    ]}
                    label="Site"
                    name="site"
                  />
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Personal Information
                </h1>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("fname", {
                          required: "First Name is required",
                        }),
                      }}
                      errorMessage={errors?.fname?.message}
                      name="fname"
                      label="First Name"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("mname", {
                          required: "Middle Name is required",
                        }),
                      }}
                      errorMessage={errors?.mname?.message}
                      name="mname"
                      label="Middle Name"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("lname", {
                          required: "Last Name is required",
                        }),
                      }}
                      errorMessage={errors?.lname?.message}
                      name="lname"
                      label="Last Name"
                      type="text"
                    />
                  </div>
                  <div className="flex-none w-24">
                    <Select
                      register={{
                        ...register("suffix", {
                          required: false,
                        }),
                      }}
                      options={[
                        { label: "--", value: "" },
                        { label: "Sr.", value: "Sr." },
                        { label: "Jr.", value: "Jr." },
                        { label: "II", value: "II" },
                        { label: "III", value: "III" },
                        { label: "IV", value: "IV" },
                        { label: "V", value: "V" },
                      ]}
                      label="Suffix"
                      name="name"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Select2
                      register={{
                        ...register("gender", {
                          required: "Gender is required",
                        }),
                      }}
                      options={[
                        { label: "Male", value: "Male" },
                        { label: "Female", value: "Female" },
                      ]}
                      errorMessage={errors?.gender?.message}
                      label="Gender"
                      name="gender"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("dob", {
                          required: "Date of Birth is required",
                        }),
                      }}
                      errorMessage={errors?.dob?.message}
                      name="dob"
                      label="Date of Birth"
                      type="date"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("email", {
                          required: "Email is required",
                        }),
                      }}
                      errorMessage={errors?.email?.message}
                      name="email"
                      label="Email"
                      type="email"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("phone", {
                          required: "Phone is required",
                        }),
                      }}
                      errorMessage={errors?.phone?.message}
                      name="phone"
                      label="Phone"
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("marital", {
                          required: false,
                        }),
                      }}
                      options={[
                        { label: "Single", value: "Single" },
                        { label: "Married", value: "Married" },
                        { label: "Widowed", value: "Widowed" },
                        { label: "Divorced", value: "Divorced" },
                      ]}
                      label="Marital Status"
                      name="marital"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("religion", {
                          required: false,
                        }),
                      }}
                      name="religion"
                      label="Religion"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("nationality", {
                          required: false,
                        }),
                      }}
                      name="nationality"
                      label="Nationality"
                      type="text"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("mmname", {
                          required:
                            false,
                        }),
                      }}
                      name="mmname"
                      label="Mother's maiden name"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("ffname", {
                          required: false,
                        }),
                      }}
                      name="ffname"
                      label="Father's fullname"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("educ", {
                          required: false,
                        }),
                      }}
                      options={[
                        {
                          label: "Highest Educational Attainmen",
                          value: "Highest Educational Attainmen",
                        },
                        {
                          label: "Elementary Undergraduate",
                          value: "Elementary Undergraduate",
                        },
                        {
                          label: "Elementary Graduate",
                          value: "Elementary Graduate",
                        },
                        {
                          label: "Highschool/K-12 Undergraduate",
                          value: "Highschool/K-12 Undergraduate",
                        },
                        {
                          label: "Highschool/K-12 Graduate",
                          value: "Highschool/K-12 Graduate",
                        },
                        {
                          label: "College Level",
                          value: "College Level",
                        },
                        {
                          label: "College Graduate",
                          value: "College Graduate",
                        },
                        {
                          label: "Vocational Graduate",
                          value: "Vocational Graduate",
                        },
                        {
                          label: "Masteral Degree",
                          value: "Masteral Degree",
                        },
                        {
                          label: "Doctoral Degree",
                          value: "Doctoral Degree",
                        },
                      ]}
                      label="Highest Educational Attainment"
                      name="educ"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("courset", {
                          required: false,
                        }),
                      }}
                      name="courset"
                      label="Course taken"
                      type="text"
                    />
                  </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Address Information
                </h1>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("region", {
                          required: "Please Select Region",
                        }),
                      }}
                      onChange={(event) => data_handler(event)}

                      options={region.map((res) => ({
                        label: res.region_name,
                        value: JSON.stringify({
                          name: res.region_name,
                          region_code: res.region_code,
                        }),
                      }))}
                      // value={address.region}
                      errorMessage={errors?.region?.message}
                      label="Region"
                      name="region"
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("province", {
                          required: "Please Select Province"
                        }),
                      }}
                      onChange={(event) => data_handler(event)}

                      options={newProvince.map((res) => ({
                        label: res.province_name,
                        value: JSON.stringify({
                          name: res.province_name,
                          province_code: res.province_code,
                        }),
                      }))}
                      errorMessage={errors?.province?.message}
                      label="Province"
                      name="province"
                    />
                  </div>
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("city", {
                          required: "Please Select City"
                        }),
                      }}
                      onChange={(event) => data_handler(event)}

                      options={newCity.map((res) => ({
                        label: res.city_name,
                        value: JSON.stringify({
                          name: res.city_name,
                          city_code: res.city_code,
                        }),
                      }))}
                      errorMessage={errors?.city?.message}
                      name="city"
                      label="City/Municipality"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Select
                      register={{
                        ...register("brgy", {
                          required: "Please Select Barangay"
                        }),
                      }}
                      onChange={(event) => data_handler(event)}

                      options={newBarangay.map((res) => ({
                        label: res.brgy_name,
                        value: res.brgy_name,
                      }))}
                      errorMessage={errors?.brgy?.message}
                      name="brgy"
                      label="Barangay"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("lot", {
                          required:
                            "House/Lot No., Street, Purok/Sitio is required",
                        }),
                      }}
                      errorMessage={errors?.lot?.message}
                      name="lot"
                      label="House/Lot No., Street, Purok/Sitio"
                      type="text"
                    />
                  </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Government ID Information
                </h1>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("sss", {
                        }),
                      }}
                      name="sss"
                      label="SSS"
                      type="number"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("pagibig", {
                        }),
                      }}
                      name="pagibig"
                      label="Pagibig"
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("tin", {
                        }),
                      }}
                      name="tin"
                      label="Tin"
                      type="number"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("philh", {
                        }),
                      }}
                      name="philh"
                      label="Philhealth No."
                      type="number"
                    />
                  </div>
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Working Experience
                </h1>

                <div className="flex-col">
                  <div className="flex items-center mb-3 justify-between">
                    <Checkbox
                      label="With Working Experience?"
                      name="hasExperience"
                      // error=""
                      onChange={(e) =>
                        setHasExperience(e.target.checked)
                      }
                    />
                    {hasExperience && (
                      <button
                        type="button"
                        onClick={() => append({ name: "" })}
                        className="bg-blue-600 text-white px-4 flex gap-2 py-2 rounded"
                      >
                        <PlusIcon className="h-6" /> Experience
                      </button>
                    )}
                  </div>
                  {hasExperience && (
                    <div className="flex gap-3 flex-col">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex items-center border border-blue-500 rounded-lg p-3 flex-col w-full gap-4"
                        >
                          {index != 0 && (
                            <div className="flex w-full items-end justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  remove(index)
                                }
                                className="bg-red-500 text-white px-2 py-1 rounded"
                              >
                                ✕
                              </button>
                            </div>
                          )}

                          <div className="w-full flex gap-3">
                            <Input2
                              register={{
                                ...register(
                                  `work_experience.${index}.company`,
                                  {
                                    required:
                                      "Company is required",
                                  }
                                ),
                              }}
                              errorMessage={
                                errors?.work_experience?.[
                                  index
                                ]?.company?.message
                              }
                              name="company"
                              label="Company"
                              type="text"
                            />
                            <Input2
                              register={{
                                ...register(
                                  `work_experience.${index}.position`,
                                  {
                                    required:
                                      "Position is required",
                                  }
                                ),
                              }}
                              errorMessage={
                                errors?.work_experience?.[
                                  index
                                ]?.position?.message
                              }
                              name="position"
                              label="Position"
                              type="text"
                            />
                          </div>

                          <div className="w-full flex gap-3">
                            <Input2
                              register={{
                                ...register(
                                  `work_experience.${index}.started_at`,
                                  {
                                    required:
                                      "Started at is required",
                                  }
                                ),
                              }}
                              errorMessage={
                                errors?.work_experience?.[
                                  index
                                ]?.started_at?.message
                              }
                              label="Started At"
                              type="date"
                            />
                            <Input2
                              register={{
                                ...register(
                                  `work_experience.${index}.end_at`,
                                  {
                                    required:
                                      "End at is required",
                                  }
                                ),
                              }}
                              errorMessage={
                                errors?.work_experience?.[
                                  index
                                ]?.end_at?.message
                              }
                              label="End At"
                              type="date"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-semibold mb-3 text-gray-900 ">
                  Emergency Contact Information
                </h1>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("ename", {
                          required:
                            false,
                        }),
                      }}
                      name="ename"
                      label="Emergency Contact Fullname"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("eaddress", {
                          required: false,
                        }),
                      }}
                      name="eaddress"
                      label="Address"
                      type="text"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-3 lg:flex-row">
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("relationship", {
                          required: false,
                        }),
                      }}
                      name="relationship"
                      label="Relationship"
                      type="text"
                    />
                  </div>
                  <div className="flex-1">
                    <Input2
                      register={{
                        ...register("ephone", {
                          required: false,
                        }),
                      }}
                      name="ephone"
                      label="Contact No."
                      type="number"
                    />
                  </div>
                </div>
                <br />
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
                <div className="flex items-end justify-end">
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div></div>
      </div>
    </>
  );
}
