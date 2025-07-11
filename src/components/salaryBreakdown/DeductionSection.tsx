import React from 'react'
import { formatINR } from '../../utils/formatters'

export interface IncomeTaxType {
  finalTax: number;
  tax: number;
  marginalRelief: number;
  cess: number;
  yearlyIncomeTax: number;
}
export interface DeductionsSectionTypes {
  epf: number;
 
  esi: number;
  isChecked: boolean;
  tax: number;
standardDeduction: number,
 grossSalary:number,
 setShowDetails: (value:boolean) => void;
 isShowDetails: boolean;

  incomeTax: IncomeTaxType;
  ctc: number;
}

const DeductionSection:React.FC<DeductionsSectionTypes> = ({standardDeduction,grossSalary,isChecked,esi,epf,ctc,tax,setShowDetails,isShowDetails,incomeTax}) => {
  return (
    <div>
       <div className='flex justify-between m-2'>
                <span className='text-gray-500'>Standard Deduction
                </span>
                <span className='text-red-600 font-semibold'>{formatINR(standardDeduction)}</span>
              </div>
      
              <div className='flex justify-between m-2'>
                <span className='text-gray-500 text-sm'>Taxable Income (before other deductions)
                </span>
                <span>{formatINR(grossSalary + standardDeduction)}</span>
              </div>
              <p className='border-b-2'></p>
      
      
              <p className=' m-2 text-gray-700 text-sm font-semibold'>Deductions</p>
              <div className='flex justify-between m-2'>
                <span className='text-gray-500'>EPF (Employee)
                </span>
                <span className={`font-semibold ${isChecked ? 'text-red-600' : 'text-gray-500'}`}>{isChecked ? formatINR(epf) : 'Not Opted'}</span>
              </div>
              <div className={`flex justify-between m-2 text-sm ${isChecked ? 'visible' : 'hidden'}`}>
                <span className='text-gray-500'>EPF (Employer)
                </span>
                <span>{isChecked ? formatINR(epf) : 'Not Opted'}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span className='text-gray-500'>ESI (Employee)
                </span>
                <span className={` ${(esi === 0) ? 'text-gray-500' : 'text-[#e22626] font-semibold'}`}>{(esi === 0) ? 'Not Applicable' : formatINR(esi)}</span>
              </div>
              <div className={`flex justify-between m-2 text-sm ${(esi===0)?'hidden':'visible'}`}>
                <span className='text-gray-500'>ESI (Employer)
                </span>
                <span>{formatINR(Math.round((ctc) * 0.0325))}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span className='text-gray-500'>Professional Tax
                </span>
                <span className={`${(tax === 0) ? 'text-gray-500' : 'text-[#e22626] font-semibold'}`}>{(tax === 0) ? 'Not Applicable' : formatINR(tax)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span className='text-gray-500'>Income Tax <span className='text-[rgb(79,70,229)] text-xs cursor-pointer' onClick={() => setShowDetails(!isShowDetails)}>{(isShowDetails) ? 'Hide Details' : 'Show Details'}</span></span>
                <span className='text-[#e22626] font-semibold'>{formatINR(incomeTax.finalTax)}</span>
              </div>
      
      
              <div className={`border-l-2 border-gray-300 ml-7 my-2 px-2 text-sm ${(isShowDetails) ? 'visible' : 'hidden'}`}>
                <div className='flex justify-between text-gray-500 p-1 '>
                  <span>Base Tax</span><span className='text-[#e22626] font-semibold'>{formatINR(incomeTax.tax)}</span>
                </div>
                <div className={`flex justify-between text-gray-500 p-1 ${(incomeTax.marginalRelief === 0) ? 'hidden' : 'visible'}`}>
                  <span>Marginal Relief</span><span className='text-[#2ba95b] font-semibold'>+{formatINR(incomeTax.marginalRelief)}</span>
                </div>
                <div className='flex justify-between text-gray-500 p-1'>
                  <span>Cess</span><span className='text-[#e22626] font-semibold'>{formatINR(incomeTax.cess)}</span>
                </div>
              </div>
      
    </div>
  )
}

export default DeductionSection