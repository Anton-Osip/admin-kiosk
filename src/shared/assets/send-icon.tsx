import { forwardRef, type Ref, type SVGProps } from 'react';

const SendIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_578_2466)">
      <path
        d="M3.11665 18.7005L19.1125 11.8438C19.855 11.523 19.855 10.478 19.1125 10.1571L3.11665 3.30046C2.51165 3.03463 1.84248 3.4838 1.84248 4.13463L1.83331 8.36046C1.83331 8.8188 2.17248 9.21296 2.63081 9.26796L15.5833 11.0005L2.63081 12.7238C2.17248 12.788 1.83331 13.1821 1.83331 13.6405L1.84248 17.8663C1.84248 18.5171 2.51165 18.9663 3.11665 18.7005Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_578_2466">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
const ForwardRef = forwardRef(SendIcon);

export default ForwardRef;
