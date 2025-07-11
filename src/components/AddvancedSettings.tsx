import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { useMyContext } from '../context/MyContext';
import { salaryBreakdownAmount } from '../utils/taxUtils';
import { useEffect, useState } from 'react';

export type salaryBreakdown = {
  basicSalary: number,
  hra: number,
  da: number,
  lta: number,
  specialAllowance: number,
  performanceBonus: number
};


export const AdvancedSettings = () => {
  const { setIsChecked, isCheckedTax, isNew, setShow, setIsNew, isChecked, isMonthly, setIsEpf, setIsCheckedTax, ctc, setSalaryBreakdown, salaryBreakdown, isShow, isAmount, setIsAmount } = useMyContext();
  function isEpfApplicable() {
    setIsChecked((prev) => !prev);
  }


  const amount:salaryBreakdown = salaryBreakdownAmount(salaryBreakdown, ctc);

  console.log(salaryBreakdown);

  useEffect(() => {
    if (isChecked) {
      const calculatedEPF = -(Math.round(amount.basicSalary * 0.12))
        
      setIsEpf(calculatedEPF);
    } else {
      setIsEpf(0);
    }
  }, [amount.basicSalary, isMonthly, isChecked]);

  const totalPercentage = Object.values(salaryBreakdown).reduce((t, v) => t + v, 0);
  const [showCtcError, setShowCtcError] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const name = event.target.name;
    const value = Number(event.target.value);
    const isNumber = Number(value);
    if (isNaN(isNumber)) return;

    const updatedBreakdown = { ...salaryBreakdown, [name]: value };

    if (isAmount) {
      const updatedAmounts = salaryBreakdownAmount(updatedBreakdown, ctc);
      const updatedTotal = Object.values(updatedAmounts).reduce((t, v) => Math.round(t + v), 0);

      if (updatedTotal > ctc) {
        setShowCtcError(true);
        return;
      }
    } else {
      setSalaryBreakdown(updatedBreakdown);
    }
  };

  function handleTax() {
    setIsCheckedTax(!isCheckedTax);
  }

  return (
    <div className='w-full'>
      <div className='flex justify-between my-4 text-[rgb(79,70,229)]' >
        <p className='font-semibold text-gray-700'>Advanced Settings</p>
        <button onClick={() => setShow(prev => !prev)}>{

          isShow ? (<div className='flex'>
            Hide <FaChevronUp className='ml-1 translate-y-[30%]' />
          </div>) :
            (
              <div className='flex justify-center item-center'>
                Show <FaChevronDown className='ml-1 translate-y-[30%]' />
              </div>)

        }</button>
      </div>


      <div className={`mt-2 ${isShow ? 'visible' : 'hidden'}    h-[320px] overflow-auto`}>

        <p className='font-bold'>Customize Components</p>
        {/*the total should be 100% message*/}
        <div className='pr-4 mt-4 w-full'>
          {
            (!isAmount && (totalPercentage > 100 || totalPercentage < 100)) &&
            <p className='text-[rgb(220,38,38)] bg-[rgb(254,242,242)] text-sm p-2 border border-[rgb(225,169,169)] rounded'>Total Percentage should be 100%. Currently it's {totalPercentage}%</p>
          }
          {isAmount && ((totalPercentage > 100) || (showCtcError)) && (
            <p className='text-red-600 bg-red-100 text-sm p-2 border border-red-300 rounded'>
              Total amount cannot exceed yearly CTC of {Math.round(ctc)}
            </p>
          )}

        </div>

        <div className='flex mt-4 justify-between mr-6'>
          <p>Component</p>
          <p>Percentage</p>
          <p>Amount</p>
        </div>
        <div className='text-sm text-gray-700'>
          <div className='flex mt-4 gap-4 text-gray'>
            <p>Input Mode:</p>
            <button className={` rounded shadow px-1 py-1 ${!isAmount ? 'bg-[rgb(79,70,229)] text-white' : 'bg-gray-200'}`} onClick={() => setIsAmount((isAmount) ? !isAmount : isAmount)}>Percentage</button>
            <button className={` rounded shadow px-1 py-1 ${isAmount ? 'bg-[rgb(79,70,229)] text-white' : 'bg-gray-200'}`} onClick={() => setIsAmount((!isAmount) ? !isAmount : isAmount)}>Amount</button>
          </div>


          <div>
            {Object.entries(salaryBreakdown).map(([key, value]) => (
              <div className='flex mt-4  justify-between text-gray' key={key}>
                <p>
                  {key
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, c => c.toUpperCase())}:
                </p>
                <input type="text"  value={isAmount ? Math.round(amount[key as keyof typeof amount]) : value}
                  name={key} className='rounded shadow-sm px-2 mx-3 w-[45%]'
                  onChange={(e) => handleChange(e)}
                />
              </div>
            ))}
          </div>

          {/*the total should be 100% message*/}
          <div className='pr-4 py-4 w-full'>
            {
              (!isAmount && (totalPercentage > 100 || totalPercentage < 100)) &&
              <p className='text-[rgb(220,38,38)]  text-sm p-2'>Total Percentage should be 100%. Currently it's {totalPercentage}%</p>

            }
            {isAmount && ((totalPercentage > 100) || (showCtcError)) && (
              <p className='text-[rgb(220,38,38)]  text-sm p-2'>
                Total amount cannot exceed yearly CTC of {ctc}
              </p>
            )}

          </div>

          <div className='flex mt-2 gap-4 text-gray'>
            <p>Tag Regime: </p>
            <button className={` px-2 py-1 rounded  ${!isNew
              ? ('bg-[rgb(79,70,229)] text-white') :
              ('bg-gray-200 text-gray-800')
              } `}
              onClick={() => (isNew === true) ? setIsNew(!isNew) : setIsNew(isNew)}
            >Old</button>
            <button className={` px-2 py-1 rounded ${isNew
              ? ('bg-[rgb(77,70,228)] text-white') :
              ('bg-gray-200 text-gray-800')
              } `}

              onClick={() => (isNew === false) ? setIsNew(!isNew) : setIsNew(isNew)}>New</button>
          </div>
          <div className='flex mt-4 gap-2 text-gray'>
            <input type="checkbox" checked={isChecked} className='border' name='isepf' id="isepf" onChange={isEpfApplicable} />
            <label htmlFor='isepf'>EPF Applicable</label>
          </div>
          <div className='flex mt-4 gap-2 text-gray'>
            <input type="checkbox" className='border' name='istax' id="istax" checked={isCheckedTax} onChange={handleTax} />
            <label htmlFor='istax'>Professional Tax Applicable</label>
          </div>

          <div className='mt-4'>
            <select className='w-full flex justify-between  py-2 px-2'>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Telangana">Telangana</option>
              <option value="West Benga">West Bengal</option>
              <option value="Custom">Custom</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
