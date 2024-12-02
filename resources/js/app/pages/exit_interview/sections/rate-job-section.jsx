import React from 'react'
import TableRowComponent from '../components/table-row-component'
import { setExitInterviewForm } from '../redux/exit-interview-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function RateJobSection() {
    const { exitInterviewForm } = useSelector((state) => state.exit_int);
    const dispatch = useDispatch();
    function handleRate(e) {
        dispatch(
            setExitInterviewForm({
                ...exitInterviewForm,
                [e.target.name]: e.target.value,
            })
        );
    }
    return (
        <div className='flex flex-1 gap-4 border-4 border-gray-400 mt-2 mb-3'>
            <table class="table table-bordered text-center w-full">
                <thead className='border-b-2 border-gray-300 w-full'>
                    <tr>
                        <th className="border border-gray-300 py-2">Your Job</th>
                        <th className="border border-gray-300 py-2">1</th>
                        <th className="border border-gray-300 py-2">2</th>
                        <th className="border border-gray-300 py-2">3</th>
                        <th className="border border-gray-300 py-2">4</th>
                        <th className="border border-gray-300 py-2">5</th>
                    </tr>
                </thead>
                <tbody>
                    <TableRowComponent
                        onChange={handleRate}
                        title="Opportunities to use your abilities and skills"
                        name1="job1"
                        name2="job1"
                        name3="job1"
                        name4="job1"
                        name5="job1"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />

                    <TableRowComponent
                        onChange={handleRate}
                        title="Expectation of the Job Task"
                        name1="job2"
                        name2="job2"
                        name3="job2"
                        name4="job2"
                        name5="job2"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Training received"
                        name1="job3"
                        name2="job3"
                        name3="job3"
                        name4="job3"
                        name5="job3"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Availability of the resources needed for the job"
                        name1="job4"
                        name2="job4"
                        name3="job4"
                        name4="job4"
                        name5="job4"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Recognition of your contribution"
                        name1="job5"
                        name2="job5"
                        name3="job5"
                        name4="job5"
                        name5="job5"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Cooperation within your department"
                        name1="job6"
                        name2="job6"
                        name3="job6"
                        name4="job6"
                        name5="job6"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Cooperation with other department"
                        name1="job7"
                        name2="job7"
                        name3="job7"
                        name4="job7"
                        name5="job7"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                </tbody>
            </table>
        </div>
    )
}
