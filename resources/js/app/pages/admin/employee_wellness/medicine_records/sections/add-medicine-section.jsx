import { MedicineBoxOutlined, PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { store_medicine_record_thunk } from '../redux/medicine-record-thunk';
import store from '@/app/store/store';
import { setMedicineRecordForm } from '../redux/medicine-record-slice';

export default function AddMedicineSection() {
    const [open, setOpen] = useState(false);

    const { medicine_recordForm } = useSelector((state) => state.medicine_records)
    console.log("medicine_record", medicine_recordForm)
    const dispatch = useDispatch()
    const closeModal = () => {
        setOpen(false);
    };

    function changeHandler(e) {
        const data = e.target.name
        if (data == 'image') {
            dispatch(setMedicineRecordForm({
                ...medicine_recordForm,
                [data]: e.target.files
            }))
        } else {
            dispatch(setMedicineRecordForm({
                ...medicine_recordForm,
                [data]: e.target.value
            }))
        }

    }

    function submitMedicineRecord(e) {
        e.preventDefault()
        store.dispatch(store_medicine_record_thunk(medicine_recordForm))
        setOpen(false)
        closeModal();
    }
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <PlusSquareTwoTone className='text-xl' />
                    Add New Medicine
                </button>
            </div>
            <Modal
                title={<><MedicineBoxOutlined /> New Medicine</>}
                centered
                open={open}
                onOk={(e) => submitMedicineRecord(e)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full" onSubmit={submitMedicineRecord}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="meds">
                                Medicine
                            </label>
                            <input name='medicine'
                                class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="meds"
                                type="text"
                                placeholder="Name of Medicine"
                                onChange={changeHandler} />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="med_type">
                                Medicine Type
                            </label>
                            <input name='med_type'
                                class="appearance-none block w-full  border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="med_type"
                                type="text"
                                placeholder="Type of Medicine"
                                onChange={changeHandler} />
                        </div>
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide text-xs font-bold mb-1 mt-2" for="med_desc">
                                Medicine Description
                            </label>
                            <textarea name='med_desc'
                                class="appearance-none block w-full  border border-gray-400 rounded py-6 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                id="med_desc"
                                type="text"
                                placeholder="Add Description"
                                onChange={changeHandler} />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
