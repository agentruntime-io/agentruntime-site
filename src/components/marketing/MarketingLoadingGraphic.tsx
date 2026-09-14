type MarketingLoadingGraphicProps = {
  variant: "integrations" | "cards" | "detail";
  count?: number;
};

export function MarketingLoadingCount() {
  return <span className="marketing-loading-count" aria-hidden="true" />;
}

export function MarketingLoadingGraphic({
  variant,
  count,
}: MarketingLoadingGraphicProps) {
  if (variant === "detail") {
    return (
      <div className="marketing-loading-detail" aria-busy="true" aria-label="Loading">
        <div className="marketing-loading-detail-hero" aria-hidden="true">
          <span className="marketing-loading-block marketing-loading-block-lg" />
          <span className="marketing-loading-block marketing-loading-block-md" />
          <span className="marketing-loading-block marketing-loading-block-sm" />
        </div>
        <div className="marketing-loading-detail-aside" aria-hidden="true">
          <span className="marketing-loading-block marketing-loading-block-card" />
        </div>
      </div>
    );
  }

  if (variant === "cards") {
    const cardCount = count ?? 3;
    return (
      <div
        className="marketing-grid-3 marketing-loading-graphic"
        aria-busy="true"
        aria-label="Loading"
      >
        {Array.from({ length: cardCount }).map((_, index) => (
          <div className="marketing-loading-card" aria-hidden="true" key={index}>
            <span className="marketing-loading-block marketing-loading-block-xs" />
            <span className="marketing-loading-block marketing-loading-block-md" />
            <span className="marketing-loading-block marketing-loading-block-sm" />
          </div>
        ))}
      </div>
    );
  }

  const integrationCount = count ?? 12;
  return (
    <div
      className="marketing-integration-grid marketing-loading-graphic"
      aria-busy="true"
      aria-label="Loading"
    >
      {Array.from({ length: integrationCount }).map((_, index) => (
        <div className="marketing-loading-integration-card" aria-hidden="true" key={index}>
          <span className="marketing-loading-mark" />
          <div className="marketing-loading-lines">
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}
