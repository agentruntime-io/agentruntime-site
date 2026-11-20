# AGENTRUNTIME DESKTOP AGENT PRIVACY POLICY

**Effective Date:** November 21, 2026
**Last Updated:** November 21, 2026

This Privacy Policy ("**Policy**") applies to **`@agentruntime-labs/desktop-agent`** (version 0.3.x, command `desktop-agent`), a program that lets AI agents that **you** run on **your own Windows computer** move the mouse, type, use the clipboard, and take screenshots. We call it "**Desktop Agent**". Desktop Agent is published by **{{company.name}}** ("**AgentRuntime**," "**we**," "**us**," or "**our**").

This Policy covers only Desktop Agent. The AgentRuntime website, Console, and platform are covered by our [Privacy Policy](/legal/privacy-policy), and Desktop Agent does not connect to them.

---

## 1. THE SHORT VERSION

- **Desktop Agent runs on your computer and makes no internet connection.** It has no server of ours behind it, no account, no analytics, no telemetry, no advertising, and no crash reporting.
- **We do not receive your data.** Nothing Desktop Agent sees on your screen or in your clipboard is sent to us.
- **We do not sell or share your data.** We do not have it.
- **It can see and do a lot.** It acts with your permissions. It can take screenshots of your screen, read your clipboard, read window titles, and send real mouse and keyboard input. What it captures goes to the agent that asked, and from there possibly to an AI model provider, under that agent's own terms. See sections 3 and 5.
- **Input is on by default after install.** `desktop-agent install` enables input tools so an agent can work. Use `desktop-agent install --read-only` to leave them off.

---

## 2. WHAT DESKTOP AGENT IS FOR

Desktop Agent lets an AI agent that you run on your own computer work with native Windows applications and operating-system dialogs: look at the screen, click, type, press keys, scroll, drag, focus windows, and use the clipboard. It does this only when that agent (or you, from the command line) asks it to.

---

## 3. WHAT DESKTOP AGENT CAN ACCESS

| Information | When | Where it goes |
| --- | --- | --- |
| **Screenshots**: the whole screen, a region of it, or one window (including a window that other windows cover, or one on another virtual desktop) | When the agent asks for one | Back to the agent, as an image. The command line saves it as a file (section 4) |
| **Window information**: titles, positions, sizes, whether minimized, and which virtual desktop. The foreground window's title. | When the agent asks | To the agent |
| **Mouse position and screen size** | When the agent asks | To the agent |
| **Clipboard text** (read) | When the agent asks to read it. It can contain anything you copied, including passwords. | To the agent |
| **Clipboard text** (write) | When the agent asks. It replaces what was on the clipboard. | To your clipboard |
| **Mouse and keyboard input** (moves, clicks, drags, scrolls, typed text, key combinations such as `alt+f4` or `win+r`) | When the agent asks. It goes to whatever window is in front. | To the application that is in front |

Desktop Agent cannot tell a harmless window from a password manager. Screenshots show everything that is on screen, including other windows when the whole screen is captured.

### Controls you have

- **Input tools are off unless enabled.** They work only when `DESKTOP_AUTOMATION_ENABLED=1` is set for the program. `desktop-agent install` sets it. `desktop-agent install --read-only` does not, and then only the read-only tools work: screenshots, window and screen information, and reading the clipboard.
- **Blocked windows.** Set `DESKTOP_AUTOMATION_BLOCKED_TITLES` to a list of window-title fragments, for example `keepass,bitwarden,password,bank`. Click, drag, scroll, type, key press, and paste are then refused while a matching window is in front. This does not stop screenshots or clipboard reads.
- **Your own judgment.** Try it on a scratch window first. Do not point an agent at your desktop while sensitive windows are open or in front.

---

## 4. WHAT STAYS ON YOUR COMPUTER

Desktop Agent writes a few files on your computer. None of them is sent to us.

- **Screenshots from the command line.** When you use the `desktop-agent` command line (for example `desktop-agent shot`), images are saved in `.ar_desktop\cli-out` in your home folder (on Windows, `%USERPROFILE%\.ar_desktop\cli-out`), or where you point `--out`. They are not deleted automatically.
- **Screen-capture temporary files.** The screen-capture library Desktop Agent uses writes each screen capture to a temporary file in the Windows temporary folder and deletes it after reading it.
- **The command line's daemon file.** The first command-line command starts a background program (the "daemon") that listens on `127.0.0.1` only. A file in `.ar_desktop`, `daemon.json`, holds its local port and a random access token. The daemon deletes it when it stops.
- **A record of running servers.** Each Desktop Agent server process writes a small file in `.ar_desktop\instances` with its process id, its parent's process id, whether input is enabled, the name and version of the AI app that started it, and its start time. It removes the file when it exits, and stale files are ignored. `desktop-agent status` reads these files to list what is connected.

There are no logs of what was on your screen or clipboard, and Desktop Agent does not keep a history of your actions. To remove everything above, delete the `.ar_desktop` folder, after running `desktop-agent stop`.

`desktop-agent install` also edits the settings files of Cursor and Claude Desktop, to add Desktop Agent as a tool. It saves a timestamped `.bak` copy of each file first, and `desktop-agent uninstall` removes the entry again.

Installing with `npx` or `npm` contacts the npm registry, which is run by npm, Inc., before Desktop Agent starts. That is governed by npm's policies, not this one.

---

## 5. THE AI APPS AND AGENTS YOU CONNECT

Desktop Agent hands what it captures to whichever AI app or script you connected: Cursor, Claude Desktop, another program that speaks MCP, or the `desktop-agent` command line. We do not know which one you use, and we do not receive that content. Those apps may send screenshots and text to an AI model provider. Their handling is governed by their own terms and privacy policies, not by this one.

Because a screenshot can show anything on your screen, treat every capture as something that may reach that provider. Close or move away from windows with sensitive information before an agent works.

---

## 6. NO SALE, NO ADVERTISING, NO TRANSFER

We do not sell or transfer your information, we do not use it for advertising, and we do not use it to make credit or lending decisions. We do not receive it, so no one at AgentRuntime reads it.

---

## 7. HOW LONG THINGS ARE KEPT, AND HOW TO REMOVE THEM

| What | How long | How to remove it |
| --- | --- | --- |
| Screenshots saved by the command line | Until you delete them | Delete the files in `.ar_desktop\cli-out` |
| The daemon file and the server record | Until the daemon or server stops | Run `desktop-agent stop` |
| Everything else Desktop Agent sees | Not kept by Desktop Agent; it is handed to the agent that asked | Not applicable |
| Settings entries in Cursor and Claude Desktop | Until removed | Run `desktop-agent uninstall` |

**Stop access at once:** run `desktop-agent stop`, remove it from your AI app's tool list (or run `desktop-agent uninstall`), and restart the app.

Because we do not receive or hold this information, we cannot look it up, export, correct, or delete it for you. The controls above are how you manage it.

---

## 8. SECURITY

The daemon and the server listen on `127.0.0.1` only, so other computers cannot reach them, and the daemon requires a random token. Any program that runs as you can read the token file, so this protects you against other users and web pages, not against malware running as you. Desktop Agent acts with your privileges. A tool that can click and type for you can do whatever you can do, so use it with the care you would give any program with that power. The package includes a tool-by-tool safety review (`docs/SAFETY.md`), which you can read on its [npm page](https://www.npmjs.com/package/@agentruntime-labs/desktop-agent).

---

## 9. CHILDREN

Desktop Agent is not directed to individuals under the age of eighteen (18), and we do not knowingly collect information from them. We do not collect information from anyone.

---

## 10. CHANGES TO THIS POLICY

If this Policy changes, we will publish the new version at this address and update the "Last Updated" date above. If a change affects what Desktop Agent does with your data, we will say so in its release notes.

---

## 11. CONTACT

For questions about this Policy or Desktop Agent's handling of data:

**{{company.name}}, Privacy Team**
Email: [privacy@agentruntime.io](mailto:privacy@agentruntime.io)
Postal address: {{company.address}}

---

*© 2026 {{company.name}}. All rights reserved.*
