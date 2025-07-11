
import ExcelJS from 'exceljs';
import { saveAs } from "file-saver";
import { useMyContext } from '../context/MyContext';
import { calculateIncomeTax, salaryBreakdownAmount } from '../utils/taxUtils';
import { calculateProfessionalTax } from '../utils/salaryUtils';
import { totalSalary } from './salaryBreakdown/SalaryBreakdown';
import { formatINR } from '../utils/formatters';
import { FiDownload } from 'react-icons/fi';
import { tdf } from './salaryBreakdown/NetSalarySection';


export const DownloadExcel = () => {

  const { salaryBreakdown, ctc, epf, esi, isCheckedTax, isMonthly,grossSalary } = useMyContext();
  const values = salaryBreakdownAmount(salaryBreakdown, ctc);
  const incomeTax = calculateIncomeTax(grossSalary, isMonthly);
  const professionalTax = calculateProfessionalTax(grossSalary, isMonthly, isCheckedTax)
  const salary = totalSalary();

  const exportExcel = async () => {

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('CTC-breakdown');
    sheet.mergeCells('A1:B1');

    const title = sheet.getCell('A1');
    title.value = 'CTC Calculator - Salary Breakdown';
    title.font = {
      size: 15, bold: true,
      color: { argb: 'FF008000' }
    }

    title.alignment = {
      horizontal: 'center',
      vertical: 'middle',
    };

    sheet.addRow([]);
    const totalCtcRow = sheet.addRow(['TotalCTC', formatINR(ctc)]);
    totalCtcRow.getCell(1).font = { bold: true };
    totalCtcRow.getCell(2).font = {
      color: { argb: 'FF0000FF' },
    };

    sheet.addRow([]);

    sheet.mergeCells('A5:B5');
    const earningsTitle = sheet.getCell('A5');
    earningsTitle.font = { bold: true, };
    earningsTitle.value = 'EARNINGS';
    


    const earnings = [
      ['Basic Salary', formatINR(values.basicSalary)],
      ['HRA', formatINR(values.hra)],
      ['DA', formatINR(values.da)],
      ['LTA', formatINR(values.lta)],
      ['Special Allowance', formatINR(values.specialAllowance)],
      ['Performance Bonus', formatINR(values.performanceBonus)],
      ['Gross Salary', formatINR(grossSalary)],
    ]

    earnings.forEach((row) => sheet.addRow(row));

    sheet.addRow([]);
    sheet.mergeCells('A14:B14');

    sheet.getCell('A14').font = { bold: true, };
    sheet.getCell('A14').value = 'DEDUCTIONS';



    const deductions = [
      ['EPF', formatINR(-epf)],
      ['Professional Tax', formatINR(isMonthly ? -professionalTax.monthly : -professionalTax.yearly)],
      ['ESI', formatINR(-esi)],
    ]

    deductions.forEach((row) => sheet.addRow(row));

    sheet.addRow([]);
    sheet.mergeCells('A19:B19');

    sheet.getCell('A19').font = { bold: true, };
    sheet.getCell('A19').value = 'INCOME TAX BREAKDOWN';


    sheet.addRow(['Total Income', formatINR(-incomeTax.finalTax)]);


    sheet.addRow([]);
    sheet.mergeCells('A22:B22');
    const summaryTitle = sheet.getCell('A22');
    summaryTitle.font = { bold: true, };
    summaryTitle.value = 'EARNINGS';


    sheet.addRow(['Total Deduction', formatINR(isMonthly?tdf()/12:tdf())]);
    sheet.addRow([isMonthly ? 'Net Monthly Salary' : 'Net Yearly Salary', formatINR(isMonthly ? salary.netMonthly : salary.netAnnual)]);

    sheet.eachRow(row => {
      row.eachCell(cell => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
    });

    sheet.columns = [
      { width: 40 },
      { width: 40 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    saveAs(blob, 'CTC_Breakdown.xlsx');
  }
  return (
    <button onClick={exportExcel} className="flex gap-2 px-4 py-2 bg-[#047857] text-white rounded">
      < FiDownload className="translate-y-[30%]" />  Download Excel
    </button>
  )
}