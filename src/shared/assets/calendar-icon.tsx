import { forwardRef, type Ref, type SVGProps } from 'react';

const CalendarIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <g clipPath="url(#clip0_593_2133)">
      <path
        d="M17.4167 3.66536H16.5V2.7487C16.5 2.24453 16.0875 1.83203 15.5833 1.83203C15.0792 1.83203 14.6667 2.24453 14.6667 2.7487V3.66536H7.33333V2.7487C7.33333 2.24453 6.92083 1.83203 6.41667 1.83203C5.9125 1.83203 5.5 2.24453 5.5 2.7487V3.66536H4.58333C3.56583 3.66536 2.75917 4.49036 2.75917 5.4987L2.75 18.332C2.75 19.3404 3.56583 20.1654 4.58333 20.1654H17.4167C18.425 20.1654 19.25 19.3404 19.25 18.332V5.4987C19.25 4.49036 18.425 3.66536 17.4167 3.66536ZM17.4167 17.4154C17.4167 17.9195 17.0042 18.332 16.5 18.332H5.5C4.99583 18.332 4.58333 17.9195 4.58333 17.4154V8.2487H17.4167V17.4154ZM6.41667 10.082H8.25V11.9154H6.41667V10.082ZM10.0833 10.082H11.9167V11.9154H10.0833V10.082ZM13.75 10.082H15.5833V11.9154H13.75V10.082Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_593_2133">
        <rect width="22" height="22" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const ForwardRef = forwardRef(CalendarIcon);

export default ForwardRef;
