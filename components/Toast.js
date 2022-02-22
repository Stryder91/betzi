import Image from "next/image";
import { useState, useEffect } from "react";
import cancel from '../public/cancel.svg'
export const Toast = ({color="green", title="", msg=""}) => {

  const [display, SetDisplay] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SetDisplay(false)
    }, 5000);
  }, []);
  
  if (color == "green") {
    color = "green-500"
  } 
  if (color == "red") {
    color = "red-600"; title = "An error occured"
  }
  if (color && display) {
    return (
      <div className={`fixed top-5 right-5 bg-${color} shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block mb-3`} id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
        <div className={`bg-${color} flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-${color} rounded-t-lg`}>
          <p className="font-bold text-white flex items-center">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" className="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path>
            </svg>
            {title}</p>
          <div onClick={() => SetDisplay(false)} className="flex items-center cursor-pointer">
            <Image src={cancel} alt="cancel" width="20" height="20"/>
          </div>
        </div>
        <div className={`p-3 bg-${color} rounded-b-lg break-words text-white`}>
          {msg}
        </div>
      </div>
    );
  }

  return <></>
}