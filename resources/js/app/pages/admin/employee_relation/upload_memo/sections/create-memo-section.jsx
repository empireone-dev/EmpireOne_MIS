import Wysiwyg from '@/app/pages/_components/wysiwyg';
import React, { useEffect, useRef, useState } from 'react';

export default function CreatedMemoSection() {

    return (
        <div>
            <div className="mx-auto p-4">
                <form action="/submit-post" method="POST">
                    <div className="mb-6">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-1">Memo Title</label>
                        <input type="text" id="title" name="title" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" placeholder='Memo Title' required />
                        <label htmlFor="title" className="block text-lg font-medium text-gray-800 mb-1">Site</label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" name="Site" >
                            <option value="" disabled selected><b>Select a Site to announce</b></option>
                            <option value="San Carlos">San Carlos</option>
                            <option value="Carcar">Carcar</option>
                            <option value="Both">Both</option>
                        </select>
                    </div>


                    <div className="mb-2">
                        <label htmlFor="content" className="block text-lg font-medium text-gray-800">Content</label>
                        <Wysiwyg
                        label=""
                        name="wysiwyg"
                        value=""
                    // onChange={formHandler}
                    />
                    </div>
                    <div className="flex justify-end mt-12">
                        <button type="submit" className="px-6 py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 focus:outline-none">Submit</button>
                    </div>
                </form>
            </div>

        </div>
    );
}
