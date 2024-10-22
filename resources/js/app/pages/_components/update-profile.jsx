import { CheckCircleFilled, UserOutlined } from '@ant-design/icons';
import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { update_user_thunk } from '../redux/app-thunk';
import store from '@/app/store/store';

export default function UpdateProfile({ user }) {
    const [updateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [form, setForm] = useState({
        employee_id: user?.employee_id,
        id: user?.id,
        employee_fname: "",
        employee_mname: "",
        employee_lname: "",
        employee_suffix: "",
        gender: "",
    });

    console.log('formsssss', form)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (user) {
            setForm({
                id: user?.id,
                employee_id: user?.employee_id,
                employee_fname: user?.employee_fname || "",
                employee_mname: user?.employee_mname || "",
                employee_lname: user?.employee_lname || "",
                employee_suffix: user?.employee_suffix || "",
                gender: user?.gender || "",
            });
        }
    }, [user]);

    async function update_user(e) {
        e.preventDefault();
        setLoading(true);

        try {
            await store.dispatch(update_user_thunk({
                ...form
            }));
            // await store.dispatch(get_department_thunk());
            message.success("Updated Successfully!");
            setUpdateProfileModalOpen(false);
        } catch (error) {
            message.error("Failed to update. Please try again.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>

            <button
                onClick={() => {
                    setUpdateProfileModalOpen(
                        true
                    );
                    toggleDropdown(false);
                }}
            >
                <h6 className="text-lg">
                    <UserOutlined className="text-lg mr-2" />
                    Update Profile
                </h6>
            </button>

            <Modal
                title="Update My Profile"
                centered
                visible={updateProfileModalOpen}
                onOk={update_user}
                onCancel={() =>
                    setUpdateProfileModalOpen(false)
                }
                width={1200}
                confirmLoading={loading}
                footer={null}
            >
                <li className="bg-gray-300 h-0.5"></li>
                <div className="flex flex-1 w-full mt-1">
                    <form class="w-full h-full" onSubmit={update_user}>
                        <h1 className="text-xl">
                            <b>My Personal Information</b>
                        </h1>
                        <div class="flex flex-col -mx-3 mb-3 mt-3">
                            <div class="w-full px-2.5">
                                <label class="block uppercase tracking-wide  text-xs font-bold mb-1">
                                    Employee's ID
                                </label>
                                <input
                                    class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="number"
                                    value={user?.employee_id ?? ''}
                                    readOnly
                                />
                            </div>

                            <div className="flex flex-1">
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Employee's Firstname
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={form?.employee_fname ?? ''}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                employee_fname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Employee's
                                        Middlename
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={form?.employee_mname ?? ''}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                employee_mname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Employee's Lastname
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={form?.employee_lname ?? ''}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                employee_lname: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Employee's Suffix
                                    </label>
                                    <select
                                        className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name=""
                                        value={form?.employee_suffix ?? ''}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                employee_suffix: e.target.value,
                                            })
                                        }
                                    >
                                        <option disabled>{user?.suffix ?? ''}</option>
                                        <option value="">---</option>
                                        <option value="Jr.">Jr.</option>
                                        <option value="Sr.">Sr.</option>
                                        <option value="II">II</option>
                                        <option value="III">III</option>
                                        <option value="IV">IV</option>
                                        <option value="V">V</option>
                                        <option value="VI">VI</option>
                                        <option value="VII">VII</option>
                                        <option value="VIII">VIII</option>
                                        <option value="IX">IX</option>
                                        <option value="X">X</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-1 ">
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Employee's Gender
                                    </label>
                                    <select
                                        className="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name=""
                                        value={form?.gender ?? ''}
                                        onChange={(e) =>
                                            setForm({
                                                ...form,
                                                gender: e.target.value,
                                            })
                                        }
                                    >
                                        <option disabled>{user?.gender ?? ''}</option>
                                        <option value="Male">
                                            Male
                                        </option>
                                        <option value="Female">
                                            Female
                                        </option>
                                    </select>
                                </div>
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Department
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={user?.department ?? ''}
                                        readOnly
                                    />
                                </div>
                                <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Position
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        value={user?.position ?? ''}
                                        readOnly
                                    />
                                </div>
                                {/* <div class="w-full px-2.5">
                                    <label class="block uppercase tracking-wide  text-xs font-bold mb-1 mt-2">
                                        Profile Picture
                                    </label>
                                    <input
                                        class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        placeholder=""
                                        required
                                    />
                                </div> */}
                            </div>
                        </div>
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full">
                            <CheckCircleFilled /> Save
                            Changes
                        </button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
