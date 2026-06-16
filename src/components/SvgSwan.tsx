import React from 'react';

interface SvgSwanProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fillColor?: string;
}

export default function SvgSwan({ className = 'w-10 h-10', fillColor = '#F2602F', ...props }: SvgSwanProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="14.0 128.0 210.0 144.0"
      className={className}
      {...props}
    >
      <path
        d="M 106.0,133.0 L 130.0,134.0 L 153.0,142.0 L 164.0,149.0 L 165.0,152.0 L 169.0,153.0 L 205.0,188.0 L 219.0,199.0 L 219.0,215.0 L 215.0,213.0 L 193.0,191.0 L 181.0,182.0 L 180.0,183.0 L 181.0,182.0 L 179.0,180.0 L 173.0,178.0 L 174.0,176.0 L 163.0,167.0 L 140.0,156.0 L 124.0,153.0 L 102.0,154.0 L 77.0,159.0 L 58.0,167.0 L 51.0,167.0 L 55.0,161.0 L 67.0,155.0 L 70.0,151.0 L 78.0,147.0 L 83.0,142.0 L 106.0,133.0 Z M 20.0,147.0 L 24.0,153.0 L 28.0,166.0 L 44.0,193.0 L 65.0,216.0 L 89.0,233.0 L 107.0,241.0 L 136.0,248.0 L 171.0,248.0 L 207.0,240.0 L 219.0,232.0 L 219.0,260.0 L 192.0,266.0 L 147.0,267.0 L 113.0,260.0 L 86.0,247.0 L 58.0,226.0 L 58.0,224.0 L 41.0,206.0 L 30.0,187.0 L 22.0,168.0 L 21.0,157.0 L 19.0,154.0 L 20.0,147.0 Z"
        fill={fillColor}
        stroke="none"
        fillRule="evenodd"
      />
    </svg>
  );
}
