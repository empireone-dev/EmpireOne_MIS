import { InstagramOutlined } from '@ant-design/icons'
import React from 'react'

export default function AdminFooterComponents() {
  return (
    <div>
        <footer class="bg-white shadow sm:flex sm:items-center sm:justify-between sm:p-4  antialiased">
  <p class="mb-4 text-sm text-center text-gray-500  sm:mb-0">
      &copy; 2024-2027 <a href="https://empireonecontactcenter.com//" class="hover:underline" target="_blank">empireonecontactcenter.com</a>. All rights reserved.
  </p>
  <div class="flex justify-center items-center space-x-1">
    <a href="#" data-tooltip-target="tooltip-facebook" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer   hover:text-gray-900 hover:bg-gray-100 ">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
            <path fill-rule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clip-rule="evenodd"/>
        </svg>
        <span class="sr-only">Facebook</span>
    </a>
    <div id="tooltip-facebook" role="tooltip" class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip ">
        Like us on Facebook
        <div class="tooltip-arrow" data-popper-arrow></div>
    </div>
    <a href="#" data-tooltip-target="tooltip-twitter" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer   hover:text-gray-900 hover:bg-gray-100 ">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor" d="M12.186 8.672 18.743.947h-2.927l-5.005 5.9-4.44-5.9H0l7.434 9.876-6.986 8.23h2.927l5.434-6.4 4.82 6.4H20L12.186 8.672Zm-2.267 2.671L8.544 9.515 3.2 2.42h2.2l4.312 5.719 1.375 1.828 5.731 7.613h-2.2l-4.699-6.237Z"/>
        </svg>
        <span class="sr-only">Twitter</span>
    </a>
    <a href="#" data-tooltip-target="tooltip-github" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer   hover:text-gray-900 hover:bg-gray-100 ">
        <InstagramOutlined className='text-lg'/>
        <span class="sr-only">Instagram</span>
    </a>
</div>
</footer>
    </div>
  )
}
