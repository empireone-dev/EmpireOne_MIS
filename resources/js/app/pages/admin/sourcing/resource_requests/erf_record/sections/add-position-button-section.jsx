import React from "react";
import AddNewPositionSection from "./add-new-position-section";
import AddExistingPositionSection from "./add-existing-position-section";
export default function AddPositionButtonSection() {
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <AddNewPositionSection/>
                {/* <AddExistingPositionSection/> */}
            </div>
        </div>
    );
}
