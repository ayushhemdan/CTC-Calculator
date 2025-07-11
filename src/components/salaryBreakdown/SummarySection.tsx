import React from 'react'
import { formatINR } from '../../utils/formatters'
import type{ IncomeTaxType } from './DeductionSection'
import { totalDeduction } from '../../utils/taxUtils'

interface SummarySectionType {
  isChecked :boolean,
  epfY: number,
  esiY: number,
  tax: number,
  incomeTax: IncomeTaxType,
  isMonthly: boolean
}

const SummarySection:React.FC<SummarySectionType> = ({isChecked,epfY,esiY,tax,incomeTax,isMonthly}) => {
  return (
    <div>
      
        <p className=' m-2 text-gray-700 text-sm font-semibold'>Summary</p>
        
        <div className='flex justify-between m-2'>
          <span className='text-gray-500'>Total Deduction
          </span>
          <span className='text-[#e22626] font-semibold'>{formatINR(isMonthly ? totalDeduction(isChecked ? -epfY : 0, -esiY, tax * 12, incomeTax.yearlyIncomeTax) / 12 : totalDeduction(isChecked ? -epfY : 0, -esiY, tax, incomeTax.yearlyIncomeTax))}</span>
        </div>
    </div>
  )
}

export default SummarySection