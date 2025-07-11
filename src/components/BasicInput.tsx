
import { useEffect } from 'react';
import CTCInput from './CTCInput';;
import { useMyContext } from '../context/MyContext';
import { AdvancedSettings } from './AddvancedSettings';
import { SalaryBreakdown } from './salaryBreakdown/SalaryBreakdown';
import { DownloadButtons } from './DownloadButtons';



const BasicInput = () => {
  const { ctc, isEmpty, setEmpty , isShow} = useMyContext();

  useEffect(() => {
    setEmpty(ctc >= 1);
  }, [ctc]);

  if (ctc === 0 && isEmpty === true) setEmpty(!isEmpty)
  return (
  <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-4 ">
        <h2 className="text-3xl font-bold mb-3">CTC Calculator</h2>
        <p className="text-gray-600">
          Calculate your take-home salary and understand your complete compensation structure
        </p>
      </div>

      <div className=" p-3 lg:p-6  md:p-8 bg-white border rounded-xl shadow-xl mb-6 min-h-[350px] space-y-4">
        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-4 lg:space-y-0">
          {/* Input and Advanced Settings */}
          <div className={`transition-all duration-10 w-full ${isShow ? 'lg:w-2/3' : 'lg:w-1/2'}`}>
            <CTCInput />
            <div className="mt-4">
            
              { <AdvancedSettings />}
            </div>
          </div>

          {/* Salary Breakdown */}
          <div
            className={`transition-all duration-300 w-full ${
              isShow ? 'lg:w-[560px]' : 'lg:w-1/2'
            }`}
          >
            <SalaryBreakdown />
          </div>
        </div>

        <div className="flex justify-end mb-4 flex-wrap gap-3 pt-4 border-t">
          <DownloadButtons />
        </div>
      </div>
    </div>

  );
};

export default BasicInput;
