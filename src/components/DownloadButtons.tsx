
import { DownloadPDFButton } from "./DownloadPDF";
// import { SalarySlipPdf } from "./SalarySlipPDF";

import { DownloadExcel } from "./DownloadExcel";
import { FiDownload } from "react-icons/fi";
export const DownloadButtons = () => {
  return (
    <>
      <div className='flex gap-2 justigy-center item-center bg-[#4338ca] hover:bg-indigo-900 transition text white py-2 px-6 rounded text-white shadow ' >
        < FiDownload className="translate-y-[30%]" />  < DownloadPDFButton />
      </div>

      < DownloadExcel />
    </>
  );
}