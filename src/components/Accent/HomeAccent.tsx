/* eslint-disable max-len */
import { StyleProps } from '@/common/style';
import * as React from 'react';

function HomeAccent({
  className,
}: React.PropsWithoutRef<StyleProps>): JSX.Element {
  return (
    <svg
      viewBox="0 0 1082 841"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_412_153)">
        <path
          d="M271.837 260.371C271.837 205.354 235.16 157.28 216.821 140.12C130.759 43.841 395.625 95.714 542.991 215.572C690.358 335.43 529.237 414.811 395.625 514.627C262.013 614.443 271.837 329.142 271.837 260.371Z"
          fill="url(#paint0_linear_412_153)"
          fillOpacity="0.5"
        />
      </g>
      <g filter="url(#filter1_f_412_153)">
        <path
          d="M701.856 283.277C760.775 278.39 809 234.84 825.748 213.676C921.211 112.957 889.188 401.217 773.921 569.683C658.653 738.149 559.329 572.653 440.564 438.431C321.799 304.21 628.207 289.387 701.856 283.277Z"
          fill="url(#paint1_linear_412_153)"
          fillOpacity="0.5"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_412_153"
          x="0"
          y="-110"
          width="801.602"
          height="845.592"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_412_153"
          />
        </filter>
        <filter
          id="filter1_f_412_153"
          x="213.515"
          y="-7.15732"
          width="868.429"
          height="848.154"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="100"
            result="effect1_foregroundBlur_412_153"
          />
        </filter>
        <linearGradient
          id="paint0_linear_412_153"
          x1="165.341"
          y1="90.2126"
          x2="508.803"
          y2="480.045"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFA31A" />
          <stop offset="1" stopColor="#FF6C1A" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_412_153"
          x1="874.622"
          y1="154.112"
          x2="487.652"
          y2="556.564"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#787DFF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default HomeAccent;
