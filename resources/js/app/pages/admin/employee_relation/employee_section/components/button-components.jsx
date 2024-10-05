import React, { useState } from 'react';
import { DownOutlined, EditOutlined, FileOutlined, FileTextOutlined, FolderOpenOutlined, PrinterOutlined, QrcodeOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Dropdown, message, Space, Modal, Menu } from 'antd';
import { router } from '@inertiajs/react';
import Input from '@/app/pages/_components/input';

const ButtonComponents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const handleButtonClick = () => {
    message.info('Click on left button.');
    console.log('click left button');
  };

  const handleMenuClick = (item) => {
    if (item.onClick) item.onClick();
    if (item.key === '1') setModalOpen(true);
    if (item.key === '2') router.visit(`/admin/file_201/{$app_id}`);
    if (item.key === '3') setStatusModalOpen(true);
    if (item.key === '4') router.visit('#');
    if (item.key === '5') router.visit('#');
  };

  const items = [
    {
      label: 'Update Employee',
      key: '1',
      icon: <EditOutlined />,
    },
    {
      label: '201 File',
      key: '2',
      icon: <FolderOpenOutlined />,
    },
    {
      label: 'Employment Status',
      key: '3',
      icon: <UsergroupAddOutlined />,
    },
    {
      label: 'Print COE',
      key: '4',
      icon: <PrinterOutlined />,
    },
    {
      label: 'Generate QR Code',
      key: '5',
      icon: <QrcodeOutlined />,
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
        title="Employee Status"
        centered
        visible={statusModalOpen}
        onOk={() => setStatusModalOpen(false)}
        onCancel={() => setStatusModalOpen(false)}
        width={1000}
        okText="Update"
        cancelText="Cancel"
      >
        <form class="w-full h-full">
          <div class="flex flex-col -mx-3 mb-6">
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                Employee's Name
              </label>
              <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                <option value=""></option>
              </select>

            </div>
            <div class="w-full px-3">
              <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                Employee No.
              </label>
              <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
            </div>

            <div className='flex flex-1 '>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  job Position
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Department
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" readOnly />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Account <i>(If Applicable)</i>
                </label>
                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                  <option value=""></option>
                </select>
              </div>
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Supervisor
                </label>
                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                  <option value=""></option>
                </select>
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  EOGS Email
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="email" placeholder="" />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Status
                </label>
                <select class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name="" id="">
                  <option value="">Probationary</option>
                  <option value="">Regular</option>
                </select>
              </div>
            </div>

            <div className='flex flex-1'>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Hired Date
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" />
              </div>
              <div class="w-full px-3">
                <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2" for="grid-text">
                  Date of Regularization
                </label>
                <input class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="date" placeholder="" />
              </div>
            </div>
          </div>
        </form>
      </Modal>

      <Modal
        title="Update Employee"
        centered
        visible={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        width={1200}
        okText="Save Changes"
        cancelText="Cancel"
      >
        <div className='flex text-2xl items-center justify-center'>
          <h1><b>Personal Information</b></h1>
        </div>
        <form className='border rounded-lg p-3.5'>
          <h1 className="text-xl font-semibold mb-3 text-gray-900  text-center"></h1>
          <div className='mb-4'>
            <div className='flex flex-col w-full'>
              <label htmlFor=""><b>Employee No.</b></label>
              <input type="text" placeholder="" className="border p-2 rounded w-full" readOnly />
            </div>
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

          <div className='flex flex-1 gap-4'>
            <div className='flex flex-col w-full mb-4'>
              <div className='flex flex-1 gap-3'>
                <select
                  // onChange={(event) => data_handler(event)}
                  name='suffix'
                  className="border p-2 rounded  w-full">
                  <option disabled selected>Job Position</option>
                  <option> Sr.</option>
                  <option> Jr.</option>
                  <option> II</option>
                  <option> III</option>
                  <option> IV</option>
                  <option> V</option>
                </select>
                <select
                  // onChange={(event) => data_handler(event)}
                  name='suffix'
                  className="border p-2 rounded  w-full">
                  <option disabled selected>Department</option>
                  <option> Sr.</option>
                  <option> Jr.</option>
                  <option> II</option>
                  <option> III</option>
                  <option> IV</option>
                  <option> V</option>
                </select>
                <select
                  // onChange={(event) => data_handler(event)}
                  name='suffix'
                  className="border p-2 rounded  w-full">
                  <option disabled selected>Account (If Applicable)</option>
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
            <div className='flex flex-col w-full mb-4'>
              <div className='flex flex-1 gap-3'>
                <select
                  // onChange={(event) => data_handler(event)}
                  name='suffix'
                  className="border p-2 rounded  w-full">
                  <option disabled selected>Supervisor</option>
                  <option> Sr.</option>
                  <option> Jr.</option>
                  <option> II</option>
                  <option> III</option>
                  <option> IV</option>
                  <option> V</option>
                </select>
                <Input
                  // onChange={(event) => data_handler(event)}
                  // value={applicantForm.hired ?? ""}
                  name="hired"
                  label="Hired Date"
                  type="date"
                />
                <select
                  // onChange={(event) => data_handler(event)}
                  name='suffix'
                  className="border p-2 rounded  w-full">
                  <option disabled selected>Status</option>
                  <option> Probationary</option>
                  <option> Regular</option>
                </select>
              </div>
            </div>
          </div>

          <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Address Information</h1>
          <div className="flex flex-1 gap-4 mb-4 w-full">
            <div className='flex flex-col w-full'>
              <label htmlFor=""><b>Region</b></label>
              <input type="text" placeholder="Region" className="border p-2 rounded w-full" />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor=""><b>Province</b></label>
              <input type="text" placeholder="Province" className="border p-2 rounded w-full" />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor=""><b>City/Municipality</b></label>
              <input type="text" placeholder="City/Municipality" className="border p-2 rounded w-full" />
            </div>
          </div>
          <div className="flex flex-1 gap-4 mb-4">
            <div className='flex flex-col  w-1/2'>
              <label htmlFor=""><b>Barangay</b></label>
              <input type="text" placeholder="Barangay" className="border p-2 rounded w-full" />
            </div>
            <div className='flex flex-col w-full'>
              <label htmlFor=""><b>House/Lot No., Street, Purok/Sitio</b></label>
              <input type="text" placeholder="House/Lot No., Street, Purok/Sitio" className="border p-2 rounded w-full " />
            </div>
          </div>
          <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Government ID Information</h1>
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
          <h1 className="text-xl font-semibold mb-3 text-gray-900  mt-9">Emergency Contact Information</h1>
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
    </Space>
  );
};

export default ButtonComponents;