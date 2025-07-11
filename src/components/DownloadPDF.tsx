
import { PDFDownloadLink } from '@react-pdf/renderer';
import { SalarySlipPdf } from './SalarySlipPdf';
import { useMyContext } from '../context/MyContext';
import { calculateIncomeTax, salaryBreakdownAmount } from '../utils/taxUtils';
import { calculateProfessionalTax } from '../utils/salaryUtils';
import { totalSalary } from './salaryBreakdown/SalaryBreakdown';

import { tdf } from './salaryBreakdown/NetSalarySection';


export const DownloadPDFButton = () => {
  const {salaryBreakdown, ctc,epf,esi,isCheckedTax,isMonthly,grossSalary} = useMyContext();
  const values = salaryBreakdownAmount(salaryBreakdown, ctc);
   const incomeTax = calculateIncomeTax(grossSalary, isMonthly);
   const professionalTax = calculateProfessionalTax(grossSalary,isMonthly,isCheckedTax)
const salary = totalSalary();
 
  const data = {
    totalCtc: ctc,
    earnings: [
      { label: 'Basic Salary', amount: values.basicSalary },
      { label: 'HRA', amount: values.hra },
      { label: 'DA', amount: values.da },
      { label: 'LTA', amount: values.lta },
      { label: 'Special Allowance', amount: values.specialAllowance },
      { label: 'Performance Bonus', amount: values.performanceBonus },
      { label: 'Gross Salary', amount: Math.round(ctc) },
    ],
    deductions: [
      { label: 'EPF', amount: -epf },
      { label: 'Professional Tax', amount:  -(isMonthly?professionalTax.monthly:professionalTax.yearly) },
      { label: 'ESI', amount: -esi },
      { label: 'Income Tax', amount: -incomeTax.finalTax },
      { label: 'Base Tax', amount: -incomeTax.tax },
      { label: 'Surcharge', amount: 0 },
      { label: 'Health & Education Cess', amount: -incomeTax.cess },
    ],
    summary: [
      { label: 'Total Deductions', amount: (isMonthly?tdf()/12:tdf()) },
      { label: isMonthly?'Net Monthly Salary':'Net Yearly Salary', amount: isMonthly?salary.netMonthly:salary.netAnnual},
    ],
    
  };
  // -totalDeduction(epf,esi, isMonthly?professionalTax.monthly:professionalTax.yearly,incomeTax.finalTax)
console.log(data);
  return (
    <PDFDownloadLink
      document={<SalarySlipPdf {...data} isMonthly = {isMonthly} />}
      fileName="CTC-breakdown.pdf"
    >
      {({ loading }) => (loading ? 'Preparing PDF...' :  'Download PDF')}
    </PDFDownloadLink>
  );
};
