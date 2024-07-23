
import React, { useState } from 'react';
import { AuditOutlined, CalendarOutlined, DotChartOutlined, DownOutlined, InfoCircleOutlined, MedicineBoxOutlined, RiseOutlined, ScheduleOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import { BriefcaseIcon } from '@heroicons/react/24/outline';

const ButtonComponents = () => {
  const [applicationDetailsModalOpen, setApplicationDetailsModalOpen] = useState(false);
  const [initialPhaseModalOpen, setInitialPhaseModalOpen] = useState(false);

  const handleButtonClick = () => {
    message.info('Click on left button.');
    console.log('click left button');
  };

  const handleMenuClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.key === '1') setApplicationDetailsModalOpen(true);
    if (item.key === '2') setInitialPhaseModalOpen(true);
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
        okText="Update"
        cancelText="Cancel"
      >
         <div className='flex text-2xl items-center justify-center'>
          <h1><b>Personal Information</b></h1>
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
            <input type="text" placeholder="  " className="border p-2 rounded w-full" readOnly/>
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
        title="Confirm Delete"
        centered
        visible={initialPhaseModalOpen}
        onOk={() => {
          setInitialPhaseModalOpen(false);
        }}
        onCancel={() => setInitialPhaseModalOpen(false)}
        okText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete <b>(Medicine)</b> ?</p>
      </Modal>
    </Space>
  );
};

export default ButtonComponents;