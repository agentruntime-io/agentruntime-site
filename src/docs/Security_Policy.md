# AGENTRUNTIME SECURITY POLICY

**Effective Date:** March 1, 2026
**Last Updated:** March 1, 2026

This Security Policy ("**Policy**") describes the security practices, controls, and commitments that **AgentRuntime Labs Ltd** ("**AgentRuntime**," "**we**," "**us**," or "**our**") maintains to protect the integrity, confidentiality, and availability of the AgentRuntime platform and associated services (collectively, the "**Services**") and the data of our users and customers.

This Policy is provided for informational purposes and is incorporated by reference into AgentRuntime's Terms of Service and Data Processing Agreement. AgentRuntime may update its security practices at any time without prior notice, provided that any changes will not materially reduce the level of protection afforded to customer data during the term of an active subscription.

---

## 1. INFRASTRUCTURE SECURITY

**1.1 Cloud Environment.** AgentRuntime deploys its platform on enterprise-grade cloud infrastructure that adheres to industry-recognized security standards and certifications. Our infrastructure providers maintain their own security certifications and compliance programs, details of which are available upon request.

**1.2 Security Controls.** Our infrastructure security measures include:

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Network Segmentation.** Production environments are logically isolated from development and staging environments. Internal services are protected using network-level access controls limiting communication to authorized service endpoints.

&nbsp;&nbsp;&nbsp;&nbsp;(b) **Firewall and Perimeter Protection.** All inbound and outbound network traffic is governed by firewall rules configured to deny by default and permit only explicitly authorized traffic.

&nbsp;&nbsp;&nbsp;&nbsp;(c) **Infrastructure Monitoring.** Continuous monitoring of infrastructure components for availability, performance anomalies, and suspicious activity.

&nbsp;&nbsp;&nbsp;&nbsp;(d) **Automated Security Updates.** Operating systems and platform dependencies are subject to regular patching cycles. Critical security patches are applied on an expedited basis.

&nbsp;&nbsp;&nbsp;&nbsp;(e) **Layered Defense.** Critical platform components are protected through defense-in-depth controls, combining multiple independent security layers.

---

## 2. DATA ENCRYPTION

**2.1 Encryption in Transit.** All communications between users and the AgentRuntime platform are encrypted using industry-standard protocols, including:

&nbsp;&nbsp;&nbsp;&nbsp;(a) Transport Layer Security (TLS) version 1.2 or higher for all HTTPS communications;

&nbsp;&nbsp;&nbsp;&nbsp;(b) encrypted API endpoints for all programmatic access; and

&nbsp;&nbsp;&nbsp;&nbsp;(c) secure communication channels for all internal service-to-service communications where technically feasible.

**2.2 Encryption at Rest.** Where applicable and supported by the underlying infrastructure, data is stored using encrypted storage volumes or encrypted databases. Encryption key management follows industry best practices.

**2.3 Key Management.** Cryptographic keys are managed in accordance with recognized key management standards, with access restricted to authorized platform components and personnel.

---

## 3. ACCESS CONTROLS

**3.1 Role-Based Access.** Access to AgentRuntime's internal systems, production environments, and customer data is governed by a role-based access control (RBAC) framework implementing the principle of least privilege. Access rights are assigned based on job function and are reviewed periodically.

**3.2 Authentication.** Access to internal systems by AgentRuntime personnel requires strong authentication, including multi-factor authentication (MFA) for access to production systems and sensitive environments.

**3.3 Administrative Access.** Access to production environments is restricted to a limited number of authorized personnel with a documented business need. All administrative access is logged and subject to periodic review.

**3.4 Credential Management.** AgentRuntime maintains policies for secure credential creation, storage, rotation, and revocation. Shared credentials are prohibited for access to production systems.

**3.5 Third-Party Access.** Third-party service providers with access to AgentRuntime systems or customer data are required to comply with AgentRuntime's security requirements and are subject to appropriate contractual data protection obligations.

---

## 4. SECURITY MONITORING AND LOGGING

**4.1 Continuous Monitoring.** AgentRuntime operates continuous monitoring systems designed to detect threats and anomalies across the platform, including:

&nbsp;&nbsp;&nbsp;&nbsp;(a) unauthorized or anomalous access attempts;

&nbsp;&nbsp;&nbsp;&nbsp;(b) unusual patterns in system or API usage;

&nbsp;&nbsp;&nbsp;&nbsp;(c) infrastructure anomalies indicative of attack or misconfiguration;

&nbsp;&nbsp;&nbsp;&nbsp;(d) indicators of compromise or malicious activity; and

&nbsp;&nbsp;&nbsp;&nbsp;(e) system failures or availability degradation.

**4.2 Security Logging.** Security-relevant events are logged and stored in centralized logging systems with appropriate access controls. Logs are retained for a period sufficient to support security investigations and comply with applicable legal obligations.

**4.3 Alerting.** Automated alerting mechanisms are configured to notify the security team of high-priority events requiring investigation or immediate response.

---

## 5. VULNERABILITY MANAGEMENT

**5.1 Continuous Assessment.** AgentRuntime maintains an ongoing vulnerability management program, which includes:

&nbsp;&nbsp;&nbsp;&nbsp;(a) automated scanning of infrastructure, applications, and dependencies for known vulnerabilities;

&nbsp;&nbsp;&nbsp;&nbsp;(b) software composition analysis to identify vulnerable third-party dependencies;

&nbsp;&nbsp;&nbsp;&nbsp;(c) regular internal security reviews and code assessments; and

&nbsp;&nbsp;&nbsp;&nbsp;(d) periodic third-party penetration testing of critical platform components.

**5.2 Patch Management.** Identified vulnerabilities are prioritized by severity. Critical and high-severity vulnerabilities are remediated on an expedited schedule. Patch status is tracked and reported internally.

**5.3 Responsible Disclosure.** AgentRuntime encourages responsible disclosure of security vulnerabilities by external researchers in accordance with Section 7 of this Policy.

---

## 6. INCIDENT RESPONSE

**6.1 Incident Response Program.** AgentRuntime maintains a formal security incident response program that includes documented procedures for detecting, investigating, containing, eradicating, and recovering from security incidents.

**6.2 Incident Classification.** Security incidents are classified by severity to ensure appropriate prioritization and resource allocation. Incident classification takes into account the nature of the affected data, the scope of impact, and the potential consequences for users and third parties.

**6.3 Incident Response Phases.** Our incident response procedures encompass the following phases:

&nbsp;&nbsp;&nbsp;&nbsp;(a) **Detection and Identification.** Prompt identification of security events through monitoring, alerting, and internal or external reporting.

&nbsp;&nbsp;&nbsp;&nbsp;(b) **Containment.** Immediate measures to limit the scope and impact of a confirmed incident.

&nbsp;&nbsp;&nbsp;&nbsp;(c) **Investigation.** Forensic analysis to determine the root cause, affected systems, and extent of any data exposure.

&nbsp;&nbsp;&nbsp;&nbsp;(d) **Eradication and Recovery.** Removal of the threat, remediation of vulnerabilities, and restoration of affected systems to normal operation.

&nbsp;&nbsp;&nbsp;&nbsp;(e) **Post-Incident Review.** Documentation of lessons learned and implementation of improvements to prevent recurrence.

**6.4 Customer Notification.** AgentRuntime will notify affected customers of confirmed security incidents involving their data in accordance with applicable law and the Data Processing Agreement.

---

## 7. RESPONSIBLE DISCLOSURE PROGRAM

**7.1 Reporting.** AgentRuntime welcomes the responsible disclosure of security vulnerabilities affecting our platform. If you discover a potential security vulnerability in the Services, please report it promptly to:

**Email:** [security@agentruntime.io](mailto:security@agentruntime.io)

Please include in your report: a description of the vulnerability, the affected component or endpoint, the potential impact, and sufficient technical detail to enable reproduction and investigation.

**7.2 Researcher Guidelines.** When conducting security research, we request that you:

&nbsp;&nbsp;&nbsp;&nbsp;(a) refrain from exploiting any vulnerability beyond what is strictly necessary to demonstrate its existence;

&nbsp;&nbsp;&nbsp;&nbsp;(b) avoid accessing, modifying, or deleting data belonging to other users;

&nbsp;&nbsp;&nbsp;&nbsp;(c) not engage in denial-of-service attacks or any testing that could impair platform availability;

&nbsp;&nbsp;&nbsp;&nbsp;(d) provide AgentRuntime with a reasonable period to investigate and remediate the reported vulnerability before public disclosure; and

&nbsp;&nbsp;&nbsp;&nbsp;(e) comply with all applicable laws in the conduct of your research.

**7.3 Response Commitment.** AgentRuntime will acknowledge receipt of vulnerability reports within a commercially reasonable timeframe and will provide updates on investigation status where appropriate. We will not pursue legal action against researchers who comply with these guidelines.

---

## 8. BUSINESS CONTINUITY AND DISASTER RECOVERY

**8.1 Backup and Recovery.** AgentRuntime maintains data backup procedures designed to support recovery of customer data in the event of infrastructure failure, data corruption, or other disruptions.

**8.2 Resilience.** Platform architecture is designed with redundancy and failover capabilities to minimize service disruptions and support recovery objectives.

**8.3 Testing.** AgentRuntime periodically tests its business continuity and disaster recovery procedures to validate their effectiveness.

---

## 9. SECURITY CERTIFICATIONS AND ASSESSMENTS

AgentRuntime may undergo third-party security assessments, audits, or certification processes. Information regarding applicable certifications or attestations, including SOC 2 reports or equivalent, may be made available to enterprise customers under a non-disclosure agreement upon reasonable request.

---

## 10. CONTACT

To report a security vulnerability or for security-related inquiries:

**AgentRuntime Labs Ltd — Security Team**
Email: [security@agentruntime.io](mailto:security@agentruntime.io)

---

*© 2026 AgentRuntime Labs Ltd. All rights reserved.*
