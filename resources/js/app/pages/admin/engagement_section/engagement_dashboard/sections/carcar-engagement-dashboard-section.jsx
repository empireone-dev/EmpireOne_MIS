import { CakeIcon, ClipboardDocumentListIcon, SparklesIcon, SwatchIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function CarcarEngagementDashboardSection() {
    return (
        <div>
            <div class="text-center">
                <h2 class="text-3xl text-gray-950  font-semibold">ENGAGEMENT ACTIVITIES</h2>
                <p>(Carcar Site)</p>
                <p class="mt-6  ">Unlocking Insights, Elevating Engagement: Your Dashboard to User Interaction Mastery</p>
            </div>
            <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200  ">
                    <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-blue-500 to-white   blur-2xl opacity-25  "></div>
                    <div class="relative">
                        <div class="border border-blue-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg  /15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-blue-100  before:bg-gradient-to-b   before:shadow ">
                            <SparklesIcon />
                        </div>

                        <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p class=" ">Events For Today</p>
                        </div>

                        <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 ">
                            <div>CONTENT</div>
                        </div>
                    </div>
                </div>
                <div href="#" class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200  ">
                    <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-green-500 to-white   blur-2xl opacity-25  "></div>
                    <div class="relative">
                        <div class="border border-green-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg  /15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-green-100  before:bg-gradient-to-b   before:shadow ">
                            <SwatchIcon />
                        </div>

                        <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p class=" ">Upcoming Events</p>
                        </div>

                        <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 ">
                            <div>CONTENT</div>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200  ">
                    <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-red-500 to-white   blur-2xl opacity-25  "></div>
                    <div class="relative">
                        <div class="border border-red-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg  /15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-red-100  before:bg-gradient-to-b   before:shadow ">
                            <ClipboardDocumentListIcon />
                        </div>

                        <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p class=" ">Lists of Memo</p>
                        </div>
                        <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 ">
                            <div>CONTENT</div>
                        </div>
                    </div>
                </div>
                <div class="relative group overflow-hidden p-8 rounded-xl bg-white border border-gray-200  ">
                    <div aria-hidden="true" class="inset-0 absolute aspect-video border rounded-full -translate-y-1/2 group-hover:-translate-y-1/4 duration-300 bg-gradient-to-b from-yellow-500 to-white   blur-2xl opacity-25  "></div>
                    <div class="relative">
                        <div class="border border-yellow-500/10 flex relative *:relative *:size-6 *:m-auto size-12 rounded-lg  /15 before:rounded-[7px] before:absolute before:inset-0 before:border-t before:border-white before:from-yellow-100  before:bg-gradient-to-b   before:shadow ">
                            <CakeIcon />
                        </div>

                        <div class="mt-6 pb-6 rounded-b-[--card-border-radius]">
                            <p class=" ">Birthday(s) of the month of July</p>
                        </div>
                        <div class="flex gap-3 -mb-8 py-4 border-t border-gray-200 ">
                            <div>CONTENT</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
