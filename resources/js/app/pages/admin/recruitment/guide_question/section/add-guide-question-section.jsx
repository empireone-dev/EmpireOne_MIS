import { FileUnknownOutlined, PlusSquareFilled, PlusSquareTwoTone } from '@ant-design/icons'
import { Modal } from 'antd';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { store_guide_question_thunk } from '../redux/guide-question-thunk';
import store from '@/app/store/store';
import { setGuideQuestionForm } from '../redux/guide-question-slice';

export default function AddGuideQuestionSection() {
    const [open, setOpen] = useState(false);

    const { guideqForm } = useSelector((state) => state.guideqs)
    console.log("guideq", guideqForm)
    const dispatch = useDispatch()
    const closeModal = () => {
        setOpen(false);
    };

    function changeHandler(e) {
        const data = e.target.name
        if (data == 'image') {
            dispatch(setGuideQuestionForm({
                ...guideqForm,
                [data]: e.target.files
            }))
        } else {
            dispatch(setGuideQuestionForm({
                ...guideqForm,
                [data]: e.target.value
            }))
        }

    }

    function submitGuideQuestion(e) {
        e.preventDefault()
        store.dispatch(store_guide_question_thunk(guideqForm))
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
                    <FileUnknownOutlined className='text-xl' />
                    Add Guide Question
                </button>
            </div>
            <Modal
                title="New Guide Question"
                centered
                open={open}
                onOk={(e) => submitGuideQuestion(e)}
                onCancel={() => setOpen(false)}
                width={1000}
                okText="Save"
                cancelText="Cancel"
            >
                <form class="w-full" onSubmit={submitGuideQuestion}>
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <label class="block uppercase tracking-wide  text-xs font-bold mb-2" for="grid-text">
                                Guide Question
                            </label>
                            <input 
                            name="guideqs"
                            class="appearance-none block w-full   border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" onChange={changeHandler}/>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    )
}
