import Summernote from "@/app/pages/_components/summernote";
import store from "@/app/store/store";
import { PlusSquareTwoTone } from "@ant-design/icons";
import { message, Modal } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { create_onboarding_docu_thunk, get_onboarding_docu_thunk } from "../redux/onboarding-docu-thunk";

export default function AddOnboardingDocuSection() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const [newForm,setNewForm]=useState({
        site:user?.site??''
    })
    const [form, setForm] = useState({
        doc_content: '',
    });

    const submitOnboardingDocu = async () => {
        setLoading(true);
        try {
            await store.dispatch(
                create_onboarding_docu_thunk({
                    ...newForm,
                    ...form,
                    ...user,
                })
            );
            await store.dispatch(get_onboarding_docu_thunk());
            message.success("Successfully Added!");
            setLoading(false);
            setOpen(false);
        } catch (error) {
            console.error("Error submitting ERF:", error);
            setLoading(false);
            setOpen(false);
        }
    };
console.log('formform',form)
    return (
        <div className="my-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    <PlusSquareTwoTone className="text-xl" />
                    Add Onboarding Documents
                </button>
            </div>
            <Modal
                title="New Onboarding Documents"
                open={open}
                onOk={submitOnboardingDocu}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
                confirmLoading={loading}
            >
                <form className="w-full" onSubmit={submitOnboardingDocu}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Document's Name
                            </label>
                            <input
                                value={form.doc_name}
                                onChange={(e) => setNewForm({ ...newForm, doc_name: e.target.value })}
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="doc_name"
                                type="text"
                            />
                        </div>
                        <div className="mb-8 w-full px-3">
                            <label htmlFor="doc_content" className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Document's Content
                            </label>
                            {/* Pass setForm with current form state to Summernote */}
                            <Summernote
                            form={form} setForm={setForm} />
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
