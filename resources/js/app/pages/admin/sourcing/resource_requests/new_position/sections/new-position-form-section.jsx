import React from 'react'
import { Stepper, Step, CardHeader, Typography } from "@material-tailwind/react";

export default function NewPositionFormSection() {
    const [activeStep, setActiveStep] = React.useState(0);
    return (
        <div className="w-full py-4 px-8">
            <CardHeader floated={false} variant="gradient" color="gray" className="grid h-24 m-0 place-items-center">
                <div className="w-full px-20 pt-4 pb-8">
                    <Stepper
                        activeStep={activeStep}
                        lineClassName="bg-gray-300"
                        activeLineClassName="bg-black"
                    >
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 cursor-pointer"
                            activeClassName="ring-0 !bg-black text-black"
                            completedClassName="!bg-black text-black"
                            onClick={() => setActiveStep(0)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography variant="h6" color="inherit">Employee Requisition</Typography>
                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 cursor-pointer"
                            activeClassName="ring-0 !bg-black text-black"
                            completedClassName="!bg-black text-black"
                            onClick={() => setActiveStep(1)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography variant="h6" color="inherit">Job Analysis</Typography>
                            </div>
                        </Step>
                        <Step
                            className="h-4 w-4 !bg-blue-gray-50 cursor-pointer"
                            activeClassName="ring-0 !bg-black text-black"
                            completedClassName="!bg-black text-black"
                            onClick={() => setActiveStep(2)}
                        >
                            <div className="absolute -bottom-[2.3rem] w-max text-center text-xs">
                                <Typography variant="h6" color="inherit">Job Description</Typography>
                            </div>
                        </Step>
                    </Stepper>
                </div>
            </CardHeader>
        </div>
    )
}
