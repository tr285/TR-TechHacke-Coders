/**
 * Formats a number as Indian currency (INR)
 * @param amount - The amount to format
 * @returns Formatted string with ₹ symbol and Indian number format
 */
export function formatIndianCurrency(amount: number): string {
  // Convert to Indian format (e.g., ₹10,00,000)
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formatter.format(amount)
}

/**
 * Converts USD to INR
 * @param usdAmount - Amount in USD
 * @param exchangeRate - Exchange rate (default: 83)
 * @returns Amount in INR
 */
export function convertUSDtoINR(usdAmount: number, exchangeRate = 83): number {
  return Math.round(usdAmount * exchangeRate)
}

/**
 * Gets the top cities in India for a given sector
 * @param sector - Industry sector
 * @returns Array of top cities
 */
export function getTopIndianCities(sector: string): string[] {
  const cityMap: Record<string, string[]> = {
    technology: ["Bangalore", "Hyderabad", "Pune", "Delhi NCR", "Chennai"],
    healthcare: ["Delhi", "Mumbai", "Chennai", "Bangalore", "Kolkata"],
    finance: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"],
    education: ["Delhi", "Mumbai", "Bangalore", "Chennai", "Kolkata"],
    default: ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune"],
  }

  return cityMap[sector] || cityMap.default
}

/**
 * Gets the top employers in India for a given sector
 * @param sector - Industry sector
 * @returns Array of top employers
 */
export function getTopIndianEmployers(sector: string): string[] {
  const employerMap: Record<string, string[]> = {
    technology: ["TCS", "Infosys", "Wipro", "HCL", "Tech Mahindra"],
    healthcare: ["Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals", "AIIMS"],
    finance: ["HDFC Bank", "ICICI Bank", "SBI", "Axis Bank", "Kotak Mahindra Bank"],
    education: ["CBSE Schools", "ICSE Schools", "State Universities", "IITs", "IIMs"],
    default: ["TCS", "Infosys", "Wipro", "HCL", "Reliance"],
  }

  return employerMap[sector] || employerMap.default
}
