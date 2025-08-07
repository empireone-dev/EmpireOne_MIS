
import React, { useRef } from "react";
import { useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import Button from "../../_components/button";

export default function SignaturePadSection({ submit, data, setForm }) {
    const sigPadRef = useRef(null);

    useEffect(() => {
        if (data.signature && sigPadRef.current) {
            sigPadRef.current.fromDataURL(data.signature);
        }
    }, [data.signature]);

    const clearSignature = () => {
        sigPadRef.current.clear();
    };

    const saveSignature = () => {
        const dataURL = sigPadRef.current.toDataURL();
        submit({
            ...data,
            signature: dataURL,
        });
    };

    return (
        <>
            <div className="bg-cover bg-[url('/images/SCemp.jpg')] bg-center transition-colors duration-300 overflow-y-scroll h-screen p-14">
                <div className="bg-white border-2 border-gray-500 rounded-lg p-7">
                    <div className="mb-1 text-sm text-gray-600">
                        <p className="mb-2">Please sign in the box below using your mouse, trackpad, or touch screen:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>Draw your signature clearly within the designated area</li>
                            <li>Use the "CLEAR" button to start over if needed</li>
                            <li>Click "SUBMIT" when you're satisfied with your signature</li>
                        </ul>
                        <div className=" font-bold text-lg capitalize text-black bg-white text-center rounded-t-md">Signature Pad</div>
                    </div>
                    <SignatureCanvas
                        className="w-full"
                        ref={sigPadRef}
                        penColor="black"
                        canvasProps={{
                            style: { width: "100%", height: "500px", backgroundColor: "white", border: "5px solid gray" },
                            className: "signature-canvas",
                        }}
                    />

                    <div className="flex gap-3 mt-3">
                        <Button
                            className={`bg-red-500 hover:bg-red-600 text-white`}
                            onClick={clearSignature}>
                            CLEAR
                        </Button>
                        <Button
                            className={`bg-blue-500 hover:bg-blue-600 text-white`}
                            onClick={saveSignature}>
                            SUBMIT
                        </Button>
                    </div>
                </div>

            </div>

        </>
    );
}
