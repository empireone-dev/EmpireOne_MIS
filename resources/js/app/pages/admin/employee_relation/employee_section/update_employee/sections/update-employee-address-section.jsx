import { EditOutlined, LoadingOutlined, SendOutlined } from '@ant-design/icons';
import { Modal, Tooltip } from 'antd'
import React, { useState } from 'react'
import region from "@/app/address/region.json"
import province from "@/app/address/province.json"
import city from "@/app/address/city.json"
import barangay from "@/app/address/barangay.json"
import { useSelector } from 'react-redux';
import Input from '@/app/pages/_components/input';
import Select from '@/app/pages/_components/select';

export default function UpdateEmployeeAddressSection() {
    const [isModalOpen, setIsModalOpen] = useState(null)
    const { applicantForm } = useSelector((state) => state.applicants);


    function openHandler() {
        setIsModalOpen(true);
    }

    const [newProvince, setNewProvince] = useState([])
    const [newCity, setNewCity] = useState([])
    const [newBarangay, setNewBarangay] = useState([])
    const [loading, setLoading] = useState(null);

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

    return (
        <>
            <Tooltip title="Update New Address">
                <div>
                    <button className='text-2xl ml-2'
                        onClick={openHandler}
                    ><EditOutlined />
                    </button>
                </div>
            </Tooltip>

            <Modal
                title="Update Address"
                visible={isModalOpen}
                onOk={() => setIsModalOpen(false)}
                onCancel={() => setIsModalOpen(false)}
                width={1000}
                okText="Update"
                cancelText="Cancel"
                footer={null}
            >
                <form className="w-full h-full">
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
                        <div className="flex flex-1 gap-4 mb-4">
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
                    </div>
                    <div className="flex flex-col -mx-3">
                        <div className='flex items-center justify-center p-1.5 px-2 mt-1'>
                            <button
                                type="submit"
                                className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full ${loading ? "cursor-not-allowed opacity-75" : ""
                                    }`}
                                // onClick={submitApplicant}
                                disabled={loading}
                            >
                                {loading ? (
                                    <LoadingOutlined spin />
                                ) : (
                                    <SendOutlined />
                                )}
                                {loading ? " UPDATING..." : " UPDATE ADDRESS"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    )
}
