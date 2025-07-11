

import { useMemo, useState, useEffect } from 'react';
import { formatINR } from '../../utils/formatters';
import {
  calculateESI,
  calculateEPF,
  calculateStandardDeduction,
  calculateProfessionalTax
} from '../../utils/salaryUtils';

import { calculateIncomeTax, salaryBreakdownAmount, totalDeduction } from '../../utils/taxUtils';
import { useMyContext } from '../../context/MyContext';
import { NetSalarySection } from './NetSalarySection';
import EarningSection from './EarningSection';
import DeductionSection from './DeductionSection';
import SummarySection from './SummarySection';

let netAnnual = 0, netMonthly = 0;

export function totalSalary() {
  return { netAnnual, netMonthly }
}

export const SalaryBreakdown = () => {
  const {
    isMonthly,
    isEmpty,
    ctc,
    isChecked,
    isCheckedTax,
    isNew,
    setIsEsi,
    esi,
    epf,
    salaryBreakdown,
    grossSalary,
  } = useMyContext();

  const incomeTax = useMemo(() => calculateIncomeTax(grossSalary, isMonthly), [grossSalary, isMonthly]);
  const breakdown = useMemo(() => salaryBreakdownAmount(salaryBreakdown, ctc), [salaryBreakdown, ctc]);
  const { monthly: esiM, yearly: esiY } = useMemo(() => calculateESI(grossSalary, isMonthly), [grossSalary, incomeTax.finalTax, isMonthly]);
  const { monthly: epfM, yearly: epfY } = useMemo(() => calculateEPF(breakdown.basicSalary, isMonthly), [breakdown.basicSalary, isMonthly]);
  setIsEsi(isMonthly ? -esiM : -esiY);
  const { monthly: ptM, yearly: ptY } = useMemo(() => calculateProfessionalTax(grossSalary, isMonthly, isCheckedTax), [grossSalary, isMonthly, isCheckedTax]);
  const standardDeduction = useMemo(() => calculateStandardDeduction(isNew, isMonthly), [isNew, isMonthly]);

  const [isShowDetails, setShowDetails] = useState<boolean>(false);

  console.log('netMonthly:' + netMonthly);
  useEffect(() => {
    setIsEsi(-esiM);
  }, [esiM]);
  const tax = isMonthly ? ptM : ptY;

  const td = (-totalDeduction(isChecked ? -epfY : 0, -esiY, tax * 12, incomeTax.yearlyIncomeTax));

  netAnnual = isMonthly
    ? (grossSalary * 12) - (
      td)

    : (grossSalary) - (
      td);

  netMonthly = !isMonthly ? (grossSalary / 12) -
    (td / 12)
    : (grossSalary - td / 12
    )

  return (
    <div  className={`bg-gray-100 p-4 rounded-xl ${isEmpty ? 'visible' : 'hidden'}  lg:ml-4 mb-4 mt-2 lg:mt-0`} >
      <h1 className='text-xl font-semibold mb-4'>Salary Breakdown under New Tax Regime (2025-2026)</h1>
      < NetSalarySection
        incomeTax={incomeTax}
        epfY={epfY}
        esiY={esiY}
        tax={tax} />

      <div>
        < EarningSection breakdown={breakdown} grossSalary={grossSalary} />

        <DeductionSection

          standardDeduction={standardDeduction}
          grossSalary={grossSalary}
          isChecked={isChecked}
          esi={esi}
          epf={epf}
          ctc={ctc}
          tax={tax}
          setShowDetails={setShowDetails}
          isShowDetails={isShowDetails}
          incomeTax={incomeTax}

        />
        <p className='border-b-2'></p>

          <SummarySection 
          isChecked ={isChecked}
          epfY ={epfY}
          esiY ={esiY}
          tax ={tax}
          incomeTax = {incomeTax}
          isMonthly = {isMonthly}
          />

        <p className='border-b-2'></p>
        <p className='text-gray-600 font-semibold pl-2 pt-2 text-md'>Cost to Company Breakup</p>

        <div className='flex justify-between m-2'>
          <span className='text-gray-500'>Gross Salary
          </span>
          <span>{formatINR(grossSalary)}</span>
        </div>
        <div className={`flex justify-between m-2 ${isChecked ? 'visible' : 'hidden'}`}>
          <span className='text-gray-500'>Employer EPF Contribution
          </span>
          <span>{formatINR(-(Math.round(epf)))}</span>
        </div>
        <div className={`flex justify-between m-2 ${(esi === 0) ? 'hidden' : 'visible'}`}>
          <span className='text-gray-500'>Employer ESI Contribution
          </span>
          <span>{formatINR(Math.round((ctc) * 0.0325))}</span>
        </div>

      </div>
    </div>
  )
}