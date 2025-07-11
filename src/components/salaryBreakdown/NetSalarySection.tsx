
import { useMyContext } from '../../context/MyContext';
import { formatINR } from '../../utils/formatters';
import { totalDeduction } from '../../utils/taxUtils';

export type NetSalaryType = {
  incomeTax: {
    finalTax: number;
    yearlyIncomeTax: number;
  };

  epfY: number;
  esiY: number;
  tax: number;
}
let td = 0;
export function tdf() {
  return td;
}
export const NetSalarySection = ({ incomeTax,
  epfY,
  esiY,
  tax
}: NetSalaryType) => {
  const {
    isMonthly,
    isChecked,
    grossSalary
  } = useMyContext();

  td = (-totalDeduction(isChecked ? -epfY : 0, -esiY, tax * 12, incomeTax.yearlyIncomeTax));

  console.log('tdtdtdtdtdtd', td)
  console.log('tdtdtdtdtdtd', grossSalary * 12 - td
  )

  console.log('grossSalary', grossSalary, td)

  return (
    <div className='bg-white p-4 lg:m-2 rounded-xl'>
      <div className='flex flex-wrap justify-between gap-2 overflow-auto'>
        <span className='text-xl font-semibold'>{isMonthly ? 'Net Annual Equivalent ' : 'Net Monthly Salary '}</span>
        <span className='text-[rgb(22,163,74)] font-bold text-2xl '>

          {formatINR(isMonthly
            ? (grossSalary * 12) - (
              td)
            : (grossSalary / 12) - (
              td / 12))}
        </span>

      </div>
      <p className='border-b-2 mt-2 mb-2'></p>

      <div className='flex flex-wrap justify-between overflow-auto'>
        <span className='text-xl font-semibold'>{!isMonthly ? 'Net Annual Equivalent' : 'Net Monthly Salary '}</span>
        <span className='text-[rgb(22,163,74)] font-bold text-2xl '>
          {formatINR(!isMonthly ? (grossSalary) -
            (td)
            : (grossSalary - td / 12
            ))}
        </span>
      </div>

    </div>
  )
}

