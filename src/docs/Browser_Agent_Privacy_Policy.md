# AGENTRUNTIME BROWSER AGENT PRIVACY POLICY

**Effective Date:** November 21, 2026
**Last Updated:** November 21, 2026

This Privacy Policy ("**Policy**") applies to the **AgentRuntime Browser Agent** Chrome extension (version 0.9.x, short name "AR Browser") and to the **`@agentruntime-labs/browser-agent`** helper program that it works with (version 0.2.x, command `browser-agent`). Together we call them "**Browser Agent**". Browser Agent is published by **{{company.name}}** ("**AgentRuntime**," "**we**," "**us**," or "**our**").

Browser Agent lets AI agents that **you** run on **your own computer**, such as Claude Desktop, Cursor, or the `browser-agent` command line, work in your Chrome tabs. This Policy covers only Browser Agent. The AgentRuntime website, Console, and platform are covered by our [Privacy Policy](/legal/privacy-policy), and Browser Agent does not connect to them.

---

## 1. THE SHORT VERSION

- **We do not receive your data.** The extension talks only to a helper program on your own computer, over `127.0.0.1` (localhost). It makes no connection to AgentRuntime or to any other internet server.
- **No account, no analytics, no tracking, no advertising, no crash reporting.** There is no such code in the extension or in the helper.
- **We do not sell or share your data.** We do not have it. We do not use it for advertising, for credit or lending decisions, or for anything outside the single purpose below.
- **Page content does leave the extension.** When an agent you run asks for it, the extension reads a page and hands the result to the helper, which hands it to your AI app. What that app does with it, including sending it to an AI model provider, is governed by that app's own terms and privacy policy, not by this one. See section 6.
- **The helper keeps a log on your computer, by default.** It stays on your computer until you delete it. See section 5.

---

## 2. WHAT BROWSER AGENT IS FOR (SINGLE PURPOSE)

Browser Agent has one purpose: to let AI agents that you run on your own computer control your browser tabs over a local (`127.0.0.1`) connection. It reads and acts on pages only when such an agent asks it to.

The extension does nothing on its own. It needs the helper (`npx @agentruntime-labs/browser-agent install`) running on the same computer.

---

## 3. WHAT THE EXTENSION HANDLES

Chrome describes some of this as "user data" because it can include what you see and do in your browser. The extension handles the following, and only to carry out a request from an agent you run:

| Information | When | Where it goes |
| --- | --- | --- |
| **Open tabs**: tab and window ids, address (URL), and title | When an agent asks for the current tab or the tab list | To the helper on your computer |
| **Page content**: the visible text of a page, the interactive elements on it with their labels and roles, and selected text | When an agent reads the targeted tab | To the helper on your computer |
| **Screenshots** of a tab or of one element | When an agent asks for one | To the helper on your computer |
| **Console messages** of a tab (the most recent ones, capped) | Collected in the page only after an agent first asks for them in that tab; held in the page's memory until it reloads | To the helper, when asked |
| **Network request metadata**: address (first 800 characters), status code, method, type, tab id, and time of each web request | The extension notes these for every `http` and `https` request in every tab while it runs, and keeps only the most recent 80 **in memory**. Request and response bodies and headers are never read. | To the helper, only when an agent asks which requests happened |
| **Recent downloads**: file name and folder, source address (first 500 characters), state, and size, for up to the 15 most recent downloads in Chrome | When an agent asks for downloads | To the helper on your computer |
| **Clipboard text** | Only if you have allowed DevTools features (section 4) and an agent asks to read or write the clipboard | To or from the helper on your computer |
| **A file from your computer** | When an agent asks to attach a file you named to a page's file field. The page you target receives the file. | To the page you targeted |
| **Typed text and keystrokes** | When an agent asks to type into, click, scroll, or otherwise act on a page. The page receives them like any input. After filling a field, the extension reads that field back (up to 500 characters) to confirm it was filled, and returns that to the agent. | To the page you targeted, and the read-back to the helper |

Form fields: the extension lists a field by its label, placeholder, name, and type. It does not list the text typed into a field as part of the page structure. An agent that reads the page text, or takes a screenshot, can still see whatever is visible, including text in a visible field.

### Optional features you control

- **DevTools features** (off until you allow them). They use Chrome's `debugger` permission to take full-page and hidden-tab screenshots, emulate dark mode and phone widths, send trusted mouse input, record a tab, and read or write the clipboard. The extension never attaches the debugger unless you allowed these features, either for 10 minutes or until you switch them off in the popup. It attaches only for the length of a call that needs it, and Chrome shows its own "started debugging this browser" bar while it is attached.
- **Page script evaluation** (off until you tick **Allow page script evaluation** in the popup). When it is on, the extension runs a piece of JavaScript that **your own local agent** sent, in the page you targeted. The extension does not download code from the internet and does not run code sent by any server other than the helper on your computer.
- **Tab modes.** You choose which tabs agents may use: any tab (Freeform), only the tab you are on (Follow), or only tabs you pin (Pinned).

---

## 4. WHAT THE EXTENSION STORES

In Chrome's local extension storage **on your device** (not Chrome Sync, so it is not copied to your other devices): the helper's port and the ports that worked before; a session token, if you typed one into the popup; a random id and a name for this Chrome profile; your tab mode and pinned tabs; whether DevTools features and page script evaluation are allowed, and until when; and a few connection flags. In Chrome's session storage, which Chrome clears when the browser closes: whether you pressed Disconnect, and any confirmation prompt that is open.

Nothing in that list is a page's content, and none of it leaves your computer.

---

## 5. WHAT THE HELPER ON YOUR COMPUTER DOES WITH IT

The helper (`@agentruntime-labs/browser-agent`) is a program that runs on your computer, as you. It listens on `127.0.0.1` only, so other computers cannot reach it. It passes what the extension reads to the AI app that started it (over MCP, on standard input and output) or to the `browser-agent` command line. It makes no network request of its own.

By default the helper **keeps files on your computer**, in a folder called `.ar_browser` in your home folder (on Windows, `%USERPROFILE%\.ar_browser`):

- **A session log** (on by default): one line per agent action, with the tool name, its arguments (which include any text the agent was asked to type), the tab address, whether it worked, up to the first 1,200 characters of the result (which can include page text), and any screenshot the agent took. Set `BROWSER_AUTOMATION_SESSION_LOG=0` to turn it off.
- **Session state**, so an agent can resume a session, and a small file with the command line's local port and a random access token.
- **Files you ask for**: recordings and before-and-after click screenshots if an agent or you use those features, and, in managed-browser mode only, files that browser downloads. Downloads made in your own Chrome stay in Chrome's download folder, as usual.

None of this is sent to us, and the helper does not delete it for you. To remove it, delete the `.ar_browser` folder.

`browser-agent install` also edits the settings files of Claude Desktop and Cursor, to add Browser Agent as a tool. It saves a timestamped `.bak` copy of each file first, and `browser-agent uninstall` removes the entry again.

Installing with `npx` or `npm` contacts the npm registry, which is run by npm, Inc., before Browser Agent starts. That is governed by npm's policies, not this one.

The helper can optionally drive a separate Chromium browser that it launches itself (a "managed browser") instead of your Chrome. Pages loaded there are handled by the same helper, with the same local logs.

---

## 6. THE AI APPS AND AGENTS YOU CONNECT

Browser Agent sends what it reads to whichever AI app you connected, such as Claude Desktop, Cursor, or a script you wrote. We do not know which one you use and we do not receive that content. Those apps may send it to an AI model provider. Their handling is governed by their own terms and privacy policies. Before you point an agent at a page that shows sensitive information (email, banking, health, work systems), check what your AI app does with what it sees.

The agent works in your real browser, with your signed-in sessions. Anything you can do on a page, it can do. Review what it is asked to do.

---

## 7. THE PERMISSIONS THE EXTENSION ASKS FOR

| Permission | Why |
| --- | --- |
| Access to all websites (`<all_urls>`) | The agent you run may be asked to work on any website. The extension injects its script only into the tab a request names, and only when an agent asks. It has no scripts that run on pages by themselves. |
| `scripting` | To inject that script and to run the page actions an agent asks for (read, click, type, scroll). |
| `tabs` | To list, open, switch to, and close tabs, and to read their title and address so the right one can be chosen. |
| `activeTab` | To act on the tab you are looking at when no tab is named. |
| `storage` | To keep the settings listed in section 4. |
| `webRequest` | To observe (not change or block) web requests, so an agent can find out which request failed. Section 3 says what is kept. |
| `downloads` | To list recent downloads, so an agent can confirm that a file was saved. |
| `alarms` | To wake the extension every 30 seconds so it can reconnect to the helper after the helper restarts. |
| `debugger` | For the optional DevTools features in section 3. Chrome does not allow this permission to be optional, so it is declared, and the extension itself keeps it unused until you allow DevTools features. |

---

## 8. CHROME WEB STORE USER DATA POLICY AND LIMITED USE

The use of information received from Chrome extension APIs by Browser Agent will adhere to the [Chrome Web Store User Data Policy](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq), including the Limited Use requirements. In particular:

- **Allowed use.** The extension uses the information described in section 3 only to provide its single purpose: carrying out requests from AI agents that you run on your own computer.
- **Allowed transfer.** The extension does not transfer that information to us or to any third party. It sends it only to the helper on your own computer. We do not transfer it to others to provide, improve, or protect the extension either, because we never receive it.
- **No advertising.** We do not use or transfer the information to show personalized, re-targeted, or interest-based advertisements, and we do not sell it to advertising platforms, data brokers, or other information resellers.
- **No human reading.** AgentRuntime does not receive this information, so no one at AgentRuntime reads it.
- **No credit or lending use.** We do not use or transfer it to decide creditworthiness or for lending.
- **Local transmission only.** The extension connects only to `127.0.0.1` on the same computer as your browser. It makes no other connection.

We do not sell your data, and we do not use or share it for purposes unrelated to the single purpose.

---

## 9. HOW LONG THINGS ARE KEPT, AND HOW TO REMOVE THEM

| What | How long | How to remove it |
| --- | --- | --- |
| The extension's settings (section 4) | Until you remove the extension | Remove the extension in `chrome://extensions`, or clear them by pressing **Disconnect** and turning off the optional features in the popup |
| The recent request list and console messages (section 3) | In memory only; lost when the extension restarts, the browser closes, or the page reloads | Nothing to do |
| The helper's log, state, recordings, and downloads (section 5) | Until you delete them; the helper does not delete them | Delete the `.ar_browser` folder, and set `BROWSER_AUTOMATION_SESSION_LOG=0` to stop the log |
| Everything else the extension read | Not kept by Browser Agent beyond the above | Not applicable |

**Stop access at once:** press **Disconnect** in the extension popup. Agents then cannot reach your browser.

Because we do not receive or hold this information, we cannot look it up, export, correct, or delete it for you. The controls above are how you manage it.

---

## 10. SECURITY

The extension and the helper talk only over the loopback address `127.0.0.1`, so the traffic does not cross a network. The extension exposes no interface that a web page can call. It declares no scripts that run on pages by themselves, and it loads no code from the internet. The helper runs with your permissions, so other programs running on your computer as you may be able to read the files in section 5. Protect that folder as you would your own documents.

---

## 11. CHILDREN

Browser Agent is not directed to individuals under the age of eighteen (18), and we do not knowingly collect information from them. We do not collect information from anyone.

---

## 12. CHANGES TO THIS POLICY

If this Policy changes, we will publish the new version at this address and update the "Last Updated" date above. If a change affects what Browser Agent does with your data, we will say so in the extension's release notes.

---

## 13. CONTACT

For questions about this Policy or Browser Agent's handling of data:

**{{company.name}}, Privacy Team**
Email: [privacy@agentruntime.io](mailto:privacy@agentruntime.io)
Postal address: {{company.address}}

---

*© 2026 {{company.name}}. All rights reserved.*
