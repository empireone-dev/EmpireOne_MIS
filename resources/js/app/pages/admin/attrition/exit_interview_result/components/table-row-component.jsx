import React from 'react'

export default function TableRowComponent({ title, value1, value2, value3, value4, value5, name1, name2, name3, name4, name5, onChange, selectedValue }) {
    return (
        <tr>
            <td className="border border-gray-300 py-2">{title}</td>
            <td className="border border-gray-300 py-2 w-12">
                <input 
                    onChange={(e) => onChange(e)} 
                    type="radio" 
                    id={name1} 
                    name={name1} 
                    value={value1} 
                    checked={selectedValue === value1}
                />
            </td>
            <td className="border border-gray-300 py-2 w-12">
                <input 
                    onChange={(e) => onChange(e)} 
                    type="radio" 
                    id={name2} 
                    name={name2} 
                    value={value2} 
                    checked={selectedValue === value2}
                />
            </td>
            <td className="border border-gray-300 py-2 w-12">
                <input 
                    onChange={(e) => onChange(e)} 
                    type="radio" 
                    id={name3} 
                    name={name3} 
                    value={value3} 
                    checked={selectedValue === value3}
                />
            </td>
            <td className="border border-gray-300 py-2 w-12">
                <input 
                    onChange={(e) => onChange(e)} 
                    type="radio" 
                    id={name4} 
                    name={name4} 
                    value={value4} 
                    checked={selectedValue === value4}
                />
            </td>
            <td className="border border-gray-300 py-2 w-12">
                <input 
                    onChange={(e) => onChange(e)} 
                    type="radio" 
                    id={name5} 
                    name={name5} 
                    value={value5} 
                    checked={selectedValue === value5}
                />
            </td>
        </tr>

    )
}

