import { DislikeOutlined } from '@ant-design/icons';
import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { Modal } from 'antd';
import React from 'react'
import { useState } from 'react';
import NewJobOfferSection from './new-job-offer-section';

export default function DeclinedReasonSection({ data }) {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <div>
            <button
                type="button"
                onClick={showModal}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 shadow-lg shadow-red-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <DislikeOutlined />
            </button>
            <Modal
                title="Declined Job Offer"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                width={800}
                footer={null}
            >
                <div className="w-full">
                    <hr />
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2 mt-2" htmlFor="grid-text">
                        Reason for Declining Job Offer
                    </label>
                    <textarea
                        value={data.reas}
                        className="appearance-none block w-full h-60 border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        readOnly
                    />
                </div>
                <NewJobOfferSection
                    data={data}
                    setIsModalVisible={setIsModalVisible}
                />
            </Modal>
            {/* <ApplicantJobOfferComponent
                item={{
                    label: "Job Offer",
                    key: "9",
                    icon: (
                        <BriefcaseIcon className="h-4 mr-0.5" />
                    ),
                }}
                data={data}
            /> */}
        </div>
    )
}
