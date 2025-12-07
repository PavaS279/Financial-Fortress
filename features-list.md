# Financial Fortress Features

This document outlines the key features of the Financial Fortress application.

## Core Features

### 1. Dashboard
- **Overview:** Provides a central hub for users to get a quick snapshot of their financial safety.
- **Key Metrics:** Displays an overall risk score, the number of active alerts for high-risk items, and a count of checks performed and policies decoded.
- **Recent Activity:** A chart visualizing financial check activity over the past six months, broken down by platform (Desktop vs. Mobile).
- **Quick Actions:** Provides direct links to the main analysis tools: UPI Scam Detector, Loan Analyzer, and Insurance Decoder.

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
- **Loan Offer Evaluation:** A simple, client-side tool to analyze the financial implications of a loan.
- **Input Fields:** Users can input the loan amount, interest rate, and term in years.
- **Instant Analysis:** Calculates and displays:
    - Monthly Payment.
    - Total Interest to be paid over the loan's lifetime.
    - Total amount to be paid (Principal + Interest).
    - A **Risk Level** assessment (Low, Medium, High) based on the interest rate.
- **Visual Breakdown:** A bar chart visually compares the principal amount to the total interest paid.

### 4. Insurance Policy Decoder
- **AI-Powered Summarization:** Uses a Genkit AI flow to simplify complex insurance policy text.
- **Simple Input:** Users paste their full insurance policy text into a textarea.
- **Clear Summary:** The AI generates a user-friendly summary that highlights key terms, benefits, and, most importantly, exclusions, in plain language.

### 5. My Checks
- **Analysis History:** Provides a tabular view of all past financial checks performed by the user.
- **At-a-Glance Info:** The table shows the Check ID, type of analysis (e.g., UPI Scam, Loan Analysis), date, and the resulting risk level.

### 6. Settings
- **Theme Customization:** A toggle to switch between light and dark modes for the application.
- **Notification Preferences:** UI to manage email and push notification settings.
- **Account Management:** A section to manage connected financial accounts.

## User Interface & Experience
- **Collapsible Sidebar Navigation:** A modern, responsive sidebar that is fully expanded on desktop and collapses to an icon-only rail or a mobile-friendly sheet.
- **Consistent UI Components:** Built with ShadCN UI, ensuring a consistent and professional look and feel across the application.
- **Toasts & Notifications:** Provides user feedback for actions like errors during AI analysis.
- **Loading Skeletons:** Animated placeholders give users feedback while data is being fetched or processed.
