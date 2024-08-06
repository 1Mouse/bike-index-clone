"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <ProgressBar
        height='6px'
        color='#533AF0'
        options={{ showSpinner: false }}
      />
    </>
  );
};
