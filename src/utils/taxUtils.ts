import type { salaryBreakdown } from "../components/AddvancedSettings";


export function salaryBreakdownAmount(salaryBreakdown: salaryBreakdown, ctc: number) {
  return {
    basicSalary: calculateAmount(salaryBreakdown.basicSalary, ctc),
    hra: calculateAmount(salaryBreakdown.hra, ctc),
    da: calculateAmount(salaryBreakdown.da, ctc),
    lta: calculateAmount(salaryBreakdown.lta, ctc),
    specialAllowance: calculateAmount(salaryBreakdown.specialAllowance, ctc),
    performanceBonus: calculateAmount(salaryBreakdown.performanceBonus, ctc)

  }
  

}


export type Slab = {
  limit: number;
  rate: number;
};


function calculateAmount(value: number, ctc: number) {
  return(ctc * value / 100);
}

export function calculateIncomeTax(ctc: number, isMonthly: boolean) {
  const annualIncome = isMonthly ? ctc * 12 : ctc;
  const standardDeduction = 75000;
  const taxableIncome = Math.max(annualIncome - standardDeduction, 0);

  const slabs: Slab[] = [
    { limit: 400000, rate: 0 },
    { limit: 800000, rate: 0.05 },
    { limit: 1200000, rate: 0.10 },
    { limit: 1600000, rate: 0.15 },
    { limit: 2000000, rate: 0.20 },
    { limit: 2400000, rate: 0.25 },
    { limit: Infinity, rate: 0.30 }
  ];

  let tax = 0;
  let lastLimit = 0;
  let remainingIncome = taxableIncome;

  for (const slab of slabs) {
    const slabIncome = Math.min(remainingIncome, slab.limit - lastLimit);
    if (slabIncome > 0) {
      tax += (slabIncome * slab.rate);
      remainingIncome -= slabIncome;
      lastLimit = slab.limit;
    }
    if (remainingIncome <= 0) break;
  }

  if (taxableIncome <= 1200000) tax = 0;

  let marginalRelief = 0;
  if (taxableIncome > 1200000 && taxableIncome <= 1275000) {
    const excessIncome = taxableIncome - 1200000;
    marginalRelief = tax - excessIncome;
    if (tax > excessIncome) {
      tax = excessIncome;
    }
  }

  let cess = tax * 0.04;
  const totalTax = tax + cess;
  const yearlyIncomeTax = -totalTax;

  const finalTax = isMonthly ? (totalTax / 12) : (totalTax);
  const monthlyRelief = isMonthly ?(marginalRelief / 12) :(marginalRelief);
  const monthlyCess = isMonthly ? (cess / 12) : (cess);
  const monthlyTax = isMonthly ? (tax / 12) : (tax);
  const finalTaxValue = (monthlyRelief === 0) ? monthlyTax : monthlyTax + monthlyRelief;

  return {
    finalTax: -finalTax,
    cess: -monthlyCess,
    marginalRelief: monthlyRelief,
    tax: -finalTaxValue,
    yearlyIncomeTax,
  };
}

export function totalDeduction(epf: number, esi: number, tax: number, finalT: number) {
 console.log(esi , epf, tax, finalT)
  return (esi + epf + tax + finalT);
}
