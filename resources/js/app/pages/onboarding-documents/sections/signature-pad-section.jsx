
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
            <div className="border-2 rounded-md m-3">
                <div className="p-2 font-bold capitalize">Signature Pad</div>
                <SignatureCanvas
                    className="w-full"
                    ref={sigPadRef}
                    penColor="black"
                    canvasProps={{
                        style: { width: "100%", height: "300px" },
                        className: "signature-canvas",
                    }}
                />

                <div className="flex gap-3">
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

        </>
    );
}
