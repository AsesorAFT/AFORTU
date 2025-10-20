import * as React from 'react';
import Image from 'next/image';

export const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.05 1.05-2.48 2.04-4.33 2.04-3.87 0-7-3.13-7-7s3.13-7 7-7c1.73 0 3.26.58 4.33 1.54l2.5-2.5C18.5.48 15.82 0 12.48 0 5.88 0 .5 5.38.5 12s5.38 12 11.98 12c3.54 0 6.33-1.18 8.4-3.34 2.13-2.13 2.8-5.22 2.8-7.96 0-.85-.08-1.55-.2-2.22h-11z"
    />
  </svg>
);

interface AfortuPremiumLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const AfortuPremiumLogo: React.FC<AfortuPremiumLogoProps> = ({ 
  size = 'md', 
  animated = false, 
  className = '' 
}) => {
  const sizes = {
    sm: { width: 80, height: 80 },
    md: { width: 120, height: 120 },
    lg: { width: 180, height: 180 },
    xl: { width: 240, height: 240 }
  };

  const { width, height } = sizes[size];

  return (
    <div className={`relative ${className}`}>
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/afortu.firebasestorage.app/o/LOGO%20DE%20AFORTU.PNG?alt=media&token=2e8530a1-30d3-4c0d-974e-46451594f7fb"
        alt="AFORTU Logo"
        width={width}
        height={height}
        className={`object-contain ${animated ? 'animate-pulse' : ''} brightness-0 invert`}
        priority
      />
    </div>
  );
};
