import React from 'react'
import TableRowComponent from '../components/table-row-component'
import { setExitInterviewForm } from '../redux/exit-interview-slice';
import { useDispatch, useSelector } from 'react-redux';

export default function RateSupWorkerSection() {
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
        <div className='flex flex-1 gap-4 border-4 border-gray-400 mt-5 mb-3'>
            <table class="table table-bordered text-center w-full">
                <thead className='border-b-2 border-gray-300 w-full'>
                    <tr>
                        <th className="border border-gray-300 py-2">Supervisor and Co-worker</th>
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
                        title="My Supervisor had an understanding of my responsibilities"
                        name1="sup1"
                        name2="sup1"
                        name3="sup1"
                        name4="sup1"
                        name5="sup1"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="Overall relationship with my supervisor"
                        name1="sup2"
                        name2="sup2"
                        name3="sup2"
                        name4="sup2"
                        name5="sup2"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="I was treated fairly by my supervisor"
                        name1="sup3"
                        name2="sup3"
                        name3="sup3"
                        name4="sup3"
                        name5="sup3"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="My supervisor was receptive to and implemented suggestion"
                        name1="sup4"
                        name2="sup4"
                        name3="sup4"
                        name4="sup4"
                        name5="sup4"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="My supervisor's ability to handle complaints and problem"
                        name1="sup5"
                        name2="sup5"
                        name3="sup5"
                        name4="sup5"
                        name5="sup5"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="My supervisor has good/best management skills"
                        name1="sup6"
                        name2="sup6"
                        name3="sup6"
                        name4="sup6"
                        name5="sup6"
                        value1="1"
                        value2="2"
                        value3="3"
                        value4="4"
                        value5="5"
                    />
                    <TableRowComponent
                        onChange={handleRate}
                        title="My relationship with my co-workers"
                        name1="sup7"
                        name2="sup7"
                        name3="sup7"
                        name4="sup7"
                        name5="sup7"
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
