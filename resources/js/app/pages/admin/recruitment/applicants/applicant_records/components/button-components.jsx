// import React, { useState } from "react";
// import {
//     AuditOutlined,
//     CalendarOutlined,
//     CheckCircleFilled,
//     DotChartOutlined,
//     DownOutlined,
//     InfoCircleOutlined,
//     LoadingOutlined,
//     MedicineBoxOutlined,
//     RiseOutlined,
//     ScheduleOutlined,
// } from "@ant-design/icons";
// import { Button, Dropdown, message, Space, Modal, Menu } from "antd";
// import { BriefcaseIcon, CalendarIcon } from "@heroicons/react/24/outline";
// import { router } from "@inertiajs/react";
// import { setApplicants } from "../redux/applicant-slice";
// import store from "@/app/store/store";
// import {
//     get_applicant_thunk,
//     sendiv_email_thunk,
// } from "../redux/applicant-thunk";

// const ButtonComponents = ({ data,interviewer }) => {
//     const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] =
//         useState(false);
//     const [initialPhaseModalOpen, setInitialPhaseModalOpen] = useState(false);
//     const [faceToFaceInitialModalOpen, setFaceToFaceInitialModalOpen] =
//         useState(false);
//     const [virtualInitialModalOpen, setVirtualInitialModalOpen] =
//         useState(false);
//     const [finalPhaseModalOpen, setFinalPhaseModalOpen] = useState(false);
//     const [faceToFaceFinalModalOpen, setFaceToFaceFinalModalOpen] =
//         useState(false);
//     const [virtualFinalModalOpen, setVirtualFinalModalOpen] = useState(false);
//     const [finalInterviewerModalOpen, setFinalInterviewerModalOpen] =
//         useState(false);
//     const [jobOfferModalOpen, setJobOfferModalOpen] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [initial, setInitial] = useState({
//         ifftime: "",
//         iffdate: "",
//         ivtime: "",
//         ivdate: "",
//         meet_link: "",
//     });

//     //   async function sendInitialEmail(e) {
//     //     e.preventDefault();
//     //     if (confirm("Are you sure you want to send the email?")) {
//     //         setLoading(true);
//     //         try {
//     //             const response = await axios.post('/api/sendif_email', {
//     //                 ...data,
//     //                 status: "Initial Phase",
//     //                 ifftime: initial.ifftime,
//     //                 iffdate: initial.iffdate
//     //             });
//     //             console.log(response.data);
//     //             message.success('Email sent successfully');
//     //             dispatch(setApplicants(response.data.status));
//     //             setFaceToFaceInitialModalOpen(false);
//     //         } catch (error) {
//     //             message.error('There was an error sending the email!');
//     //             console.error('There was an error sending the email!', error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     }
//     // }

//     // store.dispatch(get_applicant_thunk())
//     const sendInitialEmail = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             store.dispatch(
//                 sendiv_email_thunk({
//                     ...data,
//                     ifftime: initial.ifftime,
//                     iffdate: initial.iffdate,
//                 })
//             );
//             store.dispatch(get_applicant_thunk());
//             setLoading(false);
//             setFaceToFaceInitialModalOpen(false);
//             message.success("Email sent successfully");
//         } catch (error) {
//             message.error("There was an error sending the email!");
//             setLoading(false);
//         }
//     };

//     const sendInitialvEmail = (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             store.dispatch(
//                 sendiv_email_thunk({
//                     ...data,
//                     ivtime: initial.ivtime,
//                     ivdate: initial.ivdate,
//                     meet_link: initial.meet_link,
//                 })
//             );
//             store.dispatch(get_applicant_thunk());
//             setLoading(false);
//             setVirtualInitialModalOpen(false);
//             message.success("Email sent successfully");
//         } catch (error) {
//             message.error("There was an error sending the email!");
//             setLoading(false);
//         }
//     };

//     const handleButtonClick = () => {
//         console.log("click left button");
//         setInitialPhaseModalOpen(false);
//         setFaceToFaceInitialModalOpen(true);
//     };

//     const handleButtonClick1 = () => {
//         console.log("click left button");
//         setInitialPhaseModalOpen(false);
//         setVirtualInitialModalOpen(true);
//     };

//     const handleButtonClick2 = () => {
//         console.log("click left button");
//         setFinalPhaseModalOpen(false);
//         setFaceToFaceFinalModalOpen(true);
//     };

//     const handleButtonClick3 = () => {
//         console.log("click left button");
//         setFinalPhaseModalOpen(false);
//         setVirtualFinalModalOpen(true);
//     };

//     const handleButtonClick4 = () => {
//         console.log("click left button");
//         window.open("/admin/interviewer_sched", "_blank");
//     };
//     const handleMenuClick = (item) => {
//         if (item.onClick) item.onClick();
//         if (item.key === "1") setApplicationDetailsModalOpen(true);
//         if (item.key === "2") setInitialPhaseModalOpen(true);
//         if (item.key === "3") {
//             window.open(`/admin/initial_rate/${data.app_id}`, "_blank");
//         }
//         if (item.key === "4") {
//             window.open("/admin/initial_result", "_blank");
//         }
//         if (item.key === "5") {
//             window.open("/admin/final_rate", "_blank");
//         }
//         if (item.key === "6") setFinalPhaseModalOpen(true);
//         if (item.key === "7") setFinalInterviewerModalOpen(true);
//         if (item.key === "8") {
//             window.open("/admin/overall_result", "_blank");
//         }
//         if (item.key === "9") setJobOfferModalOpen(true);
//     };

//     const items = [
//         {
//             label: "Application Details",
//             key: "1",
//             icon: <AuditOutlined />,
//         },
//         ...(data.status == "Pending"
//             ? [
//                   {
//                       label: "Proceed to Initial Phase",
//                       key: "2",
//                       icon: <RiseOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Initial Phase"
//             ? [
//                   {
//                       label: "Initial Rating Scale",
//                       key: "3",
//                       icon: <DotChartOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Final Phase"
//             ? [
//                   {
//                       label: "Initial Phase Result",
//                       key: "4",
//                       icon: <InfoCircleOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Final Phase" && data.final
//             ? [
//                   {
//                       label: "Final Rating Scale",
//                       key: "5",
//                       icon: <DotChartOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Final Phase" && !data.final
//             ? [
//                   {
//                       label: "Set Schedule Final Phase",
//                       key: "6",
//                       icon: <CalendarOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Final Phase" && !data.final
//             ? [
//                   {
//                       label: "Check Schedule of Interviewer",
//                       key: "7",
//                       icon: <ScheduleOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Passed" ||
//         data.status == "Pooling" ||
//         data.status == "Failed" ||
//         data.status == "Dismissal" ||
//         data.status == "Resignation" ||
//         data.status == "EOPE" ||
//         data.status == "AWOL" ||
//         data.status == "Probationary" ||
//         data.status == "Regular"
//             ? [
//                   {
//                       label: "Application Results",
//                       key: "8",
//                       icon: <InfoCircleOutlined />,
//                   },
//               ]
//             : []),
//         ...(data.status == "Passed"
//             ? [
//                   {
//                       label: "Job Offer",
//                       key: "9",
//                       icon: <BriefcaseIcon className="h-4 mr-0.5" />,
//                   },
//               ]
//             : []),
//     ];

//     return (
//         <Space wrap>
//             <Dropdown
//                 overlay={
//                     <Menu onClick={handleMenuClick}>
//                         {items.map((item) => (
//                             <Menu.Item key={item.key} icon={item.icon}>
//                                 {item.label}
//                             </Menu.Item>
//                         ))}
//                     </Menu>
//                 }
//                 trigger={["click"]}
//             >
//                 <Button type="primary">
//                     <Space>
//                         Menu
//                         <DownOutlined />
//                     </Space>
//                 </Button>
//             </Dropdown>

//             <Modal
//                 title="Application Details"
//                 centered
//                 visible={applicationDetailsModalOpen}
//                 onOk={() => setApplicationDetailsModalOpen(false)}
//                 onCancel={() => setApplicationDetailsModalOpen(false)}
//                 width={1200}
//                 footer={null}
//             >
//                 <div className="flex text-2xl items-center justify-center">
//                     <h1>
//                         <b>Personal Information</b>
//                     </h1>
//                 </div>
//                 <div className="flex justify-end">
//                     <h1 className="text-lg mb-2">
//                         <b>Status:</b> {data.status}
//                     </h1>
//                 </div>
//                 <form className="border rounded-lg p-3.5">
//                     <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
//                     <div className="mb-4">
//                         <label htmlFor="">
//                             <b>Application No.</b>
//                         </label>
//                         <input
//                             type="number"
//                             value={data.app_id}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full"
//                             readOnly
//                         />
//                     </div>
//                     <div className="flex flex-1 gap-4">
//                         <div className="flex flex-col w-full mb-4">
//                             <label htmlFor="">
//                                 <b>Full Name</b>
//                             </label>
//                             <div className="flex flex-1 gap-3">
//                                 <input
//                                     type="text"
//                                     value={data.fname}
//                                     placeholder="N/A"
//                                     className="border p-2 rounded w-full"
//                                     readOnly
//                                 />
//                                 <input
//                                     type="text"
//                                     value={data.mname}
//                                     placeholder="N/A"
//                                     className="border p-2 rounded w-full"
//                                     readOnly
//                                 />
//                                 <input
//                                     type="text"
//                                     value={data.lname}
//                                     placeholder="N/A"
//                                     className="border p-2 rounded w-full"
//                                     readOnly
//                                 />
//                                 <input
//                                     type="text"
//                                     value={data.suffix}
//                                     placeholder="(Suffix)"
//                                     className="border p-2 rounded w-1/5"
//                                     readOnly
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <div className="flex flex-1 gap-4">
//                         <div className="flex w-full">
//                             <div className="flex flex-col gap-4 mb-4 w-full">
//                                 <div className="flex flex-col w-full">
//                                     <label htmlFor="">
//                                         <b>Gender</b>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={data.gender}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full"
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className="flex flex-col w-full">
//                                     <label htmlFor="">
//                                         <b>Date of Birth</b>
//                                     </label>
//                                     <input
//                                         type="date"
//                                         value={data.dob}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full"
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className=" w-full">
//                                     <label htmlFor="">
//                                         <b>Email</b>
//                                     </label>
//                                     <input
//                                         type="email"
//                                         value={data.email}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full "
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className="w-full">
//                                     <label htmlFor="">
//                                         <b>Phone Number</b>
//                                     </label>
//                                     <input
//                                         type="number"
//                                         value={data.phone}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full "
//                                         readOnly
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="flex w-full">
//                             <div className="flex flex-col gap-4 mb-4 w-full">
//                                 <div className="flex flex-col w-full">
//                                     <label htmlFor="">
//                                         <b>Marital Status</b>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={data.marital}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full "
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className="flex flex-col w-full">
//                                     <label htmlFor="">
//                                         <b>Religion</b>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={data.religion}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full"
//                                         readOnly
//                                     />
//                                 </div>
//                                 <div className="flex flex-col w-full">
//                                     <label htmlFor="">
//                                         <b>Nationality</b>
//                                     </label>
//                                     <input
//                                         type="text"
//                                         value={data.nationality}
//                                         placeholder="N/A"
//                                         className="border p-2 rounded w-full"
//                                         readOnly
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="">
//                             <b>Mother's Maiden Name</b>
//                         </label>
//                         <input
//                             type="text"
//                             value={data.mmname}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full "
//                             readOnly
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label htmlFor="">
//                             <b>Father's Full Name</b>
//                         </label>
//                         <input
//                             type="text"
//                             value={data.ffname}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full "
//                             readOnly
//                         />
//                     </div>
//                     <div className="flex flex-1 gap-4 mb-4">
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Highest Educational Attainment</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.educ}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Course Taken (Only if Applicable)</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.courset}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                     </div>
//                     <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
//                         Address Information
//                     </h1>
//                     <div className="mb-4">
//                         <label htmlFor="">
//                             <b>
//                                 House/Lot No. , Street , Purok/Sitio , Barangay
//                                 , City/Municipality , Province
//                             </b>
//                         </label>
//                         <input
//                             type="text"
//                             value={data.caddress}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full"
//                             readOnly
//                         />
//                     </div>
//                     <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
//                         Government ID Information
//                     </h1>
//                     <div className="flex flex-1 gap-4 mb-4">
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>SSS No.</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.sss}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Pag-IBIG No.</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.pagibig}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                     </div>
//                     <div className="flex flex-1 gap-4 mb-4">
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Tin No.</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.tin}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Philhealth No.</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.philh}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                     </div>
//                     <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">
//                         Emergency Contact Information
//                     </h1>
//                     <div className="mb-4 w-full">
//                         <label htmlFor="">
//                             <b>Emergency Contact Fullname</b>
//                         </label>
//                         <input
//                             type="text"
//                             value={data.ename}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full "
//                             readOnly
//                         />
//                     </div>
//                     <div className="mb-4 w-full">
//                         <label htmlFor="">
//                             <b>Address</b>
//                         </label>
//                         <input
//                             type="text"
//                             value={data.eaddress}
//                             placeholder="N/A"
//                             className="border p-2 rounded w-full "
//                             readOnly
//                         />
//                     </div>
//                     <div className="flex flex-1 gap-4 mb-4">
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Relationship</b>
//                             </label>
//                             <input
//                                 type="text"
//                                 value={data.relationship}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                         <div className="w-full">
//                             <label htmlFor="">
//                                 <b>Contact No.</b>
//                             </label>
//                             <input
//                                 type="number"
//                                 value={data.ephone}
//                                 placeholder="N/A"
//                                 className="border p-2 rounded w-full "
//                                 readOnly
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </Modal>

//             <Modal
//                 title="Initial Phase Interview"
//                 centered
//                 visible={initialPhaseModalOpen}
//                 onOk={() => {
//                     setInitialPhaseModalOpen(false);
//                 }}
//                 onCancel={() => setInitialPhaseModalOpen(false)}
//                 footer={null}
//             >
//                 <div className="flex flex-1 gap-2 w-full">
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick}
//                     >
//                         Face to face Interview
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick1}
//                     >
//                         Virtual Interview
//                     </Button>
//                 </div>
//             </Modal>

//             <Modal
//                 title="Schedule for Initial Phase Interview (Face to face Interview)"
//                 centered
//                 visible={faceToFaceInitialModalOpen}
//                 width={900}
//                 onOk={() => {
//                     setFaceToFaceInitialModalOpen(false);
//                 }}
//                 onCancel={() => setFaceToFaceInitialModalOpen(false)}
//                 footer={null}
//             >
//                 <li className="bg-gray-300 h-0.5"></li>
//                 <div className="flex justify-end mt-1.5">
//                     <h1>
//                         <b>Status:</b> {data.status}
//                     </h1>
//                 </div>
//                 <form onSubmit={sendInitialEmail} className="w-full h-full">
//                     <div className="flex flex-col -mx-3 mb-3">
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1"
//                                 for="grid-text"
//                             >
//                                 Application No.
//                             </label>
//                             <input
//                                 value={data.app_id}
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="grid-text"
//                                 type="number"
//                                 placeholder=""
//                                 readOnly
//                             />
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Applicant's Name
//                                 </label>
//                                 <input
//                                     value={`${data.fname} ${data.mname} ${data.lname}`}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Email Address
//                                 </label>
//                                 <input
//                                     value={data.email}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="email"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1 ">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Contact No.
//                                 </label>
//                                 <input
//                                     value={data.phone}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule date for Initial Interview
//                                 </label>
//                                 <input
//                                     onChange={(e) =>
//                                         setInitial({
//                                             ...initial,
//                                             iffdate: e.target.value,
//                                         })
//                                     }
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="date"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule time for Initial Interview
//                                 </label>
//                                 <input
//                                     onChange={(e) =>
//                                         setInitial({
//                                             ...initial,
//                                             ifftime: e.target.value,
//                                         })
//                                     }
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="time"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     {/* <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
//           <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea> */}
//                     <button
//                         type="submit"
//                         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
//                             loading ? "cursor-not-allowed opacity-75" : ""
//                         }`}
//                         onClick={sendInitialEmail}
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <LoadingOutlined spin />
//                         ) : (
//                             <CheckCircleFilled />
//                         )}
//                         {loading ? " SENDING..." : " CONFIRM"}
//                     </button>
//                 </form>
//             </Modal>

//             <Modal
//                 title="Schedule for Initial Phase Interview (Virtual Interview)"
//                 centered
//                 visible={virtualInitialModalOpen}
//                 width={900}
//                 onOk={() => {
//                     setVirtualInitialModalOpen(false);
//                 }}
//                 onCancel={() => setVirtualInitialModalOpen(false)}
//                 footer={null}
//             >
//                 <li className="bg-gray-300 h-0.5"></li>
//                 <div className="flex justify-end mt-1.5">
//                     <h1>
//                         <b>Status:</b> {data.status}
//                     </h1>
//                 </div>
//                 <form className="w-full h-full" onSubmit={sendInitialvEmail}>
//                     <div className="flex flex-col -mx-3 mb-3">
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1"
//                                 for="grid-text"
//                             >
//                                 Application No.
//                             </label>
//                             <input
//                                 value={data.app_id}
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="grid-text"
//                                 type="number"
//                                 placeholder=""
//                                 readOnly
//                             />
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Applicant's Name
//                                 </label>
//                                 <input
//                                     value={`${data.fname} ${data.mname} ${data.lname}`}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Email Address
//                                 </label>
//                                 <input
//                                     value={data.email}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="email"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-3/5 px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Contact No.
//                                 </label>
//                                 <input
//                                     value={data.phone}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Meeting Link
//                                 </label>
//                                 <input
//                                     onChange={(e) =>
//                                         setInitial({
//                                             ...initial,
//                                             meet_link: e.target.value,
//                                         })
//                                     }
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1 ">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule date for Initial Interview
//                                 </label>
//                                 <input
//                                     onChange={(e) =>
//                                         setInitial({
//                                             ...initial,
//                                             ivdate: e.target.value,
//                                         })
//                                     }
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="date"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule time for Initial Interview
//                                 </label>
//                                 <input
//                                     onChange={(e) =>
//                                         setInitial({
//                                             ...initial,
//                                             ivtime: e.target.value,
//                                         })
//                                     }
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="time"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${
//                             loading ? "cursor-not-allowed opacity-75" : ""
//                         }`}
//                         onClick={sendInitialvEmail}
//                         disabled={loading}
//                     >
//                         {loading ? (
//                             <LoadingOutlined spin />
//                         ) : (
//                             <CheckCircleFilled />
//                         )}
//                         {loading ? " SENDING..." : " CONFIRM"}
//                     </button>
//                 </form>
//             </Modal>

//             <Modal
//                 title="Final Phase Interview"
//                 centered
//                 visible={finalPhaseModalOpen}
//                 onOk={() => {
//                     setFinalPhaseModalOpen(false);
//                 }}
//                 onCancel={() => setFinalPhaseModalOpen(false)}
//                 footer={null}
//             >
//                 <div className="flex flex-1 gap-2 w-full">
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick2}
//                     >
//                         Face to face Interview
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick3}
//                     >
//                         Virtual Interview
//                     </Button>
//                 </div>
//             </Modal>

//             <Modal
//                 title="Schedule for Final Phase Interview (Face to face Interview)"
//                 centered
//                 visible={faceToFaceFinalModalOpen}
//                 width={900}
//                 onOk={() => {
//                     setFaceToFaceFinalModalOpen(false);
//                 }}
//                 onCancel={() => setFaceToFaceFinalModalOpen(false)}
//                 footer={null}
//             >
//                 <li className="bg-gray-300 h-0.5"></li>
//                 <div className="flex justify-end mt-1.5">
//                     <h1>
//                         <b>Status:</b> (Final Phase)
//                     </h1>
//                 </div>
//                 <form className="w-full h-full">
//                     <div className="flex flex-col -mx-3 mb-3">
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1"
//                                 for="grid-text"
//                             >
//                                 Application No.
//                             </label>
//                             <input
//                                 value={data.app_id}
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="grid-text"
//                                 type="number"
//                                 placeholder=""
//                                 readOnly
//                             />
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Applicant's Name
//                                 </label>
//                                 <input
//                                     value={`${data.fname} ${data.mname} ${data.lname}`}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Email Address
//                                 </label>
//                                 <input
//                                     value={data.email}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="email"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1 ">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Contact No.
//                                 </label>
//                                 <input
//                                     value={data.phone}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule date for Final Interview
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="date"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule time for Final Interview
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="time"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                 for="grid-text"
//                             >
//                                 Final Phase Interviewer
//                             </label>
//                             <select
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 name=""
//                                 id=""
//                             >
//                               {
//                                 interviewer.map((res,i)=>{
//                                   return <option value={res.employee_id} key={i}>{res.employee_fname} {res.employee_lname}</option>
//                                 })
//                               }
                                
//                             </select>
//                         </div>
//                     </div>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
//                         <CheckCircleFilled /> CONFIRM
//                     </button>
//                 </form>
//             </Modal>

//             <Modal
//                 title="Schedule for Final Phase Interview (Virtual Interview)"
//                 centered
//                 visible={virtualFinalModalOpen}
//                 width={900}
//                 onOk={() => {
//                     setVirtualFinalModalOpen(false);
//                 }}
//                 onCancel={() => setVirtualFinalModalOpen(false)}
//                 footer={null}
//             >
//                 <li className="bg-gray-300 h-0.5"></li>
//                 <div className="flex justify-end mt-1.5">
//                     <h1>
//                         <b>Status:</b> (Final Phase)
//                     </h1>
//                 </div>
//                 <form className="w-full h-full">
//                     <div className="flex flex-col -mx-3 mb-3">
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1"
//                                 for="grid-text"
//                             >
//                                 Application No.
//                             </label>
//                             <input
//                                 value={data.app_id}
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="grid-text"
//                                 type="number"
//                                 placeholder=""
//                                 readOnly
//                             />
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Applicant's Name
//                                 </label>
//                                 <input
//                                     value={`${data.fname} ${data.mname} ${data.lname}`}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Email Address
//                                 </label>
//                                 <input
//                                     value={data.email}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="email"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-3/5 px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Contact No.
//                                 </label>
//                                 <input
//                                     value={data.phone}
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Meeting Link
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1 ">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule date for Initial Interview
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="date"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Schedule time for Initial Interview
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="time"
//                                     placeholder=""
//                                     required
//                                 />
//                             </div>
//                         </div>
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                 for="grid-text"
//                             >
//                                 Final Phase Interviewer
//                             </label>
//                             <select
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 name=""
//                                 id=""
//                             >
//                                 <option value=""></option>
//                             </select>
//                         </div>
//                     </div>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
//                         <CheckCircleFilled /> CONFIRM
//                     </button>
//                 </form>
//             </Modal>

//             <Modal
//                 title="Final Phase Interviewers"
//                 centered
//                 visible={finalInterviewerModalOpen}
//                 width={600}
//                 onOk={() => {
//                     setFinalInterviewerModalOpen(false);
//                 }}
//                 onCancel={() => setFinalInterviewerModalOpen(false)}
//                 footer={null}
//             >
//                 <div className="flex flex-1 mb-3">
//                     <CalendarIcon className="h-6" />
//                     <h1>Check Interviewers Schedule</h1>
//                 </div>
//                 <div className="flex flex-col gap-2.5">
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick4}
//                     >
//                         CUPTA, CIELO - DIRECTOR
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick4}
//                     >
//                         ADMINISTRATOR, SYSTEM - MANAGER
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick4}
//                     >
//                         DETALLA, MARIA TERESA - MANAGER
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick4}
//                     >
//                         GAY, MARICAR - MANAGER
//                     </Button>
//                     <Button
//                         type="primary"
//                         className="w-full"
//                         onClick={handleButtonClick4}
//                     >
//                         SORIANO, ALEJANDRO II - MANAGER
//                     </Button>
//                 </div>
//             </Modal>

//             <Modal
//                 title="Job Offer"
//                 centered
//                 visible={jobOfferModalOpen}
//                 width={900}
//                 onOk={() => {
//                     setJobOfferModalOpen(false);
//                 }}
//                 onCancel={() => setJobOfferModalOpen(false)}
//                 footer={null}
//             >
//                 <li className="bg-gray-300 h-0.5"></li>
//                 <form className="w-full h-full mt-3.5">
//                     <div className="flex flex-col -mx-3 mb-3">
//                         <div className="w-full px-2.5">
//                             <label
//                                 className="block uppercase tracking-wide  text-xs font-bold mb-1"
//                                 for="grid-text"
//                             >
//                                 Application No.
//                             </label>
//                             <input
//                                 className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                 id="grid-text"
//                                 type="number"
//                                 placeholder=""
//                                 readOnly
//                             />
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Firstname
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Middlename
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Lastname
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                         </div>

//                         <div className="flex flex-1">
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Job Position
//                                 </label>
//                                 <select
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     name=""
//                                     id=""
//                                 >
//                                     <option value=""></option>
//                                 </select>
//                             </div>
//                             <div className="w-3/5 px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Salary Offer
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="w-3/5 px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Allowance
//                                 </label>
//                                 <input
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     id="grid-text"
//                                     type="text"
//                                     placeholder=""
//                                 />
//                             </div>
//                             <div className="w-full px-2.5">
//                                 <label
//                                     className="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2"
//                                     for="grid-text"
//                                 >
//                                     Type of Allowance
//                                 </label>
//                                 <select
//                                     className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//                                     name=""
//                                     id=""
//                                 >
//                                     <option value=""></option>
//                                 </select>
//                             </div>
//                         </div>
//                     </div>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
//                         <div className="flex flex-1 items-center justify-center">
//                             <BriefcaseIcon className="h-6 mr-1" />
//                             SEND JOB OFFER
//                         </div>
//                     </button>
//                 </form>
//             </Modal>
//         </Space>
//     );
// };

// export default ButtonComponents;
