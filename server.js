import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'web-interface')));

// Forecast data as seen in the PDF
app.get('/api/forecast', (req, res) => {
  res.json({
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
    },
    loanLetter: `Date: July 14, 2026

To:
SME Lending Division
DBS Bank Ltd
Singapore

SUBJECT: Request for Short-Term Working Capital Micro-Loan – [Company Name]

Dear Relationship Manager,

I am writing on behalf of [Company Name] to formally request a short-term working capital micro-loan in the amount of $3,000.00. This facility will act as a temporary liquidity bridge to resolve a brief cash flow timing mismatch identified by our financial forecasting system.

Context & Financial Analysis
Based on our latest ledger analysis dated July 14, 2026, our business maintains a consistent and healthy operational rhythm. We generate steady daily sales inflows averaging $242.45 against highly predictable daily overheads of $85.80, yielding a net positive daily operating cash flow of approximately $156.65.

However, our core engine has detected a temporary cash crunch starting on July 17, 2026 (T+3). On this date, our balance is projected to dip below zero, resulting in an estimated shortfall of $1,723.85.

Cause of the Cash Flow Gap
This shortfall is strictly a timing mismatch rather than an operational deficit. It is driven by the concentration of two major scheduled obligations occurring in close succession:
• Bi-weekly Payroll: A scheduled outflow of $2,500.00 on July 17, 2026 (T+3).
• Weekly Supplier Payments: A scheduled outflow of $1,200.00 on July 20, 2026 (T+6).

While our daily sales continue to perform strongly, the immediate accumulation of these periodic expenses temporarily outpaces our liquid reserves.

Loan Details & Repayment Strategy
To address this gap and maintain a secure liquidity buffer, we are requesting a micro-loan of $3,000.00.

• Purpose: To cover the $1,723.85 payroll-driven deficit on July 17 and absorb the subsequent supplier payments on July 20, ensuring our account balance remains robustly positive.
• Repayment: Given our consistent daily sales inflows ($242.45/day) and predictable cost structure, our cash position will rapidly recover. We propose a short-term repayment schedule structured over the next [30/60/90] days, or we are open to utilizing this as a drawdown from a revolving Line of Credit.

Our historical transaction data, ledger balance sheets, and full cash flow forecast reports are available immediately for your underwriting team's review. We have enjoyed a strong relationship with DBS Bank and appreciate your prompt support in helping us maintain seamless operations.

Thank you for your time and consideration. I look forward to your favorable response.

Sincerely,

_______________________________
[Authorized Representative Signature]

[Authorized Representative Name]
[Title, e.g., Managing Director / Treasurer]
[Company Name]
[Contact Information: Phone Number & Email Address]`
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
