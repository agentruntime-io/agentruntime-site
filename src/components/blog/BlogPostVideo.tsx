type BlogPostVideoProps = {
  src: string;
  poster?: string;
  title: string;
  className?: string;
};

export function BlogPostVideo({ src, poster, title, className }: BlogPostVideoProps) {
  return (
    <div className={`mx-auto max-w-md ${className ?? ""}`}>
      <video
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="w-full rounded-xl border border-border bg-[#F7F5ED] aspect-[4/5] object-cover"
        aria-label={`Video: ${title}`}
      >
        <track kind="captions" />
      </video>
    </div>
  );
}
