import React from "react";
import { MdModeEdit } from "react-icons/md";

const AddProductButton = ({ openDialog }) => (
  <div className="flex items-center ml-5 my-3">
    <div className="w-[215px] h-[32px] border-2 shadow-md flex justify-between items-center">
      <span className="px-2 text-gray-400">Select Product</span>
      <MdModeEdit
        onClick={openDialog}
        className="mr-5 my-1 text-xl w-4 h-4 text-[#00000033] hover:text-givenGreen cursor-pointer"
        aria-label="Edit product"
      />
    </div>
    <div className="w-[141px] h-[32px] ml-2">
      <button
        className="w-full h-full bg-givenGreen rounded-[4px] text-white"
        onClick={() => alert("please")}
      >
        Add Discount
      </button>
    </div>
  </div>
);

export default AddProductButton;
