
import { formatINR } from '../../utils/formatters'
import type { salaryBreakdown } from '../AddvancedSettings'

interface earningssSectionType {
  breakdown: salaryBreakdown,
  grossSalary: number
}

const EarningSection = ({breakdown, grossSalary}:earningssSectionType )=> {
  return (
    <div>
        <p className='text-gray-600 font-semibold pl-2 pt-2 '>Earnings</p>
              <div className='flex justify-between m-2 '>
                <span>Basic Salary</span>
                <span className='font-bold'>{formatINR(breakdown.basicSalary)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span>HRA</span>
                <span className='font-bold'>{formatINR(breakdown.hra)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span>DA</span>
                <span className='font-bold'>{formatINR(breakdown.da)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span>LTA</span>
                <span className='font-bold'>{formatINR(breakdown.lta)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span>Special Allowance</span>
                <span className='font-bold'>{formatINR(breakdown.specialAllowance)}</span>
              </div>
              <div className='flex justify-between m-2'>
                <span>Performance Bonus</span>
                <span className='font-bold'>{formatINR(breakdown.performanceBonus)}</span>
              </div>
              <p className='border-b-2'></p>
              <div className='flex justify-between m-2'>
                <span className='font-bold text-gray-500'>Gross Salary</span>
                <span>{formatINR(Math.round(grossSalary))}</span>
              </div>
    </div>
  )
}

export default EarningSection;