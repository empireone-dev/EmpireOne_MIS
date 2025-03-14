import { CopyOutlined, PlusSquareFilled, PlusSquareTwoTone } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Modal } from "antd";
import React, { useState } from "react";

export default function AddExistingPositionSection() {
    const [open, setOpen] = useState(false);
    return (
        <div className="my-2">
            <div class="inline-flex rounded-md shadow-sm" role="group">
                <button
                    type="button"
                    onClick={() =>
                        router.visit(
                            "/admin/sourcing/erf_record/existing_position"
                        )
                    }
                    class="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-500 bg-transparent border border-blue-500 rounded-e-lg hover:bg-blue-500 hover:text-white focus:z-10 focus:ring-2 focus:ring-blue-500 focus:bg-blue-500 focus:text-white      gap-1"
                >
                    <CopyOutlined className="text-xl" />
                    Request Existing Position
                </button>
            </div>
        </div>
    );
}
