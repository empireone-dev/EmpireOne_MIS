
import React, { useState } from 'react';
import { AuditOutlined, CalendarOutlined, CheckCircleFilled, DotChartOutlined, DownOutlined, InfoCircleOutlined, MedicineBoxOutlined, RiseOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import { BriefcaseIcon, CalendarIcon } from '@heroicons/react/24/outline';

const ButtonComponents = () => {
  const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] = useState(false);
  const [initialPhaseModalOpen, setInitialPhaseModalOpen] = useState(false);
  const [faceToFaceInitialModalOpen, setFaceToFaceInitialModalOpen] = useState(false);
  const [virtualInitialModalOpen, setVirtualInitialModalOpen] = useState(false);
  const [finalPhaseModalOpen, setFinalPhaseModalOpen] = useState(false);
  const [faceToFaceFinalModalOpen, setFaceToFaceFinalModalOpen] = useState(false);
  const [virtualFinalModalOpen, setVirtualFinalModalOpen] = useState(false);
  const [finalInterviewerModalOpen, setFinalInterviewerModalOpen] = useState(false);

  const handleButtonClick = () => {
    console.log('click left button');
    setInitialPhaseModalOpen(false);
    setFaceToFaceInitialModalOpen(true);
  };

  const handleButtonClick1 = () => {
    console.log('click left button');
    setInitialPhaseModalOpen(false);
    setVirtualInitialModalOpen(true);
  };

  const handleButtonClick2 = () => {
    console.log('click left button');
    setFinalPhaseModalOpen(false);
    setFaceToFaceFinalModalOpen(true);
  };

  const handleButtonClick3 = () => {
    console.log('click left button');
    setFinalPhaseModalOpen(false);
    setVirtualFinalModalOpen(true);
  };

  const handleMenuClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.key === '1') setApplicationDetailsModalOpen(true);
    if (item.key === '2') setInitialPhaseModalOpen(true);
    if (item.key === '3') { window.open('/admin/initial_rate', '_blank'); }
    if (item.key === '4') { window.open('/admin/initial_result', '_blank'); }
    if (item.key === '5') { window.open('/admin/final_rate', '_blank'); }
    if (item.key === '6') setFinalPhaseModalOpen(true);
    if (item.key === '7') setFinalInterviewerModalOpen(true);
  };

  const items = [
    {
      label: 'Application Details',
      key: '1',
      icon: <AuditOutlined />,
    },
    {
      label: 'Proceed to Initial Phase',
      key: '2',
      icon: <RiseOutlined />,
    },
    {
      label: 'Initial Rating Scale',
      key: '3',
      icon: <DotChartOutlined />,
    },
    {
      label: 'Initial Phase Result',
      key: '4',
      icon: <InfoCircleOutlined />,
    },
    {
      label: 'Final Rating Scale',
      key: '5',
      icon: <DotChartOutlined />,
    },
    {
      label: 'Set Schedule Final Phase',
      key: '6',
      icon: <CalendarOutlined />,
    },
    {
      label: 'Check Schedule of Interviewer',
      key: '7',
      icon: <ScheduleOutlined />,
    },
    {
      label: 'Application Results',
      key: '8',
      icon: <InfoCircleOutlined />,
    },
    {
      label: 'Job Offer',
      key: '9',
      icon: <BriefcaseIcon className='h-4 mr-0.5' />,
    },

  ];

  return (
    <Space wrap>
      <Dropdown
        overlay={
          <Menu onClick={handleMenuClick}>
            {items.map(item => (
              <Menu.Item key={item.key} icon={item.icon}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <Button type="primary">
          <Space>
            Menu
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Modal
        title="Application Details"
        centered
        visible={applicationDetailsModalOpen}
        onOk={() => setApplicationDetailsModalOpen(false)}
        onCancel={() => setApplicationDetailsModalOpen(false)}
        width={1200}
        footer={null}
      >
        <div className='flex text-2xl items-center justify-center'>
          <h1><b>Personal Information</b></h1>
        </div>
        <div className='flex justify-end'>
          <h1 className='text-lg mb-2'><b>Status:</b> (Pending)</h1>
        </div>
        <form className='border rounded-lg p-3.5'>
          <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 text-center"></h1>
          <div className="mb-4">
            <label htmlFor=""><b>Application No.</b></label>
            <input type="number" placeholder="" className="border p-2 rounded w-full" readOnly />
          </div>
          <div className='flex flex-1 gap-4'>
            <div className='flex flex-col w-full mb-4'>
              <label htmlFor=""><b>Full Name</b></label>
              <div className='flex flex-1 gap-3'>
                <input type="text" placeholder="First name" className="border p-2 rounded w-full" />
                <input type="text" placeholder="Middle name" className="border p-2 rounded w-full" />
                <input type="text" placeholder="Last name" className="border p-2 rounded w-full" />
                <select className="border p-2 rounded  w-1/5">
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
                  <label htmlFor=""><b>Gender</b></label>
                  <select className="border p-2 rounded w-full">
                    <option disabled selected>Sex</option>
                    <option> Male</option>
                    <option> Female</option>
                  </select>
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor=""><b>Date of Birth</b></label>
                  <input type="date" placeholder="Date of birth" className="border p-2 rounded w-full" />
                </div>
                <div className=" w-full">
                  <label htmlFor=""><b>Email</b></label>
                  <input type="email" placeholder="Email address" className="border p-2 rounded w-full " />
                </div>
                <div className="w-full">
                  <label htmlFor=""><b>Phone Number</b></label>
                  <input type="number" placeholder="Phone Number" className="border p-2 rounded w-full " />
                </div>
              </div>
            </div>

            <div className='flex w-full'>
              <div className="flex flex-col gap-4 mb-4 w-full">
                <div className='flex flex-col w-full'>
                  <label htmlFor=""><b>Marital Status</b></label>
                  <select className="border p-2 rounded w-full">
                    <option disabled selected>Select Status</option>
                    <option> Single</option>
                    <option> Married</option>
                    <option> Widowed</option>
                    <option> Divorced</option>
                  </select>
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor=""><b>Religion</b></label>
                  <input type="text" placeholder="Religion" className="border p-2 rounded w-full" />
                </div>
                <div className='flex flex-col w-full'>
                  <label htmlFor=""><b>Nationality</b></label>
                  <input type="text" placeholder="Nationality" className="border p-2 rounded w-full" />
                </div>
              </div>
            </div>

          </div>
          <div className="mb-4">
            <label htmlFor=""><b>Mother's Maiden Name</b></label>
            <input type="text" placeholder="Mothers maiden name" className="border p-2 rounded w-full " />
          </div>
          <div className="mb-4">
            <label htmlFor=""><b>Father's Full Name</b></label>
            <input type="text" placeholder="Fathers full name" className="border p-2 rounded w-full " />
          </div>
          <div className='flex flex-1 gap-4 mb-4'>
            <div className="w-full">
              <label htmlFor=""><b>Highest Educational Attainment</b></label>
              <select className="border p-2 rounded w-full">
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
              <label htmlFor=""><b>Course Taken (Only if Applicable)</b></label>
              <input type="text" placeholder="Course taken" className="border p-2 rounded w-full " />
            </div>
          </div>
          <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Address Information</h1>
          <div className="mb-4">
            <label htmlFor=""><b>House/Lot No. , Street , Purok/Sitio , Barangay , City/Municipality , Province</b></label>
            <input type="text" placeholder="  " className="border p-2 rounded w-full" readOnly />
          </div>
          <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Government ID Information</h1>
          <div className='flex flex-1 gap-4 mb-4'>
            <div className="w-full">
              <label htmlFor=""><b>SSS No.</b></label>
              <input type="text" placeholder="SSS No." className="border p-2 rounded w-full " />
            </div>
            <div className="w-full">
              <label htmlFor=""><b>Pag-IBIG No.</b></label>
              <input type="text" placeholder="Pag-IBIG No." className="border p-2 rounded w-full " />
            </div>
          </div>
          <div className='flex flex-1 gap-4 mb-4'>
            <div className="w-full">
              <label htmlFor=""><b>Tin No.</b></label>
              <input type="text" placeholder="Tin No." className="border p-2 rounded w-full " />
            </div>
            <div className="w-full">
              <label htmlFor=""><b>Philhealth No.</b></label>
              <input type="text" placeholder="Philhealth No." className="border p-2 rounded w-full " />
            </div>
          </div>
          <h1 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 mt-9">Emergency Contact Information</h1>
          <div className="mb-4 w-full">
            <label htmlFor=""><b>Emergency Contact Fullname</b></label>
            <input type="text" placeholder="Emergency Contact Fullname" className="border p-2 rounded w-full " />
          </div>
          <div className="mb-4 w-full">
            <label htmlFor=""><b>Address</b></label>
            <input type="text" placeholder="Address" className="border p-2 rounded w-full " />
          </div>
          <div className='flex flex-1 gap-4 mb-4'>
            <div className="w-full">
              <label htmlFor=""><b>Relationship</b></label>
              <input type="text" placeholder="Relationship" className="border p-2 rounded w-full " />
            </div>
            <div className="w-full">
              <label htmlFor=""><b>Contact No.</b></label>
              <input type="number" placeholder="Contact No." className="border p-2 rounded w-full " />
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Initial Phase Interview"
        centered
        visible={initialPhaseModalOpen}
        onOk={() => {
          setInitialPhaseModalOpen(false);
        }}
        onCancel={() => setInitialPhaseModalOpen(false)}
        footer={null}
      >
        <div className='flex flex-1 gap-2 w-full'>
          <Button type='primary' className='w-full' onClick={handleButtonClick}>
            Face to face Interview
          </Button>
          <Button type='primary' className='w-full' onClick={handleButtonClick1} >
            Virtual Interview
          </Button>
        </div>
      </Modal>

      <Modal
        title="Schedule for Initial Phase Interview (Face to face Interview)"
        centered
        visible={faceToFaceInitialModalOpen}
        width={900}
        onOk={() => {
          setFaceToFaceInitialModalOpen(false);
        }}
        onCancel={() => setFaceToFaceInitialModalOpen(false)}
        footer={null}
      >
        <li className='bg-gray-300 h-0.5' ></li>
        <div className='flex justify-end mt-1.5'>
          <h1><b>Status:</b> (Pending)</h1>
        </div>
        <form class="w-full h-full">
          <div class="flex flex-col -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1" for="grid-text">
                Application No.
              </label>
              <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="number" placeholder="" readOnly />
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Applicant's Name
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Email Address
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Contact No.
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule date for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" required />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule time for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="time" placeholder="" required />
              </div>
            </div>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            <CheckCircleFilled /> CONFIRM
          </button>
        </form>
      </Modal>

      <Modal
        title="Schedule for Initial Phase Interview (Virtual Interview)"
        centered
        visible={virtualInitialModalOpen}
        width={900}
        onOk={() => {
          setVirtualInitialModalOpen(false);
        }}
        onCancel={() => setVirtualInitialModalOpen(false)}
        footer={null}
      >
        <li className='bg-gray-300 h-0.5' ></li>
        <div className='flex justify-end mt-1.5'>
          <h1><b>Status:</b> (Pending)</h1>
        </div>
        <form class="w-full h-full">
          <div class="flex flex-col -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1" for="grid-text">
                Application No.
              </label>
              <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="number" placeholder="" readOnly />
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Applicant's Name
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Email Address
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1'>
              <div class="w-3/5 px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Contact No.
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Meeting Link
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule date for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" required />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule time for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="time" placeholder="" required />
              </div>
            </div>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            <CheckCircleFilled /> CONFIRM
          </button>
        </form>
      </Modal>

      <Modal
        title="Final Phase Interview"
        centered
        visible={finalPhaseModalOpen}
        onOk={() => {
          setFinalPhaseModalOpen(false);
        }}
        onCancel={() => setFinalPhaseModalOpen(false)}
        footer={null}
      >
        <div className='flex flex-1 gap-2 w-full'>
          <Button type='primary' className='w-full' onClick={handleButtonClick2}>
            Face to face Interview
          </Button>
          <Button type='primary' className='w-full' onClick={handleButtonClick3} >
            Virtual Interview
          </Button>
        </div>
      </Modal>


      <Modal
        title="Schedule for Final Phase Interview (Face to face Interview)"
        centered
        visible={faceToFaceFinalModalOpen}
        width={900}
        onOk={() => {
          setFaceToFaceFinalModalOpen(false);
        }}
        onCancel={() => setFaceToFaceFinalModalOpen(false)}
        footer={null}
      >
        <li className='bg-gray-300 h-0.5' ></li>
        <div className='flex justify-end mt-1.5'>
          <h1><b>Status:</b> (Final Phase)</h1>
        </div>
        <form class="w-full h-full">
          <div class="flex flex-col -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1" for="grid-text">
                Application No.
              </label>
              <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="number" placeholder="" readOnly />
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Applicant's Name
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Email Address
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Contact No.
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule date for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" required />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule time for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="time" placeholder="" required />
              </div>
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                Final Phase Interviewer
              </label>
              <select className='appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="" id="">
                <option value=""></option>
              </select>
            </div>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            <CheckCircleFilled /> CONFIRM
          </button>
        </form>
      </Modal>

      <Modal
        title="Schedule for Final Phase Interview (Virtual Interview)"
        centered
        visible={virtualFinalModalOpen}
        width={900}
        onOk={() => {
          setVirtualFinalModalOpen(false);
        }}
        onCancel={() => setVirtualFinalModalOpen(false)}
        footer={null}
      >
        <li className='bg-gray-300 h-0.5' ></li>
        <div className='flex justify-end mt-1.5'>
          <h1><b>Status:</b> (Final Phase)</h1>
        </div>
        <form class="w-full h-full">
          <div class="flex flex-col -mx-3 mb-3">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1" for="grid-text">
                Application No.
              </label>
              <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="number" placeholder="" readOnly />
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Applicant's Name
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Email Address
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1'>
              <div class="w-3/5 px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Contact No.
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Meeting Link
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
            </div>

            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule date for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" required />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Schedule time for Initial Interview
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="time" placeholder="" required />
              </div>
            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                Final Phase Interviewer
              </label>
              <select className='appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500' name="" id="">
                <option value=""></option>
              </select>
            </div>
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
            <CheckCircleFilled /> CONFIRM
          </button>
        </form>
      </Modal>

      <Modal
        title="Final Phase Interviewers"
        centered
        visible={finalInterviewerModalOpen}
        onOk={() => {
          setFinalInterviewerModalOpen(false);
        }}
        onCancel={() => setFinalInterviewerModalOpen(false)}
        footer={null}
      >
        <div className='flex flex-1 mb-2'>
          <CalendarIcon className='h-6' />
          <h1>Check Interviewers Schedule</h1>
        </div>
        <div className='flex flex-col gap-2'>
        <Button type='primary' className='w-full' onClick={handleButtonClick2} >
          CUPTA, CIELO - DIRECTOR
        </Button>
        <Button type='primary' className='w-full' onClick={handleButtonClick3} >
          ADMINISTRATOR, SYSTEM - MANAGER
        </Button>
        <Button type='primary' className='w-full' onClick={handleButtonClick3} >
          DETALLA, MARIA TERESA - MANAGER
        </Button>
        <Button type='primary' className='w-full' onClick={handleButtonClick3} >
          GAY, MARICAR - MANAGER
        </Button>
        <Button type='primary' className='w-full' onClick={handleButtonClick3} >
          SORIANO, ALEJANDRO II - MANAGER
        </Button>
        </div>
      </Modal>
    </Space>
  );
};

export default ButtonComponents;