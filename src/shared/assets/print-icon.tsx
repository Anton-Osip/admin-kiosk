import { forwardRef, type Ref, type SVGProps } from 'react';

const PrintIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_101_2603)">
      <path
        d="M33.25 14H8.75C5.845 14 3.5 16.345 3.5 19.25V26.25C3.5 28.175 5.075 29.75 7 29.75H10.5V33.25C10.5 35.175 12.075 36.75 14 36.75H28C29.925 36.75 31.5 35.175 31.5 33.25V29.75H35C36.925 29.75 38.5 28.175 38.5 26.25V19.25C38.5 16.345 36.155 14 33.25 14ZM26.25 33.25H15.75C14.7875 33.25 14 32.4625 14 31.5V24.5H28V31.5C28 32.4625 27.2125 33.25 26.25 33.25ZM33.25 21C32.2875 21 31.5 20.2125 31.5 19.25C31.5 18.2875 32.2875 17.5 33.25 17.5C34.2125 17.5 35 18.2875 35 19.25C35 20.2125 34.2125 21 33.25 21ZM29.75 5.25H12.25C11.2875 5.25 10.5 6.0375 10.5 7V10.5C10.5 11.4625 11.2875 12.25 12.25 12.25H29.75C30.7125 12.25 31.5 11.4625 31.5 10.5V7C31.5 6.0375 30.7125 5.25 29.75 5.25Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_101_2603">
        <rect width="42" height="42" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(PrintIcon);

export default ForwardRef;
