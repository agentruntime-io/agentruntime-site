import { Link } from "react-router-dom";
import { LabsAgentPage } from "@/components/marketing/LabsAgentPage";
import { browserAgent, desktopAgent } from "@/lib/labsProjects";
import { seoCopy } from "@/seo/metadata";

const facts = [
  { label: "License", value: "Apache-2.0" },
  {
    label: "Requirements",
    value:
      "Windows 10 or 11 and Node.js 18 or newer. Other platforms return a clear error.",
  },
  {
    label: "Works with",
    value:
      "Cursor, Claude Desktop, any MCP host, or the desktop-agent command line with no AI app at all.",
  },
  {
    label: "Privacy",
    value:
      "No account, no analytics, no internet connection. The only server is a command-line helper on 127.0.0.1.",
  },
];

const features = [
  {
    title: "Real mouse and keyboard",
    description:
      "Built on Windows SendInput. Move, click, double-click, drag, scroll, type text, and press keys or combinations in whatever window is in front.",
  },
  {
    title: "Screenshots of any window",
    description:
      "Capture the screen, a region, or a single window, even one that other windows cover or that sits on another virtual desktop. A grid overlay turns a picture into coordinates.",
  },
  {
    title: "Clipboard and windows",
    description:
      "Read and write the clipboard, list windows on every virtual desktop, and bring one to the front by its title.",
  },
  {
    title: "From an AI app or a shell",
    description:
      "One command wires Cursor and Claude Desktop. Or call every tool from the desktop-agent command line, with no MCP host.",
  },
  {
    title: "Safety switches",
    description:
      "Input is enabled by the installer so an agent can work. Install with --read-only to leave it off, and list window titles, such as a password manager, in which input is refused.",
  },
  {
    title: "Pairs with Browser Agent",
    description:
      "Browser Agent sees the page. Desktop Agent sends the trusted OS-level click when a page insists on it, and works with native apps and system dialogs.",
  },
];

export default function LabsDesktopAgent() {
  return (
    <LabsAgentPage
      agent={desktopAgent}
      seo={seoCopy.labsDesktopAgent}
      canonicalPath="/labs/desktop-agent"
      facts={facts}
      installTitle="One command, then restart your AI app."
      installIntro="With Node.js 18 or newer on Windows, run:"
      installSteps={[
        <>
          It registers Desktop Agent in Cursor and in Claude Desktop (the
          classic and the Microsoft Store installs), after saving a timestamped
          backup of each settings file. Restart them afterwards.
        </>,
        <>
          Add <code>--read-only</code> to install without enabling the input
          tools. Then only the read-only tools work: screenshots, window and
          screen information, and reading the clipboard.
        </>,
        <>
          Check the setup with{" "}
          <code>npx @agentruntime-labs/desktop-agent doctor</code>.
        </>,
      ]}
      featuresHeading="Give an agent hands for the apps outside the browser."
      features={features}
      warning={{
        title: "It moves your real mouse and types real keys.",
        body: (
          <p>
            Desktop Agent acts with your privileges and cannot tell a harmless
            window from a password manager. Try it first on a scratch window,
            keep sensitive windows closed, and never let it type passwords.
            Screenshots show everything on screen and may reach your AI
            provider, and the clipboard may hold passwords. It is not for
            CAPTCHA bypass, stealth, or controlling machines you do not own.
          </p>
        ),
      }}
      privacy={{
        title: "What stays on your computer.",
        body: (
          <>
            <p>
              Desktop Agent makes no internet connection and has no account or
              analytics. Command-line screenshots are saved in a folder in your
              home folder, and a small local file holds the helper&rsquo;s port
              and a random access token. Nothing is sent to us.
            </p>
            <p className="marketing-labs-panel-note">
              The{" "}
              <Link
                className="marketing-labs-text-link"
                to={`/legal/${desktopAgent.privacySlug}`}
              >
                privacy policy
              </Link>{" "}
              lists what it can access, which files it writes, and how to remove
              them.
            </p>
          </>
        ),
      }}
      fineprint={
        <>
          Desktop Agent is built by the AgentRuntime team and is not part of the
          AgentRuntime platform. It is licensed under Apache-2.0 and provided as
          is, without warranty. It pairs with{" "}
          <Link className="marketing-labs-text-link" to={`/labs/${browserAgent.slug}`}>
            Browser Agent
          </Link>{" "}
          for the browser.{" "}
          <Link className="marketing-labs-text-link" to="/labs">
            More from Labs
          </Link>
        </>
      }
    />
  );
}
