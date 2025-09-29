const Logo = ({ size = 20, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18 18"
    width={size}
    height={size}
    className={`${className}`}
  >
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#F758B5" />
        <stop offset="100%" stopColor="#884DFF" />
      </linearGradient>
    </defs>
    <path
      fill="url(#grad)"
      d="M0.787 12.567 6.842 9.892l3.485 2.006.704 6.583-4.295-.035.634-4.577-.74-.422-3.625 2.817-2.218-3.697Z"
    />
    <path
      fill="url(#grad)"
      d="M10.714 11.616l5.352 3.908 2.112-3.767-4.295-1.725v-.845l4.295-1.76-2.112-3.732-5.352 3.908v4.013Z"
    />
    <path
      fill="url(#grad)"
      d="M10.327 7.286l.704-6.583-4.295.07.634 4.577-.74.422-3.66-2.816L.786 6.617l6.055 2.676 3.485-2.007Z"
    />
  </svg>
);

export default Logo;
