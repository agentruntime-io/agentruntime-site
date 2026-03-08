# AGENTRUNTIME SERVICE LEVEL AGREEMENT

**Effective Date:** March 1, 2026
**Last Updated:** March 1, 2026

This Service Level Agreement ("**SLA**") sets forth AgentRuntime's commitments regarding the availability of the AgentRuntime platform and services (the "**Services**"), and describes the remedies available to eligible customers in the event those commitments are not met.

This SLA is incorporated by reference into AgentRuntime's Terms of Service (the "**Agreement**") and applies to customers on eligible paid subscription plans as specified herein or in the applicable Order Form. This SLA does not apply to customers on free tier or trial plans unless expressly agreed in writing.

Capitalized terms used but not defined in this SLA have the meanings given to them in the Agreement.

---

## 1. SERVICE AVAILABILITY COMMITMENT

**1.1 Uptime Target.** AgentRuntime will use commercially reasonable efforts to ensure that the Services are available to customers with a monthly uptime percentage of at least:

**99.9% per calendar month** ("**Uptime Commitment**")

**1.2 Calculation Methodology.** Monthly Uptime Percentage is calculated as follows:

> **Monthly Uptime % = ((Total Minutes in Month − Downtime Minutes) / Total Minutes in Month) × 100**

Where:

- **"Total Minutes in Month"** means the total number of minutes in the applicable calendar month.
- **"Downtime"** means the total accumulated minutes during the calendar month in which the Services are unavailable due to a qualifying outage, excluding any Excluded Downtime as defined in Section 4.

**1.3 Measurement.** Availability is measured from AgentRuntime's internal monitoring infrastructure. AgentRuntime's measurements shall be authoritative for purposes of this SLA, absent manifest error.

---

## 2. SCHEDULED MAINTENANCE

**2.1 Maintenance Windows.** AgentRuntime may perform scheduled maintenance activities that temporarily affect the availability or performance of the Services. Where commercially practicable, AgentRuntime will:

&nbsp;&nbsp;&nbsp;&nbsp;(a) publish a maintenance schedule with at least forty-eight (48) hours' advance notice for planned maintenance windows;

&nbsp;&nbsp;&nbsp;&nbsp;(b) schedule non-emergency maintenance during low-traffic periods; and

&nbsp;&nbsp;&nbsp;&nbsp;(c) provide updates through the AgentRuntime status page at **status.agentruntime.io** or by email notification to the billing contact.

**2.2 Emergency Maintenance.** In cases where emergency maintenance is required to protect platform security, integrity, or availability, AgentRuntime may perform such maintenance without advance notice. AgentRuntime will provide notice as soon as practicable after initiating emergency maintenance.

**2.3 Exclusion from Downtime.** Downtime occurring during scheduled maintenance windows that have been communicated in advance shall not be counted as Downtime for purposes of calculating Monthly Uptime Percentage.

---

## 3. SERVICE CREDITS

**3.1 Eligibility.** Customers who experience a Monthly Uptime Percentage below the Uptime Commitment in a given calendar month may be eligible to request a Service Credit, subject to the following conditions:

&nbsp;&nbsp;&nbsp;&nbsp;(a) the customer is on an active, paid subscription plan at the time of the outage;

&nbsp;&nbsp;&nbsp;&nbsp;(b) the customer submits a valid credit request in accordance with Section 3.4; and

&nbsp;&nbsp;&nbsp;&nbsp;(c) the downtime is not attributable to Excluded Downtime under Section 4.

**3.2 Credit Schedule.** Eligible customers may receive Service Credits as follows:

| Monthly Uptime Percentage | Service Credit (as % of Monthly Fees) |
|--------------------------|----------------------------------------|
| 99.0% – < 99.9%          | 10%                                    |
| 95.0% – < 99.0%          | 25%                                    |
| < 95.0%                  | 50%                                    |

**3.3 Nature of Credits.** Service Credits are issued as credits against future invoices for the Services. Service Credits: (a) have no cash value; (b) are non-transferable; (c) are not redeemable for cash; and (d) expire upon termination or expiry of the Agreement.

**3.4 Credit Request Procedure.** To request a Service Credit, the customer must submit a written request to **billing@agentruntime.io** within thirty (30) days following the end of the calendar month in which the qualifying downtime occurred. The request must include: (a) the date(s) and duration of the claimed downtime; (b) a description of the impact experienced; and (c) any supporting technical information.

**3.5 Verification.** AgentRuntime will review credit requests in good faith using its internal monitoring records and will notify the customer of its determination within a commercially reasonable timeframe.

**3.6 Sole Remedy.** SERVICE CREDITS CONSTITUTE CUSTOMER'S SOLE AND EXCLUSIVE REMEDY FOR ANY FAILURE BY AGENTRUNTIME TO MEET THE UPTIME COMMITMENT, AND AGENTRUNTIME'S SOLE AND EXCLUSIVE LIABILITY WITH RESPECT THERETO.

---

## 4. SLA EXCLUSIONS

**4.1 Excluded Downtime.** For purposes of this SLA, "**Excluded Downtime**" means any period of unavailability that is caused by or attributable to:

**(a) Scheduled Maintenance.** Planned maintenance communicated in accordance with Section 2.1.

**(b) Customer Actions.** Downtime resulting from actions or omissions by the customer or its Authorized Users, including misconfigured workflows, incorrect API usage, unauthorized modifications, or consumption of excessive platform resources.

**(c) Third-Party Services.** Failures, outages, or degraded performance of Third-Party Services, external APIs, or other components not operated or controlled by AgentRuntime.

**(d) Internet Infrastructure.** Failures of public internet infrastructure, DNS providers, or telecommunications networks beyond AgentRuntime's reasonable control.

**(e) Force Majeure.** Events beyond AgentRuntime's reasonable control, including natural disasters, governmental actions, war, civil unrest, pandemic, cyberattacks originating from external threat actors, or other force majeure events as described in the Agreement.

**(f) Abuse or Misuse.** Downtime caused by abuse, unauthorized access, denial-of-service attacks, or other malicious activity targeting the customer's account or the platform generally, provided that AgentRuntime has implemented reasonable protective measures.

**(g) Free or Trial Services.** Any period of downtime affecting accounts on free tier, trial, or non-paid plans.

---

## 5. INCIDENT COMMUNICATION

**5.1 Status Page.** AgentRuntime maintains a real-time status page at **status.agentruntime.io** providing information about known incidents, planned maintenance, and historical uptime data.

**5.2 Incident Notifications.** For significant incidents affecting broad availability of the Services, AgentRuntime will post updates to the status page and, where appropriate, notify affected customers by email. Incident notifications will include, to the extent known: a description of the issue, the affected services, estimated time to resolution, and remediation actions taken.

---

## 6. SUPPORT

**6.1 Support Tiers.** AgentRuntime may offer support services at various tiers, as described on the AgentRuntime website or in an applicable Order Form. Support response times and service levels may vary based on your subscription plan.

**6.2 Support Channels.** Details regarding support access, including ticketing systems, email support, and enterprise support escalation paths, are described in the platform documentation.

---

## 7. MODIFICATIONS TO THIS SLA

AgentRuntime reserves the right to modify this SLA with reasonable prior notice to customers. Material changes to the Uptime Commitment or credit structure will take effect at the start of the next billing period following notice. Your continued use of the Services after the effective date of any modification constitutes acceptance of the revised SLA.

---

## 8. CONTACT

For questions regarding this SLA or to submit a credit request:

**AgentRuntime Labs Ltd**
Email: [support@agentruntime.io](mailto:support@agentruntime.io)
Billing Credits: [billing@agentruntime.io](mailto:billing@agentruntime.io)
Status Page: [status.agentruntime.io](https://status.agentruntime.io)

---

*© 2026 AgentRuntime Labs Ltd. All rights reserved.*
