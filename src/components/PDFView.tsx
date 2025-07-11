
import { PDFViewer } from '@react-pdf/renderer'
import { calculateIncomeTax, salaryBreakdownAmount, totalDeduction } from '../utils/taxUtils';
import { useMyContext } from '../context/MyContext';
import { calculateProfessionalTax } from '../utils/salaryUtils';
import { totalSalary } from './salaryBreakdown/SalaryBreakdown';
import { SalarySlipPdf } from './SalarySlipPdf';



const PDFView = () => {
   const {salaryBreakdown, ctc,epf,esi,isCheckedTax,isMonthly} = useMyContext();
    const values = salaryBreakdownAmount(salaryBreakdown, ctc);
     const incomeTax = calculateIncomeTax(ctc, isMonthly);
     const professionalTax = calculateProfessionalTax(ctc,isMonthly,isCheckedTax)
  const salary = totalSalary();
   
    const data = {
      totalCtc:  ctc,
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
        { label: 'Professional Tax', amount:  isMonthly?-professionalTax.monthly:-professionalTax.yearly },
        { label: 'ESI', amount: -esi },
        { label: 'Income Tax', amount: -incomeTax.finalTax },
        { label: 'Base Tax', amount: -incomeTax.tax },
        { label: 'Surcharge', amount: 0 },
        { label: 'Health & Education Cess', amount: -incomeTax.cess },
      ],
      summary: [
        { label: 'Total Deductions', amount:  -totalDeduction(epf,esi, isMonthly?professionalTax.monthly:professionalTax.yearly,incomeTax.finalTax) },
        { label: isMonthly?'Net Monthly Salary':'Net Yearly Salary', amount: isMonthly?salary.netMonthly:salary.netAnnual},
      ],
    };

  return (
    <>
    <div>PDFView</div>
    <PDFViewer height={500}><SalarySlipPdf {...data} isMonthly = {isMonthly} /></PDFViewer> 
    </>
  )
}

export default PDFView