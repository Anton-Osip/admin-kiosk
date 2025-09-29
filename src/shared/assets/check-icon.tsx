import { forwardRef, type Ref, type SVGProps } from 'react';

const CheckIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_1097_9336)">
      <path
        d="M8.24976 14.8234L5.06893 11.6426C4.71143 11.2851 4.13393 11.2851 3.77643 11.6426C3.41893 12.0001 3.41893 12.5776 3.77643 12.9351L7.60809 16.7668C7.96559 17.1243 8.54309 17.1243 8.90059 16.7668L18.5989 7.06844C18.9564 6.71094 18.9564 6.13344 18.5989 5.77594C18.2414 5.41844 17.6639 5.41844 17.3064 5.77594L8.24976 14.8234Z"
        fill="#C3FF00"
      />
    </g>
    <defs>
      <clipPath id="clip0_1097_9336">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(CheckIcon);

export default ForwardRef;
