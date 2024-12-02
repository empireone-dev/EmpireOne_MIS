import React from 'react'
import CheckboxInputComponent from '../components/checkbox-input-component'
import { useDispatch, useSelector } from 'react-redux';
import { setExitInterviewForm } from '../redux/exit-interview-slice';

export default function ExitFactorsSection() {
    const { exitInterviewForm } = useSelector((state) => state.exit_int);
    const dispatch = useDispatch();
    function handleRate(e) {
        if (e.target.checked) {
            dispatch(
                setExitInterviewForm({
                    ...exitInterviewForm,
                    factors: [...exitInterviewForm.factors, e.target.value],
                })
            );
        } else {
            const ei = exitInterviewForm.factors.filter(
                (res) => res !== e.target.value
            );
            dispatch(
                setExitInterviewForm({
                    ...exitInterviewForm,
                    factors: ei,
                })
            );
        }
    }
    return (
        <div>
            <label htmlFor=""><b>2. Kindly choose the following factors below that influence your decision to leave.</b></label>
            <CheckboxInputComponent onChange={handleRate} label="Pay" />
            <CheckboxInputComponent onChange={handleRate} label="Supervisor" />
            <CheckboxInputComponent onChange={handleRate} label="Work Condition (Schedule, Setting, Travel, Flexibility)" />
            <CheckboxInputComponent onChange={handleRate} label="Location / Commute" />
            <CheckboxInputComponent onChange={handleRate} label="Management" />
            <CheckboxInputComponent onChange={handleRate} label="Career Shift" />
            <CheckboxInputComponent onChange={handleRate} label="Health Reasons" />
            <CheckboxInputComponent onChange={handleRate} label="Family Care" />
            <CheckboxInputComponent onChange={handleRate} label="Too Strict Company Policy" />
            <CheckboxInputComponent onChange={handleRate} label="No Career Development / Enhancement" />
        </div>
    )
}
