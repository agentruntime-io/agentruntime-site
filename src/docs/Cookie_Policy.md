# AGENTRUNTIME COOKIE POLICY

**Effective Date:** October 30, 2026
**Last Updated:** November 2, 2026

This Cookie Policy explains how **AgentRuntime Labs LLC** ("**AgentRuntime**," "**we**," "**us**," or "**our**") uses cookies and similar technologies on our website at **agentruntime.io** (the "**Site**") and in the AgentRuntime console at **console.agentruntime.io** (the "**Console**"). It supplements our [Privacy Policy](/legal/privacy-policy).

---

## 1. WHAT COOKIES ARE

Cookies are small text files that a website stores in your browser. Similar technologies, such as local storage, session storage and IndexedDB, work in a comparable way. In this Policy, "**cookies**" covers all of them.

---

## 2. HOW WE USE COOKIES

We use cookies to keep you signed in to the Console, remember your settings, help prevent payment fraud, remember your cookie choice and, if you allow it, for analytics. We do not use advertising cookies, and we do not sell information collected through cookies.

### 2.1 Without your consent

- **Counting visits without cookies.** On the Site, we count visits using PostHog in cookieless mode, Vercel Web Analytics and Vercel Speed Insights. In the Console, we count usage with PostHog in cookieless mode, and these events do not include your account, workspace or project identifiers. None of these store cookies or other identifiers in your browser. In cookieless mode, PostHog distinguishes visits using a privacy-preserving hash generated on its servers.
- **Remembering your choice.** When you make a choice, we store it in a cookie that applies across agentruntime.io subdomains, so the Site and the Console can respect it in the same browser and do not ask again. This cookie is strictly necessary for that purpose.
- **Making the Console work.** The Console uses cookies and storage to keep you signed in and secure, to remember settings you choose, and to complete steps such as connecting a tool or accepting an invitation (see Sections 4.1 and 4.2).
- **Preventing payment fraud.** Our payment processor, Stripe, sets cookies in the Console to help detect fraud (see Section 4.4).

### 2.2 With your consent

You can allow analytics by selecting **Accept** on the Site or **Allow analytics** in the Console under **Settings → Privacy**. Your choice applies to both the Site and the Console in the same browser. If you allow analytics:

- **PostHog** stores an analytics cookie that lets us understand how visitors move between the Site and the Console. When you sign in to the Console, we link this to your account so we can understand how you found AgentRuntime and how you use it.
- **Mixpanel** provides additional product analytics in the Console.
- **Session recordings.** PostHog and Mixpanel record some Console sessions so we can fix problems and help you when you contact support. Recordings hide page text, everything you type, and images. We use them to see how the Console is used, not to read your workflows or data.

You can withdraw consent at any time (see Section 6). When you do, we stop collecting analytics with cookies and remove the analytics storage described in Section 4.3, some of it when you next load a page or close the tab.

---

## 3. COOKIES AND STORAGE ON THE SITE

| Name | Provider | Purpose | Type | Duration | Consent required |
| --- | --- | --- | --- | --- | --- |
| `__ph_opt_in_out_[project key]` | PostHog, on our behalf | Remembers whether you accepted or rejected analytics cookies, on the Site and in the Console | Cookie on .agentruntime.io | 1 year | No (strictly necessary) |
| `ph_[project key]_posthog` | PostHog | Distinguishes visitors and sessions for analytics across the Site and Console | Cookie on .agentruntime.io | 1 year | Yes |

"[project key]" is the public identifier of our PostHog project.

---

## 4. COOKIES AND STORAGE IN THE CONSOLE

The Console also uses the two cookies in Section 3. In addition:

### 4.1 Strictly necessary

| Name | Provider | Purpose | Type | Duration | Consent required |
| --- | --- | --- | --- | --- | --- |
| `ar_session` | AgentRuntime | Keeps you signed in | Cookie on .agentruntime.io, secure and not readable by scripts | 8 hours, or until you sign out | No |
| `ar_oauth_state` | AgentRuntime | Protects the sign-in redirect | Cookie on .agentruntime.io | 5 minutes | No |
| Sign-in service cookies | AgentRuntime | Single sign-on session for the Console | Cookies on auth.agentruntime.io | Until you sign out, or as set by the sign-in service | No |
| Session storage beginning with `ar.`, `ar_`, `autopilot.` or `operate.`, and `oauth2_pending_*`, `google_oauth_pending`, `composio_link_pending`, `console_invite_token`, `stripe_payment_method_return_to`, `pending_mcp_workflow_step`, `workflow_import_draft`, `workflow-studio-run-inspect-setup:*` | AgentRuntime | Your signed-in account and workspace, and steps in progress such as connecting a tool, accepting an invitation, adding a payment method or importing a workflow | Session storage | Until you close the tab or finish the step | No |

### 4.2 Preferences

| Name | Provider | Purpose | Type | Duration | Consent required |
| --- | --- | --- | --- | --- | --- |
| Local storage beginning with `agentruntime-`, `ar.`, `autopilot.`, `operate.`, `tenant-data-` or `react-resizable-panels:` | AgentRuntime | Remembers settings you choose, such as theme, layout, panel sizes, table columns and tips or tours you have dismissed, and keeps runs you start while offline until they can be sent | Local storage | Until you clear it; some are removed when you sign out | No |

### 4.3 Analytics and session recordings

| Name | Provider | Purpose | Type | Duration | Consent required |
| --- | --- | --- | --- | --- | --- |
| `ph_[project key]_posthog` | PostHog | A copy of the analytics identifier in Section 3 | Local storage | Until you withdraw consent or clear it | Yes |
| Session storage beginning with `ph_[project key]_` | PostHog | Tracks the current session and tab, including session recordings | Session storage | Until you close the tab | Yes |
| `mp_[project token]_mixpanel`, `__mpq_[project token]_ev`, `__mpq_[project token]_pp`, `__mpq_[project token]_gr` | Mixpanel | Mixpanel's identifier for your browser, and analytics waiting to be sent | Local storage | Until you withdraw consent or clear it | Yes |
| `mp_tab_id_mixpanel_[project token]`, `mp_gen_new_tab_id_mixpanel_[project token]` | Mixpanel | Identifies the browser tab | Session storage | Until you close the tab | Yes |
| `mixpanelBrowserDb`, `mixpanelFlagsDb` | Mixpanel | Session recordings waiting to be sent, and feature settings | IndexedDB | Until you withdraw consent or clear it | Yes |
| `__mp_opt_in_out_[project token]` | Mixpanel | Records that you withdrew consent, until the Console removes Mixpanel's storage on the next page load | Local storage | Until the next page load | No (records your choice) |

"[project token]" is the public identifier of our Mixpanel project.

### 4.4 Payments

| Name | Provider | Purpose | Type | Duration | Consent required |
| --- | --- | --- | --- | --- | --- |
| `__stripe_mid`, `__stripe_sid` | Stripe | Help detect and prevent payment fraud | Cookies set by Stripe's script in the Console | `__stripe_mid`: 1 year; `__stripe_sid`: 30 minutes | No (fraud prevention) |

Stripe processes payments for the Console. Stripe may also set cookies on its own domains, which are governed by Stripe's cookie policy rather than this Policy.

### 4.5 Signing in with Google and connecting WhatsApp

- If you sign in with Google, Google's sign-in service loads on the Console sign-in page and may set its own cookies.
- If you connect a WhatsApp Business account, Meta's Facebook SDK loads to complete the connection. Meta may set its own cookies and collect information about the connection.

These cookies are governed by Google's and Meta's own policies rather than this Policy.

---

## 5. EMBEDDED CONTENT

Some blog posts can display a post from LinkedIn. The LinkedIn post loads only when you choose to load it. Once loaded, LinkedIn may set its own cookies, which are governed by LinkedIn's cookie policy rather than this Policy.

---

## 6. YOUR CHOICES

- **Change your choice at any time** using **Cookie settings** at the bottom of every page of the Site, or under **Settings → Privacy** in the Console. Your choice applies to both in the same browser.
- **Browser signals.** If your browser sends a Do Not Track signal, PostHog and Mixpanel do not collect any events from your visit to the Site or your use of the Console. If your browser sends a Global Privacy Control signal, we treat it as a rejection of analytics cookies.
- **Browser settings.** You can block or delete cookies and other storage through your browser settings. If you block the strictly necessary cookies and storage described in Sections 2.1 and 4.1, you may not be able to sign in to the Console, and we cannot remember your choice.

---

## 7. CHANGES TO THIS POLICY

We may update this Policy when we change the technologies we use. We will update the "Last Updated" date above and, where required by law, ask for your consent again.

---

## 8. CONTACT US

For questions about this Policy or our use of cookies, contact:

**AgentRuntime Labs LLC**
Email: [privacy@agentruntime.io](mailto:privacy@agentruntime.io)
