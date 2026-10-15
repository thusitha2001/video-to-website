export function GiftBox() {
  return (
    <span className="gift-box">
      <svg viewBox="0 0 180 168" aria-hidden="true">
        <rect className="box-body" x="36" y="74" width="108" height="78" rx="4" />
        <rect className="box-ribbon" x="80" y="74" width="20" height="78" />
        <rect className="box-ribbon" x="36" y="104" width="108" height="16" />
        <g className="box-lid">
          <rect className="box-lid-paper" x="26" y="52" width="128" height="26" rx="4" />
          <rect className="box-ribbon" x="80" y="52" width="20" height="26" />
          <path className="box-bow" d="M90 50C76 20 38 24 48 50c12-12 28-10 42 0Z" />
          <path className="box-bow" d="M90 50c14-30 52-26 42 0-12-12-28-10-42 0Z" />
          <circle className="box-knot" cx="90" cy="52" r="8" />
          <path className="box-heart" d="M90 57.2 85.2 52.8c-3.6-3.4 1.4-7.2 4.8-3.6 3.4-3.6 8.4.2 4.8 3.6Z" />
        </g>
      </svg>
    </span>
  );
}
