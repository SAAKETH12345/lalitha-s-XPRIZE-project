import { GoogleGenAI } from '@google/genai';

export const handler = async (event, context) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "GEMINI_API_KEY environment variable is not set in Netlify." })
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const forecastData = {
    analysisDate: '2026-07-14',
    currentBalance: 456.20,
    patterns: [
      { name: '[Daily] Sales', desc: 'Avg Inflow: $242.45/day' },
      { name: '[Daily] Overhead', desc: 'Avg Outflow: $85.80/day' },
      { name: '[Weekly] Suppliers', desc: 'Avg Outflow: $1,200.00 (Every 7 days)' },
      { name: '[Weekly] Utilities', desc: 'Avg Outflow: $150.00 (Every 7 days)' },
      { name: '[Bi-weekly] Payroll', desc: 'Avg Outflow: $2,500.00 (Every 14 days)' }
    ],
    projection: [
      { day: 'T+1', date: '2026-07-15', start: 456.20, in: 242.45, out: 235.80, end: 462.85, events: 'Utilities' },
      { day: 'T+2', date: '2026-07-16', start: 462.85, in: 242.45, out: 85.80, end: 619.50, events: 'None' },
      { day: 'T+3', date: '2026-07-17', start: 619.50, in: 242.45, out: 2585.80, end: -1723.85, events: 'Payroll' },
      { day: 'T+4', date: '2026-07-18', start: -1723.85, in: 242.45, out: 85.80, end: -1567.19, events: 'None' },
      { day: 'T+5', date: '2026-07-19', start: -1567.19, in: 242.45, out: 85.80, end: -1410.54, events: 'None' },
      { day: 'T+6', date: '2026-07-20', start: -1410.54, in: 242.45, out: 1285.80, end: -2453.89, events: 'Suppliers' },
      { day: 'T+7', date: '2026-07-21', start: -2453.89, in: 242.45, out: 85.80, end: -2297.24, events: 'None' }
    ],
    warning: {
      date: '2026-07-17',
      shortfall: 1723.85
    }
  };

  try {
    const prompt = `
You are an expert Virtual Treasurer AI. Based on the following financial forecast, write a highly professional, math-backed short-term working capital micro-loan request letter to a bank (DBS Bank Ltd).

Our company name is [Company Name]. We need a $3,000.00 micro-loan to bridge a cash flow timing mismatch.

Financial context:
- Analysis Date: July 14, 2026
- Daily sales average: $242.45
- Daily overhead average: $85.80
- Net positive daily operating cash flow: ~$156.65
- Cash crunch start date: July 17, 2026
- Reason for crunch: Concentration of two scheduled obligations in close succession: Bi-weekly Payroll ($2,500.00 on July 17) and Weekly Supplier Payments ($1,200.00 on July 20).
- Estimated shortfall: $1,723.85

The letter should be structured with clear headings like "Context & Financial Analysis", "Cause of the Cash Flow Gap", and "Loan Details & Repayment Strategy". Keep it objective, precise, and professional. Only return the text of the letter.
`;
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    forecastData.loanLetter = response.text;
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(forecastData)
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: "Failed to generate loan letter" })
    };
  }
};
