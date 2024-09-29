import { FileTextFilled } from '@ant-design/icons'
import React from 'react'

export default function File201ContractSection({data}) {
    return (
        <div>
            <button
                type="button"
                className="text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-yellow-300  shadow-lg shadow-yellow-500/50 font-medium rounded-lg text-lg px-3.5 py-2 text-center"
            >
                <FileTextFilled />
            </button>
        </div>
    )
}
