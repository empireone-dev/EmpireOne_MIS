import React, { useState } from 'react';

export default function ModalComponent() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div id="app" className="h-screen bg-gray-100 overflow-hidden">
      {/* Modal trigger */}
      <button 
        onClick={() => setShowModal(!showModal)}
        className="bg-indigo-500 hover:bg-indigo-600 focus:outline-none rounded-md px-6 py-3 mx-auto block text-white transition duration-500 ease-in-out mt-32">Open modal
      </button>
      {/* ./Modal trigger */}
      <div className="flex items-center justify-center absolute h-screen top-0 left-0"></div>
      <div className={`custom ${showModal ? "animate__animated animate__bounceInDown" : ""}`}>
        {/* Modal */}
        {showModal && (
          <div className="w-11/12 lg:w-full max-w-xl z-20 mx-auto bg-white flex flex-col relative self-center shadow-2xl rounded-md">
            {/* Modal header */}
            <div className="p-6 border-b-4 border-gray-200 text-lg font-bold text-indigo-400">Modal title</div>
            {/* ./Modal header */}
            
            {/* Modal body */}
            <div className="p-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident officiis ipsam cupiditate illum laborum atque voluptatibus ut doloremque excepturi quisquam repellendus dolor deserunt totam tempore, laboriosam earum sapiente esse praesentium.
            </div>
            {/* ./Modal body */}
            
            {/* Modal footer */}
            <div className="border-t-4 border-gray-200 p-6 flex justify-end">
              <button onClick={() => setShowModal(false)} className="bg-green-400 hover:bg-green-500 focus:outline-none  px-4 py-2 rounded-md text-white transition duration-500 ease-in-out">Close Modal</button>
            </div>
            {/* ./Modal footer */}
          </div>
        )}
        {/* ./Modal */}
      </div>
      
      <div className={`custom ${showModal ? "animate__animated animate__fadeIn" : "animate__animated animate__fadeOut"}`}>
        {/* Overlay */}
        {showModal && <div className="bg-gray-700 bg-opacity-50 fixed bottom-0 left-0 w-full h-full transition duration-500 ease-in-out transfom z-10"></div>}
        {/* ./Overlay */}
      </div>
    </div>
  );
}

