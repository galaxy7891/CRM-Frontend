import Image from "next/image";
import React from "react";

const TableAction = () => {
  return (
    <div className="flex space-x-2">
      <input
        id="default-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 bg-font-white border-dark-navy rounded-[5px] checked:bg-dark-greenBright focus:ring-0"
      />

      <button>
        <Image
          src="/icons/table/edit.svg"
          alt="editbtn"
          width={12}
          height={12}
        />
      </button>
      <button>
        <Image
          src="/icons/table/dustbin.svg"
          alt="deletebtn"
          width={12}
          height={12}
        />
      </button>
    </div>
  );
};

export default TableAction;
