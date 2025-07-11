import React from 'react';
import { useMyContext } from '../context/MyContext';


export type Props = {
  toggleMode: (value: boolean) => void;
}


const CTCInput = () => {
  const {ctc,setCtc,isMonthly,setIsMonthly} = useMyContext();

  const handleCtcInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const numericString = e.target.value.replace(/\D/g,'');
    const numericValue = Number(numericString);
    setCtc(isNaN(numericValue)?0:numericValue);
  }

  function toggleMode(monthly: boolean) {
 
  if (monthly !== isMonthly){
  const newCtc = monthly ? (ctc / 12) : (ctc * 12);
  setCtc(newCtc);
  setIsMonthly(monthly);
  }

 
}
  return (
    <div>
      <p className='text-lg font-semibold  text-center lg:text-left'>Cost to Company (CTC)</p>
      <div className="flex items-center space-x-2 relative m-w-[500px]">
        <span className='absolute left-5 mt-3 text-gray-500 font-semibold text-md '>₹</span>
        <input
          type="text"
          value={(Math.round(ctc))}
          onChange={handleCtcInput}
          placeholder={`Enter your ${isMonthly ? "monthly" : "yearly"} CTC`}
          className="shadow-md py-4 px-6 rounded-lg w-full mt-4 mb-1 border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
        <span className='absolute right-6 top-8 text-gray-600 text-sm'  >{isMonthly ? 'monthly' : 'yearly'}</span>
      </div>

      <p className="text-sm text-gray-600 pl-2">
        Enter your {isMonthly ? "monthly" : "yearly"} Cost to Company (CTC) amount in Indian Rupees
      </p>
      <div className='flex gap-4'>
        <button
          onClick={() => toggleMode(true)}
          className={`mt-4 px-4 py-2 w-full  rounded-lg font-semibold transition-colors duration-200 ${isMonthly ? 'bg-[rgb(79,70,229)] text-white' : 'bg-gray-200'}`}
        >
          Monthly
        </button>

        <button
          onClick={() => toggleMode(false)}
          className={`mt-4 px-4 py-2 w-full rounded-lg font-semibold transition-colors duration-200 ${!isMonthly ? 'bg-[rgb(79,70,229)] text-white' : 'bg-gray-200'}`}

        >
          Yearly
        </button>
      </div>
    </div>
  );
}
export default CTCInput;