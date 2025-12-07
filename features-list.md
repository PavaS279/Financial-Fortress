# Financial Fortress Features

This document outlines the key features of the Financial Fortress application.

## Core Features

### 1. Dashboard
- **Overview:** Provides a central hub for users to get a quick snapshot of their financial safety.
- **Key Metrics:** Displays an overall risk score, the number of active alerts for high-risk items, and a count of checks performed and policies decoded.
- **Recent Activity:** A chart visualizing financial check activity over the past six months, broken down by platform (Desktop vs. Mobile).
- **Quick Actions:** Provides direct links to the main analysis tools: UPI Scam Detector, Loan Analyzer, and Insurance Decoder.
- **Live Transaction Monitoring:** A dashboard widget showing real-time transaction alerts and a list of recent transactions for quick review.
- **Smart Recommendations:** AI-powered insights based on user activity, highlighting potential risks and savings opportunities.

### 2. UPI Scam Detector
- **AI-Powered Analysis:** Utilizes a Genkit AI flow to analyze UPI transaction details for signs of fraudulent activity.
- **Detailed Input Form:** Users can enter transaction amount, recipient details (name/ID and type), description, and any reference codes.
- **Comprehensive Results:** The analysis returns:
    - A **Risk Score** from 1-10, with a color-coded progress bar.
    - A clear **Risk Level** badge (Low, Medium, High).
    - A **Detailed Breakdown** of the analysis, including red flags, recipient analysis, and contextual analysis (amount, patterns).
    - A list of **Recommended Actions** for the user to take.
    - Matches to a database of **Similar Scams**.
- **Actionable Buttons:** Allows users to block the recipient, report to the bank, share the report, or export it.

### 3. Loan Analyzer
- **Loan Offer Evaluation:** An AI-powered tool to analyze loan agreements from PDFs or pasted text.
- **Input Fields:** Users can input the loan amount, interest rate, tenure, and upload the agreement document.
- **Instant Analysis:** The AI calculates and displays:
    - An **Executive Summary** with total cost, EMI, and best/worst-case scenarios.
    - A detailed breakdown of **Hidden Charges**.
    - A list of **Red Flags** found in the agreement.
    - **Market Comparison** and negotiation recommendations.
    - Specific **Questions to Ask** the lender and a checklist of **Action Items**.

### 4. Insurance Policy Decoder
- **AI-Powered Summarization:** Uses a Genkit AI flow to simplify complex insurance policy text from a document or pasted text.
- **Simple Input:** Users can select the insurance type, provide key details, and ask specific questions.
- **Clear Summary:** The AI generates a user-friendly summary that highlights:
    - A high-level **Policy Overview**.
    - Clear explanations of **What is Covered** and **What is NOT Covered**.
    - A step-by-step **Claim Process** guide.
    - An analysis of potential **Coverage Gaps**.
    - A glossary of **Terms Explained** in simple language.

### 5. My Checks
- **Analysis History:** Provides a rich, tabular view of all past financial checks performed by the user.
- **Filtering and Sorting:** Users can search, filter by check type, and sort by date or risk level.
- **At-a-Glance Info:** The table shows the Check ID, type of analysis, date, and the resulting risk level, with an option to star important checks.
- **Analytics Dashboard:** Visual cards and charts showing total checks, average risk, scams blocked, and check activity over time.
- **Quick Actions:** Sidebar with options to export, share, archive, or delete analyses.

### 6. Community Hub
- **Live Scam Feed:** A central feed where users can see anonymized scam reports submitted by the community.
- **Report a Scam:** A form for users to anonymously submit details of new scams they encounter.
- **Top Contributors:** A leaderboard to recognize active community members.
- **Official Alerts:** A section displaying recent security alerts from official sources like RBI and CERT-In.

### 7. Settings
- **User Profile:** Manage name, email, and other personal details.
- **Alert Settings:** Configure preferences for email and SMS/WhatsApp notifications.
- **Language & Preferences:** Toggle between light/dark mode and other UI customizations.
- **Analysis Defaults:** Set default preferences for the analysis tools.
- **Privacy Controls:** Manage data retention, export personal data, or delete the account.
- **Connected Accounts:** (Coming Soon) A section to manage connected financial accounts.

## User Interface & Experience
- **Collapsible Sidebar Navigation:** A modern, responsive sidebar that is fully expanded on desktop and collapses to an icon-only rail or a mobile-friendly sheet.
- **Consistent UI Components:** Built with ShadCN UI, ensuring a consistent and professional look and feel across the application.
- **Toasts & Notifications:** Provides user feedback for actions like errors during AI analysis.
- **Loading Skeletons:** Animated placeholders give users feedback while data is being fetched or processed.
- **Data Visualization:** Use of charts and graphs to present complex data in an understandable format.
