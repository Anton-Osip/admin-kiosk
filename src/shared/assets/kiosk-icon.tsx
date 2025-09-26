import { forwardRef, type Ref, type SVGProps } from 'react';

const KioskIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="20"
    height="28"
    viewBox="0 0 20 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <path
      d="M17.0437 0.355469H2.95671C1.66541 0.355469 0.608887 1.41199 0.608887 2.70329V25.0076C0.608887 26.2989 1.66541 27.3555 2.95671 27.3555H17.0437C18.335 27.3555 19.3915 26.2989 19.3915 25.0076V2.70329C19.3915 1.41199 18.335 0.355469 17.0437 0.355469ZM7.06541 6.22503H12.935V15.0294H10.0002H7.06541V6.22503Z"
      fill="currentColor"
    />
  </svg>
);

const ForwardRef = forwardRef(KioskIcon);

export default ForwardRef;
