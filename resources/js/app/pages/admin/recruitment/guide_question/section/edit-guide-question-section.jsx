import React from 'react'

export default function EditGuideQuestionSection() {
    return (
        <div>
           <form className="w-full">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlFor="grid-text">
                                Guide Question
                            </label>
                            <input className="appearance-none block w-full border border-gray-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-text" type="text" placeholder="" />
                        </div>
                    </div>
                </form>
        </div>
    )
}
