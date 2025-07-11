// export function formatINR(amount: number | string): string {
//   const amt = typeof amount === 'string' ? parseFloat(amount) : amount;
//   return amt.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
// }
export function formatINR(amount: number | string): string {
  const amt = typeof amount === 'string' ? parseFloat(amount) : amount;
  return amt.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  });
}

export function formatINROnlyCommas(amount: number | string): string{
  const amt = Math.round(typeof amount === 'string'? parseFloat(amount) : amount);
  
  return amt.toLocaleString('en-IN', {
    maximumFractionDigits: 0
  })
}