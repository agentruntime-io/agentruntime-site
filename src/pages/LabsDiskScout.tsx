import { Link } from "react-router-dom";
import { Seo } from "@/components/Seo";
import {
  ActionLink,
  PageHero,
} from "@/components/marketing/MarketingPrimitives";
import { diskScout, trackLabsLink } from "@/lib/labsProjects";
import { seoCopy } from "@/seo/metadata";

/**
 * Checksum published with the v1.8.0 release (in its notes and as DiskScout-1.8.0.exe.sha256;
 * GitHub's asset digest matches). The Download button always opens the latest release, so
 * update this when a new release ships.
 */
const checkedRelease = {
  version: "1.8.0",
  fileName: "DiskScout-1.8.0.exe",
  sha256: "83c29c1ae2ca979cea3da337daad3f2e35cf952b7ef2dae02a6351640b316895",
  url: "https://github.com/agentruntime-io/diskscout/releases/tag/v1.8.0",
};

/**
 * WebP copies of the repo's `docs/screenshot-light.png` (2040 lossless, 1020 at quality 80,
 * made with sharp). Regenerate them by hand if the project's screenshot changes.
 */
const screenshot = {
  src: "/labs/diskscout-screenshot-2040.webp",
  srcSet:
    "/labs/diskscout-screenshot-1020.webp 1020w, /labs/diskscout-screenshot-2040.webp 2040w",
  sizes: "(max-width: 1280px) calc(100vw - 40px), 1240px",
  width: 2040,
  height: 1290,
};

const facts = [
  { label: "License", value: "MIT" },
  { label: "Requirements", value: "Windows. Tested on Windows 11 only." },
  { label: "Download", value: "A single portable .exe, about 8 MB." },
  {
    label: "Privacy",
    value:
      "Collects no usage data. Its only network request is a version check, sent when you press the button.",
  },
];

const features = [
  {
    title: "See where the space went",
    description:
      "DiskScout draws the drive as a map. Each block is a folder or file, sized by the space it uses and colored by type.",
  },
  {
    title: "Filter by size and type",
    description:
      "Narrow the map down to what you are looking for, for example video files over 500 MB.",
  },
  {
    title: "Find duplicates by content",
    description:
      "Duplicates are found by comparing file contents, not names. DiskScout lists the identical files so you can check them yourself.",
  },
  {
    title: "Delete carefully",
    description:
      "Files go to the Recycle Bin by default. Each one is compared byte for byte with a copy that stays, and the last copy is not removed unless you explicitly say so.",
  },
  {
    title: "Optional Claude panel",
    description:
      "An optional panel works with your own Claude installation. Anything it wants to delete or run waits for your approval.",
  },
  {
    title: "Small and open",
    description:
      "One portable .exe, written in Go with no third-party code. MIT licensed, and contributions are welcome.",
  },
];

const download = {
  label: "Download for Windows ↗",
  href: diskScout.downloadUrl,
  onClick: () => trackLabsLink(diskScout.slug, "download"),
};

const source = {
  label: "View source on GitHub ↗",
  href: diskScout.sourceUrl,
  onClick: () => trackLabsLink(diskScout.slug, "source"),
};

export default function LabsDiskScout() {
  return (
    <div className="marketing-page">
      <Seo {...seoCopy.labsDiskScout} canonicalPath="/labs/diskscout" />
      <PageHero
        eyebrow={
          <>
            <Link className="marketing-labs-text-link" to="/labs">
              Labs
            </Link>
            <span aria-hidden="true">/</span>
            <span>Open-source project</span>
          </>
        }
        title={diskScout.name}
        description={diskScout.summary}
        primary={download}
        secondary={source}
      />

      <section className="marketing-section" data-flush-top="true">
        <div className="marketing-container">
          <figure className="marketing-labs-shot">
            <img
              src={screenshot.src}
              srcSet={screenshot.srcSet}
              sizes={screenshot.sizes}
              width={screenshot.width}
              height={screenshot.height}
              alt="The DiskScout window showing a drive as a map of colored blocks, one per folder or file, with a folder tree on the right."
              decoding="async"
            />
            <figcaption>
              Screenshot from the{" "}
              <a
                className="marketing-labs-text-link"
                href={diskScout.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                DiskScout repository
              </a>{" "}
              on GitHub.
            </figcaption>
          </figure>
          <div className="marketing-section-label">At a glance</div>
          <dl className="marketing-labs-facts">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="marketing-section">
        <div className="marketing-container">
          <div className="marketing-section-label">What it does</div>
          <h2>See where your disk space went, then clean up with care.</h2>
          <div className="marketing-grid-3">
            {features.map((feature) => (
              <article
                className="marketing-card marketing-labs-feature"
                data-compact="true"
                key={feature.title}
              >
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="marketing-section" data-tone="soft">
        <div className="marketing-container">
          <div className="marketing-section-label">Before you download</div>
          <h2>Keep a backup, and check the file.</h2>
          <div className="marketing-grid-2 marketing-labs-before">
            <div className="marketing-labs-panel" data-tone="warning">
              <h3>DiskScout can delete files.</h3>
              <p>
                Keep backups of anything you cannot afford to lose before you
                clean up a drive. DiskScout is provided as is, without
                warranty, under the MIT License.
              </p>
            </div>
            <div className="marketing-labs-panel">
              <h3>Check the download</h3>
              <p>
                The .exe is not code-signed, so Windows SmartScreen may warn
                the first time you run it. You can compare the file with the
                SHA-256 checksum published with the release.
              </p>
              <div className="marketing-labs-checksum-label">
                {checkedRelease.fileName} (
                <a
                  className="marketing-labs-text-link"
                  href={checkedRelease.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  v{checkedRelease.version}
                </a>
                )
              </div>
              <code className="marketing-labs-checksum">
                {checkedRelease.sha256}
              </code>
              <p className="marketing-labs-panel-note">
                In PowerShell, run{" "}
                <code>Get-FileHash .\{checkedRelease.fileName}</code> and
                compare the result. Newer releases list their own checksum on
                the release page.
              </p>
            </div>
          </div>

          <div className="marketing-hero-actions marketing-labs-actions">
            <ActionLink {...download} variant="primary" />
            <ActionLink {...source} variant="secondary" />
          </div>

          <p className="marketing-labs-fineprint">
            DiskScout is a separate project and is not affiliated with
            SpaceSniffer. It is an open-source tool built by the AgentRuntime
            team and is not part of the AgentRuntime product.{" "}
            <Link className="marketing-labs-text-link" to="/labs">
              More from Labs
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
