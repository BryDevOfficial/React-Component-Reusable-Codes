import { useMediaQuery } from 'react-responsive';

export const useResponsiveClass = <T extends string>(desktopClass: T, mobileClass: T): T => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  });

  return isDesktopOrLaptop ? desktopClass : mobileClass;
};