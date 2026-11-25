import { Link } from "react-router-dom";
import { LabsAgentPage } from "@/components/marketing/LabsAgentPage";
import { browserAgent, desktopAgent } from "@/lib/labsProjects";
import { seoCopy } from "@/seo/metadata";

const facts = [
  { label: "License", value: "Apache-2.0" },
  {
    label: "Requirements",
    value:
      "Chrome 114 or newer and Node.js 18 or newer (Firefox 128 or newer for the experimental Firefox build, see below). The installer finds Claude Desktop and Cursor in their Windows locations.",
  },
  {
    label: "Works with",
    value:
      "Claude Desktop, Cursor, any MCP host, or the browser-agent command line with no AI app at all.",
  },
  {
    label: "Privacy",
    value:
      "No account, no analytics. The extension talks only to a helper on your own computer (127.0.0.1).",
  },
];

const features = [
  {
    title: "Works in your real browser",
    description:
      "Your agent uses the tabs you already have open, with the sites you are already signed in to, instead of a separate empty browser.",
  },
  {
    title: "Read, click, type, capture",
    description:
      "Read a page's text and structure, click, fill fields, press keys, scroll, choose options, open and switch tabs, and take screenshots of a tab or of one element.",
  },
  {
    title: "You choose which tabs",
    description:
      "Freeform lets agents use any tab, Follow only the tab you are on, and Pinned only tabs you pin. Several Chrome profiles can connect at once, each with its own name.",
  },
  {
    title: "A command line too",
    description:
      "The browser-agent command can drive the browser from a shell without an MCP host: list tabs, take a snapshot, click, take a screenshot, and more.",
  },
  {
    title: "Power features start switched off",
    description:
      "DevTools features (full-page screenshots, dark-mode emulation, trusted mouse input) and page script evaluation stay off until you allow them. Chrome shows its own debugging bar while DevTools features are in use.",
  },
  {
    title: "Local only",
    description:
      "The extension has no server of ours behind it. It connects only to 127.0.0.1 on your computer, and it loads no code from the internet.",
  },
];

const firefoxSteps = [
  <>
    Clone the source repository (<code>agentruntime-io/browser-agent</code> on
    GitHub), run <code>npm install</code> in its root folder, then{" "}
    <code>npm run build:firefox</code>. This writes a folder called{" "}
    <code>extension-firefox</code>.
  </>,
  <>
    In Firefox open <code>about:debugging#/runtime/this-firefox</code>, choose
    Load Temporary Add-on, and pick <code>extension-firefox/manifest.json</code>.
    Do not pick <code>extension/manifest.json</code>: Firefox rejects it.
  </>,
  <>
    Open <code>about:addons</code>, select the extension, open Permissions, and
    turn on &ldquo;Access your data for all websites&rdquo;. Firefox leaves site
    access off for this kind of extension, and without it nothing works.
  </>,
  <>
    Click the extension icon, check the port, and press Connect. The helper is
    the same as for Chrome: run{" "}
    <code>npx @agentruntime-labs/browser-agent install</code>, then restart
    your AI app.
  </>,
];

const firefoxSection = (
  <section className="marketing-section" id="firefox">
    <div className="marketing-container">
      <div className="marketing-section-label">Firefox, experimental</div>
      <h2>Use it in Firefox.</h2>
      <p className="marketing-labs-intro">
        Chrome is the main way to use Browser Agent and the one we support. A
        Firefox version exists, but it is experimental. It passes
        Mozilla&rsquo;s add-on linter, and in a throwaway Firefox profile it
        connected to the helper, listed tabs, opened a page and read its text.
        It has not been used day to day in a normal profile yet. It needs
        Firefox 128 or newer.
      </p>
      <p className="marketing-labs-intro">
        There is no Firefox store listing yet, and the npm package does not
        include the Firefox folder, so for now you build it from a clone of the
        source repository.
      </p>
      <ol className="marketing-labs-steps">
        {firefoxSteps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
      <p className="marketing-labs-fineprint">
        A temporary add-on disappears when Firefox restarts, so load it again
        next time; a permanent install needs Mozilla&rsquo;s signing. Dark-mode
        emulation, full-page and clipped screenshots, and anything else that
        needs the DevTools protocol do not work in Firefox. Screenshots,
        downloads and window tools have not been checked there yet.
      </p>
    </div>
  </section>
);

export default function LabsBrowserAgent() {
  return (
    <LabsAgentPage
      agent={browserAgent}
      seo={seoCopy.labsBrowserAgent}
      canonicalPath="/labs/browser-agent"
      facts={facts}
      installTitle="Two parts: a helper on your computer and a Chrome extension."
      installIntro="The Chrome extension does nothing on its own. It is the browser half of a helper that runs on your computer. Install the helper first, with Node.js 18 or newer:"
      installSteps={[
        <>
          Restart Claude Desktop or Cursor, which the command wired up. For a
          plain command line with no AI app, run{" "}
          <code>npm install -g @agentruntime-labs/browser-agent</code>, then{" "}
          <code>browser-agent status</code>.
        </>,
        <>
          Add the AgentRuntime Browser Agent extension to Chrome. A Chrome Web
          Store listing is not live yet. Until it is, run{" "}
          <code>npx @agentruntime-labs/browser-agent paths</code> to print the
          extension folder, open <code>chrome://extensions</code>, turn on
          Developer mode, choose Load unpacked, and select that folder.
        </>,
        <>
          Click the extension icon. It connects by itself and shows Connected.
          Then ask your AI app to take a screenshot of your current tab. Prefer
          Firefox? There is an experimental build: see below.
        </>,
      ]}
      extraSection={firefoxSection}
      featuresHeading="Let an agent work in the browser you already use."
      features={features}
      warning={{
        title: "It acts in your signed-in browser.",
        body: (
          <p>
            An agent using Browser Agent can do anything you can do in a tab
            you let it use, including on sites where you are signed in. Use the
            Follow or Pinned tab modes, watch what it does, and keep sensitive
            pages, such as banking, email, and admin consoles, out of agent
            sessions. What an agent reads goes to your AI app, and from there
            possibly to its model provider.
          </p>
        ),
      }}
      privacy={{
        title: "What it asks Chrome for, and why.",
        body: (
          <>
            <p>
              Access to all websites, scripting, tabs, web requests (observed
              only, never changed), downloads, storage, and alarms, so an agent
              can work on any site you point it at. The debugger permission is
              used only for the optional DevTools features, and only after you
              allow them.
            </p>
            <p className="marketing-labs-panel-note">
              The{" "}
              <Link
                className="marketing-labs-text-link"
                to={`/legal/${browserAgent.privacySlug}`}
              >
                privacy policy
              </Link>{" "}
              lists each permission, what the extension reads, what the helper
              keeps on your computer, and how to remove it.
            </p>
          </>
        ),
      }}
      fineprint={
        <>
          Browser Agent is built by the AgentRuntime team and is not part of the
          AgentRuntime platform. It is licensed under Apache-2.0 and provided as
          is, without warranty. It pairs with{" "}
          <Link className="marketing-labs-text-link" to={`/labs/${desktopAgent.slug}`}>
            Desktop Agent
          </Link>{" "}
          for apps outside the browser.{" "}
          <Link className="marketing-labs-text-link" to="/labs">
            More from Labs
          </Link>
        </>
      }
    />
  );
}
