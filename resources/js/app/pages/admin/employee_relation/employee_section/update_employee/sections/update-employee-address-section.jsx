import { EditOutlined, HomeOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { message, Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import region from "@/app/address/region.json"
import province from "@/app/address/province.json"
import city from "@/app/address/city.json"
import barangay from "@/app/address/barangay.json"
import { useDispatch, useSelector } from 'react-redux';
import Input from '@/app/pages/_components/input';
import Select from '@/app/pages/_components/select';
import { get_employee_thunk, update_address_thunk } from '../../redux/employee-section-thunk';
import store from '@/app/store/store';
import { setApplicantForm } from '@/app/pages/admin/recruitment/applicants/applicant_records/redux/applicant-slice';
import { get_applicant_by_app_id_thunk } from '@/app/pages/admin/final_rate/redux/final-rate-thunk';

export default function UpdateEmployeeAddressSection() {
    const [isModalOpen, setIsModalOpen] = useState(null)
    const { applicantForm } = useSelector((state) => state.applicants);
    const { applicant } = useSelector((state) => state.final_rate);
    const [newProvince, setNewProvince] = useState([])
    const [newCity, setNewCity] = useState([])
    const [newBarangay, setNewBarangay] = useState([])
    const [loading, setLoading] = useState(null);
    const dispatch = useDispatch();
    const app_id = window.location.pathname.split('/')[5]


    function openHandler() {
        setIsModalOpen(true);
    }

    async function submit_edit_address(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(update_address_thunk(applicantForm));
            // await store.dispatch(get_employee_thunk());
            await store.dispatch(get_applicant_by_app_id_thunk(app_id))
            setIsModalOpen(false);
        } catch (error) {
            message.error(error.message || 'Error updating address');
        } finally {
            setLoading(false);
        }
    }




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
                    id: applicant?.id,
                    [e.target.name]: e.target.value,
                })
            );
        }


    }

    return (
        <>
            <Tooltip title="Update New Address">
                <div>
                    <button
                        type='button'
                        className='text-2xl ml-2'
                        onClick={openHandler}
                    ><EditOutlined />
                    </button>
                </div>
            </Tooltip>

            <Modal
                title="Update Address"
                visible={isModalOpen}
                onOk={submit_edit_address}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <form className="w-full h-full" onSubmit={submit_edit_address}>
                    <div>
                        <div className="flex flex-1 gap-4 mb-4 w-full">
                            <div className='flex flex-col w-full'>
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
                            <div className='flex flex-col w-full'>
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
                            <div className='flex flex-col w-full'>
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
                        <div className="flex flex-1 gap-1 mb-4">
                            <div className='w-1/2 pr-3'>
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
                            <div className='flex flex-col w-full'>
                                <Input
                                    onChange={(event) => data_handler(event)}
                                    value={applicantForm.lot || ""}
                                    name="lot"
                                    label="House/Lot No., Street, Purok/Sitio"
                                    type="text"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col -mx-3">
                        <div className='flex items-center justify-center p-1.5 px-2 mt-1'>
                            <button
                                type="submit"
                                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                                    }`}
                                onClick={submit_edit_address}
                                disabled={loading}
                            >
                                <HomeOutlined/> UPDATE NEW ADDRESS
                                {/* {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <HomeOutlined />
                                )}
                                {loading ? " UPDATING..." : " UPDATE NEW ADDRESS"} */}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
