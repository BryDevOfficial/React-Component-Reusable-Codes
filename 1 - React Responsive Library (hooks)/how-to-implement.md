NPM Install: npm install react-responsive

1. useMediaQuery: This hook from react-responsive is used to detect the screen size.
Ternary Operator:
2. If the screen width is 768px or more (desktop or laptop), the "w-8" class is applied.
Otherwise, the "w-40" class is applied.

## Explanation
```bash
import { useMediaQuery } from 'react-responsive';

export const useResponsiveClass = <T extends string>(desktopClass: T, mobileClass: T): T => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 768px)'
  });

  return isDesktopOrLaptop ? desktopClass : mobileClass;
};
```
* Generic Type T: By using the generic type T, we ensure that both desktopClass and mobileClass have the same type. This prevents type errors and allows TypeScript to infer the correct type for the returned value.
* Type Safety: This approach ensures type safety and helps catch potential type errors during development..

## How To Use
```bash
import React from 'react';
import { useResponsiveClass } from './useResponsiveClass';

function MyComponent() {
  const widthClass = useResponsiveClass('w-8', 'w-40');

  return (
    <div className={widthClass}>
      {/* Your content here */}
    </div>
  );
}
```
[😎BRYAN Granse Devs Coding](https://github.com/BryanGranseCoding)
