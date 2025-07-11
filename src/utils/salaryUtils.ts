export function calculateESI(ctc: number, isMonthly: boolean) {
  const monthlySalary = isMonthly ? ctc : ctc / 12;

  if (monthlySalary > 42000) {
    return { monthly: 0, yearly: 0 };
  }

  const monthly = monthlySalary * 0.0175;
  const yearly = monthly * 12;

  return { monthly, yearly };
}
export function calculateEPF(basicSalary: number, isMonthly: boolean) {
  const monthly = ((basicSalary / (isMonthly ? 1 : 12)) * 0.12);
  const yearly = isMonthly ? (((basicSalary * 12) * 0.12)) : (basicSalary * 0.12);
  return { monthly, yearly };
}

export function calculateStandardDeduction(isNew: boolean, isMonthly: boolean): number {
  if (isNew) return isMonthly ? -6250 : -75000;
  return isMonthly ? -4127 : -50000;
}

export function calculateProfessionalTax(ctc: number, isMonthly: boolean, isCheckedTax: boolean) {
  if (!isCheckedTax) return { monthly: 0, yearly: 0 };

  if (isMonthly) {
    if (ctc >= 21001 && ctc <= 30000) return { monthly: -100, yearly: -1200 };
    if (ctc > 30000) return { monthly: -200, yearly: 0 };
  } else {
    if (ctc >= 252013 && ctc <= 360000) return { monthly: -1200, yearly: -14400 };
    if (ctc > 360000) return { monthly: 0, yearly: -2400 };
  }

  return { monthly: 0, yearly: 0 };
}
