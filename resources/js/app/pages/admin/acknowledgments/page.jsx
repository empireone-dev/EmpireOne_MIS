import React from "react";
import AcknowledgmentsTableSection from "./sections/acknowledgments-table-section";
import AdminLayout from "../admin-layout";
import { useEffect } from "react";
import store from "@/app/store/store";
import { get_employee_with_acknowledgment_thunk } from "../employee_relation/employee_section/redux/employee-section-thunk";
import { useState } from "react";
import Skeleton from "../../_components/skeleton";

export default function page() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            await store.dispatch(get_employee_with_acknowledgment_thunk());
            setLoading(false);
        }
        loadData();
    }, []);
    return (
        <AdminLayout>
            {loading ? (
                <div>
                    <Skeleton />
                </div>
            ) : (
                <AcknowledgmentsTableSection />
            )}
        </AdminLayout>
    );
}
