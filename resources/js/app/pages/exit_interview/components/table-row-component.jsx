import React from 'react'

export default function TableRowComponent({title}) {
    return (
        <tr>
                <td className="border border-gray-300 py-2">{title}</td>
                <td className="border border-gray-300 py-2 w-12"><input type="radio" id="r1" name="job1" value="1" /></td>
                <td className="border border-gray-300 py-2 w-12"><input type="radio" id="r2" name="job1" value="2" /></td>
                <td className="border border-gray-300 py-2 w-12"><input type="radio" id="r3" name="job1" value="3" /></td>
                <td className="border border-gray-300 py-2 w-12"><input type="radio" id="r4" name="job1" value="4" /></td>
                <td className="border border-gray-300 py-2 w-12"><input type="radio" id="r5" name="job1" value="5" /></td>
        </tr>
    )
}

