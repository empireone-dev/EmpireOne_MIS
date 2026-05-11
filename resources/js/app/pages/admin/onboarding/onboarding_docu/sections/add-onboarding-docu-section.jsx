import store from "@/app/store/store";
import { FileAddOutlined } from "@ant-design/icons";
import { message, Modal } from "antd";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { create_onboarding_docu_thunk, get_onboarding_docu_thunk } from "../redux/onboarding-docu-thunk";

export default function AddOnboardingDocuSection() {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((state) => state.app);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);
    const [newForm, setNewForm] = useState({
        site: user?.site ?? '',
        doc_name: '',
    });
    const [docFile, setDocFile] = useState(null);

    const resetForm = () => {
        setNewForm({ site: user?.site ?? '', doc_name: '' });
        setDocFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const submitOnboardingDocu = async () => {
        if (!newForm.doc_name?.trim()) {
            message.warning("Please enter the document name.");
            return;
        }
        if (!docFile) {
            message.warning("Please select a PDF file.");
            return;
        }
        setLoading(true);
        try {
            await store.dispatch(
                create_onboarding_docu_thunk({
                    ...newForm,
                    doc_content: docFile,
                })
            );
            await store.dispatch(get_onboarding_docu_thunk());
            message.success("Successfully Added!");
            resetForm();
            setOpen(false);
        } catch (error) {
            console.error("Error submitting onboarding document:", error);
            message.error("Failed to add document. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-2">
            <div className="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white gap-1"
                >
                    <FileAddOutlined className="text-xl" />
                    Add Onboarding Documents
                </button>
            </div>
            <Modal
                title="New Onboarding Documents"
                open={open}
                onOk={submitOnboardingDocu}
                onCancel={() => { setOpen(false); resetForm(); }}
                width={1000}
                okText="Save"
                cancelText="Cancel"
                confirmLoading={loading}
            >
                <form className="w-full" onSubmit={(e) => { e.preventDefault(); submitOnboardingDocu(); }}>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Document's Name
                            </label>
                            <input
                                value={newForm.doc_name}
                                onChange={(e) => setNewForm({ ...newForm, doc_name: e.target.value })}
                                className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="doc_name"
                                type="text"
                            />
                        </div>
                        <div className="mb-8 w-full px-3">
                            <label htmlFor="doc_content" className="block uppercase tracking-wide text-xs font-bold mb-1 mt-2">
                                Document's File (PDF)
                            </label>
                            <input
                                ref={fileInputRef}
                                id="doc_content"
                                type="file"
                                accept="application/pdf"
                                onChange={(e) => setDocFile(e.target.files[0] ?? null)}
                                className="block w-full text-sm text-gray-700 border border-gray-400 rounded py-2 px-3 leading-tight focus:outline-none focus:border-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                            />
                            {docFile && (
                                <p className="mt-1 text-xs text-gray-500">{docFile.name}</p>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
