import { useState } from "react";

/**
 * LinkedIn sets its own cookies as soon as its embed loads, so the iframe waits for an
 * explicit click (see the Cookie Policy, "Embedded content").
 */
export function LinkedInEmbed({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);
  const postUrl = src.replace("/embed/feed/", "/feed/").split("?")[0];

  if (loaded) {
    return (
      <iframe
        src={src}
        height={842}
        width={504}
        className="max-w-full rounded-xl border border-border"
        title="LinkedIn post"
        loading="lazy"
        allowFullScreen
      />
    );
  }

  return (
    <div className="w-full max-w-[504px] rounded-xl border border-border p-6 text-center">
      <p className="text-sm text-muted-foreground">
        This post is hosted on LinkedIn. Loading it lets LinkedIn set its own
        cookies.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => setLoaded(true)}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          Load LinkedIn post
        </button>
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg px-4 py-2 text-sm font-medium text-primary-strong hover:underline"
        >
          Open on LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
