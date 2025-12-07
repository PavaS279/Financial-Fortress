# Financial Fortress Features

This document outlines the key features of the Financial Fortress application.

## Core Features

### 1. Dashboard
- **Overview:** Provides a central hub for users to get a quick snapshot of their financial safety.
- **Key Metrics:** Displays an overall risk score, the number of live alerts, checks performed, and policies decoded.
- **Recent Activity:** A chart visualizing financial check activity over the past six months, broken down by platform (Desktop vs. Mobile).
- **Quick Actions:** Provides direct links to the main analysis tools: UPI Scam Detector, Loan Analyzer, and Insurance Decoder.
- **Live Transaction Monitoring:** A dashboard widget showing real-time transaction alerts and a list of recent transactions for quick review.
- **Smart Recommendations:** AI-powered insights based on user activity, highlighting potential risks and savings opportunities.

### 2. UPI Scam Detector
- **AI-Powered Analysis:** Utilizes a Genkit AI flow to analyze UPI transaction details for signs of fraudulent activity.
- **Detailed Input Form:** Users can enter transaction amount, recipient details, description, and an optional reference code.
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
- **Detailed Input Form:** Users can upload documents, paste text, select insurance type, provide key details, and ask specific questions.
- **Clear Summary:** The AI generates a user-friendly summary that highlights:
    - A high-level **Policy Overview** (status, coverage, premium).
    - Clear explanations of **What is Covered** and **What is NOT Covered**.
    - A step-by-step **Claim Process** guide.
    - An analysis of potential **Coverage Gaps**.
    - A glossary of **Terms Explained** in simple language.

### 5. My Checks
- **Analysis History:** Provides a rich, tabular view of all past financial checks performed by the user.
- **Filtering and Sorting:** Users can search, filter by check type, and sort by date or risk level.
- **Analytics Dashboard:** Visual cards and charts showing total checks, average risk, scams blocked, and check activity over time.
- **Quick Actions:** Sidebar with options to export, share, archive, or delete analyses.
- **Starred Items:** Ability to star/bookmark important analyses for quick access.

### 6. Community Hub
- **Live Scam Feed:** A central feed where users can see anonymized scam reports submitted by the community, with voting and comment counts.
- **Report a Scam:** A form for users to anonymously submit details of new scams they encounter.
- **Top Contributors:** A leaderboard to recognize active community members.
- **Official Alerts:** A section displaying recent security alerts from official sources like RBI and CERT-In.
- **Safety Tip of the Day:** A card highlighting a useful financial safety tip.

### 7. Settings
- **User Profile:** Manage name, email, phone number, and age group.
- **Alert Settings:** Configure preferences for email and SMS/WhatsApp notifications and their frequency.
- **Language & Preferences:** Toggle between light/dark mode, select language, and adjust font size.
- **Analysis Defaults:** Set default preferences for the analysis tools, such as auto-analysis on paste.
- **Privacy Controls:** Manage data retention, export personal data, or delete the account.
- **Connected Accounts:** A section to manage connected financial accounts (marked as "coming soon").
- **Help & Support:** An accordion with sections for FAQs, Contact, and Feedback.

## User Interface & Experience
- **Collapsible Sidebar Navigation:** A modern, responsive sidebar that is fully expanded on desktop and collapses to an icon-only rail or a mobile-friendly sheet that closes on item selection.
- **Consistent UI Components:** Built with ShadCN UI, ensuring a consistent and professional look and feel across the application.
- **Toasts & Notifications:** Provides user feedback for actions like errors during AI analysis.
- **Loading Skeletons:** Animated placeholders give users feedback while data is being fetched or processed.
- **Data Visualization:** Use of charts and graphs to present complex data in an understandable format.