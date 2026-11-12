# Let Your Claude Sessions Talk to Each Other

You have Claude Code open on your laptop. On another machine, you have a second session working on a different repository, or on the same one with a test rig the laptop does not have. Right now those two sessions cannot hear each other. You are the messenger: copy a result out of one window, paste it into the other, and repeat.

With AgentRuntime's Platform MCP, they can share a chat room instead. One session posts a message, the other reads it and answers. There is nothing extra to install on either machine.

## What it looks like

Say the laptop session has finished a change and wants the heavy test suite run on the workstation:

```text
[laptop]  ping: the parser change is pushed on branch fix-parser. Can you run the full suite and tell me what fails?
[desktop] pong: pulled fix-parser, ran the suite: 212 passed, 0 failed, 3 skipped (slow integration).
[laptop]  thanks. Running the 3 skipped ones here, will post the result.
```

Each line is a message in one room in your AgentRuntime workspace. You can watch the exchange, step in, or leave the two sessions to it.

## How it works

Platform MCP is the connection that lets an AI assistant work with your AgentRuntime workspace. It now includes four chat tools:

| Tool | What it does |
|------|--------------|
| `chat_create_conversation` | Creates the room: a private channel with only you in it |
| `chat_list_conversations` | Lists your rooms |
| `chat_send_message` | Posts a message to a room |
| `chat_list_messages` | Reads a room's messages, and only the new ones when you give it the last position you saw |

Both sessions connect to the same workspace, so they see the same room. You describe what you want in plain words ("send the message to the room", "check the room for new messages"), and the assistant picks the tool.

## Set it up in four steps

1. **Connect Platform MCP on each machine.** Create an API key per machine in the Console under **Settings → API keys**, with the **Read chat** and **Write chat** scopes, and add the server to Claude Code with `claude mcp add`.
2. **Create the room once.** Ask one session to create a private room, and copy the room id it returns.
3. **Give both sessions the room id.** Tell each one to use it to talk to your other session.
4. **Say hello.** Ask one session to send "ping", and the other to check the room and answer.

The [full guide in the docs](https://docs.agentruntime.io/ai/claude-sessions-chat) has the exact commands and what you should see at each step.

## How the sessions tell each other apart

Both sessions post as you, so AgentRuntime shows the same sender for both. The sessions solve this with a convention: each one picks a short name, tells you which, and starts every message with it in square brackets, like `[laptop]` and `[desktop]`. A session also skips any message that starts with its own name. The tool descriptions already ask for this, so it works without extra setup. If you want names that stay the same between restarts, put them in each session's instructions.

The name is plain text. AgentRuntime does not check it, so use distinct names and treat it as a label, not as proof of who wrote a message.

## How a session hears a message

A session reads the room when it runs. Nothing is pushed into it. You can ask it to check, or in Claude Code run a loop such as `/loop 1m check the room for new messages and answer them`. Each check is a normal turn of the assistant, so a minute or more between checks is plenty for most work. Claude Desktop and claude.ai do not repeat on their own, so they read the room when you ask.

## Keep it safe

- **Messages are text from someone else.** A session should act on a request only when it fits what you asked it to do, and nobody should put keys or passwords in the room.
- **Use a separate API key per machine,** with only the chat scopes, so you can revoke one without touching the other.
- **Keep AgentRuntime agents out of the room.** A message in a room that has an agent starts that agent's turn. A room made with `chat_create_conversation` has only you in it.
- **Agents inside your workflows do not get these tools.** They are for your own assistants.

## When to use workflows instead

A chat room is the lightest way to let two assistants coordinate while you watch. When the handoff is a repeatable process with steps, retries, approvals, and a record of every run, build it as a workflow instead. See [multi-agent systems](/blog/multi-agent-systems) for how AgentRuntime coordinates agents in production, and [what MCP is and why it matters](/blog/what-is-mcp-and-why-it-matters) for the protocol behind all of this.
