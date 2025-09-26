import { forwardRef, type Ref, type SVGProps } from 'react';

const ArrowLeft = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="25"
    height="24"
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_578_2493)">
      <path
        d="M15.21 6.71173C15.6 7.10173 15.6 7.73173 15.21 8.12173L11.33 12.0017L15.21 15.8817C15.6 16.2717 15.6 16.9017 15.21 17.2917C14.82 17.6817 14.19 17.6817 13.8 17.2917L9.21 12.7017C8.82 12.3117 8.82 11.6817 9.21 11.2917L13.8 6.70173C14.18 6.32173 14.82 6.32173 15.21 6.71173Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_578_2493">
        <rect
          width="24"
          height="24"
          fill="white"
          transform="matrix(-1 0 0 1 24.5 0)"
        />
      </clipPath>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(ArrowLeft);

export default ForwardRef;
