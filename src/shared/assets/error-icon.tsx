import { forwardRef, type Ref, type SVGProps } from 'react';

const ErrorIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M1.72494 15.001H14.2749C15.5583 15.001 16.3583 13.6094 15.7166 12.501L9.4416 1.65938C8.79994 0.551042 7.19994 0.551042 6.55827 1.65938L0.283272 12.501C-0.358395 13.6094 0.441605 15.001 1.72494 15.001ZM7.99994 9.16771C7.5416 9.16771 7.1666 8.79271 7.1666 8.33438V6.66771C7.1666 6.20938 7.5416 5.83438 7.99994 5.83438C8.45827 5.83438 8.83327 6.20938 8.83327 6.66771V8.33438C8.83327 8.79271 8.45827 9.16771 7.99994 9.16771ZM8.83327 12.501H7.1666V10.8344H8.83327V12.501Z"
      fill="#FF1E00"
    />
  </svg>
);

const ForwardRef = forwardRef(ErrorIcon);

export default ForwardRef;
