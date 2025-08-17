import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/app/store/store';
import { message, Modal } from 'antd';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { setExitInterviewForm } from '../../../exit_interview/redux/exit-interview-slice';
import { store_exit_int_thunk } from '../../../exit_interview/redux/exit-interview-thunk';
import RateJobSection from './rate-job-section';
import RateSupWorkerSection from './rate-sup-worker-section';

export default function ExitInterviewResultSection() {
    const { exitInterviewForm } = useSelector(
        (state) => state.exit_int
    );
    const dispatch = useDispatch();
    const { employee } = useSelector((state) => state.employees);
    const { user } = useSelector((state) => state.app);
    const app_id = window.location.pathname.split("/")[5];
    const emp_id = window.location.pathname.split("/")[4];
    const [loading, setLoading] = useState(false);

    console.log('employee', employee);
    useEffect(() => {
        dispatch(
            setExitInterviewForm({
                ...exitInterviewForm,
                // interviewer: user?.employee_fname + " " + user?.employee_lname,
                int_id: user.id,
                app_id: app_id,
                emp_id: emp_id,
                // int_id: user?.id
                // oavg:
                //     (parseInt(initialRate.tscore ?? 0) +
                //         parseInt(initialRate.pscore ?? 0) +
                //         parseInt(initialRate.cscore ?? 0)) /
                //     3,
                //tier condition
            })
        );
    }, [
        // initialRate?.tscore,
        // initialRate?.pscore,
        // initialRate?.cscore,
        // user?.employee_fname,
    ]);

    function handleRate(e) {
        dispatch(
            setExitInterviewForm({
                ...exitInterviewForm,
                [e.target.name]: e.target.value,
            })
        );
    }

    console.log('employee', employee)

    async function submitExitInt(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await store.dispatch(store_exit_int_thunk(exitInterviewForm));

            // Show success popup modal
            Modal.success({
                title: 'Success!',
                content: 'Exit Interview Successfully Recorded',
                okText: 'OK',
                centered: true,
                onOk() {
                    // Optional: You can redirect or perform other actions here
                    console.log('Exit interview recorded successfully');
                },
            });
        } catch (error) {
            console.error('Error submitting exit interview:', error);
            Modal.error({
                title: 'Error!',
                content: 'Failed to record exit interview. Please try again.',
                okText: 'OK',
                centered: true,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen overflow-hidden ">
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] transition-colors duration-300 h-full overflow-y-scroll">
                <div className="container mx-auto flex justify-center">
                    <div className="bg-white shadow-2xl shadow-black rounded-lg p-6 mt-12 w-full">
                        <div className="flex items-center justify-center p-3">
                            <img className="w-60" src="/images/newlogo.png" alt="logo" />
                        </div>
                        <div className='flex text-2xl items-center justify-center'>
                            <h1><b>EXIT INTERVIEW RESULT</b></h1>
                        </div>
                        <div className='text-lg mb-2 mt-4'>
                            <h1>INTERVIEWER: <b>{employee?.attrition?.ext_rate_int?.user?.employee_fname || ''} {employee?.attrition?.ext_rate_int?.user?.employee_lname || ''}</b></h1>
                        </div>
                        <div className='border rounded-lg p-3.5' >
                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Full Name:</b></label>
                                            <input
                                                type="text" value={`${employee?.applicant?.fname || ''} ${employee?.applicant?.mname || ''} ${employee?.applicant?.lname || ''}`} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Account / Department:</b></label>
                                            <input type="text" value={employee?.account ? employee?.account : employee?.dept?.dept} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Hired:</b></label>
                                            <input type="date" value={employee?.hired || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className=" w-full">
                                            <label htmlFor=""><b>Immediate Supervisor:</b></label>
                                            <input type="text" value={`${employee?.user?.employee_fname || ''} ${employee?.user?.employee_mname || ''} ${employee?.user?.employee_lname || ''}`} className="border p-2 rounded w-full " />
                                        </div>
                                        <div className="w-full">
                                            <label htmlFor=""><b>Employment Status:</b></label>
                                            <input type="text" value={employee?.status || ''} className="border p-2 rounded w-full " />
                                        </div>
                                    </div>
                                </div>

                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>ID Number:</b></label>
                                            <input type="text" name='app_id' value={employee?.emp_id || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Position Title:</b></label>
                                            <input type="text" value={employee?.position || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Date Separated:</b></label>
                                            <input type="date" value={employee?.attrition?.separation || ''} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Department Manager:</b></label>
                                            <input type="text" value={`${employee?.dept?.user?.employee_fname || ''} ${employee?.dept?.user?.employee_lname || ''}`} className="border p-2 rounded w-full" />
                                        </div>
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>Reason for Separation::</b></label>
                                            <input type="text" value={employee?.attrition?.reas || ''} className="border p-2 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>1. Main reason for leaving your current position.</b></label>
                                            <textarea
                                                value={employee?.attrition?.ext_int?.mreas || ''}
                                                type="text"
                                                name="mreas"
                                                placeholder="" className="border p-2 h-40 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            {/* <ExitFactorsSection /> */}
                                            <h1 htmlFor=""><b>2. Factors that influence decision to leave.</b></h1>
                                            <div className="mt-2">
                                                {employee?.attrition?.ext_factor && employee.attrition.ext_factor.length > 0 ? (
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {employee.attrition.ext_factor.map((factorObj, index) => (
                                                            <li key={index} className="text-gray-700">
                                                                {factorObj.factors}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-gray-500 italic">
                                                        No factors specified
                                                    </div>
                                                )}
                                            </div>
                                            <label htmlFor="" className='mt-1'>Others:</label>
                                            <input
                                                value={employee?.attrition?.ext_int?.factsOther || ''}
                                                name="factsOther"
                                                type="text" placeholder="" className="border p-2 rounded w-full " />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>3. Wish/wishes he/she had known before taking the job</b></label>
                                            <textarea
                                                value={employee?.attrition?.ext_int?.wish || ''}
                                                name="wish"
                                                type="text" placeholder="" className="border p-2 h-40  rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>4.Suggestion to the management to make the organization a better place to work</b></label>
                                            <textarea
                                                value={employee?.attrition?.ext_int?.suggest || ''}
                                                name="suggest"
                                                type="text" placeholder="" className="border p-2 h-40  rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex flex-1 gap-4 border-4 border-gray-400 p-4 mb-3'>
                                <div className='flex w-full'>
                                    <div className="flex flex-col gap-4 mb-4 w-full">
                                        <div className='flex flex-col w-full'>
                                            <label htmlFor=""><b>5. He/She appreciates the support that enables him/her to perform the job..</b></label>
                                            <textarea
                                                value={employee?.attrition?.ext_int?.apprec || ''}
                                                name="apprec"
                                                type="text" placeholder="" className="border p-2 rounded w-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-1 w-full gap-8 mt-10'>
                                <h1><b>1. Very Satisfied,</b></h1>
                                <h1><b>2. Satisfied,</b></h1>
                                <h1><b>3. Neutral,</b></h1>
                                <h1><b>4. Dissatisfied,</b></h1>
                                <h1><b>5. Very Dissatisfied</b></h1>
                            </div>
                            <RateJobSection data={employee} />
                            <RateSupWorkerSection data={employee} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
