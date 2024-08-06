"use client";

import { useRouter } from "next-nprogress-bar";

import { Button } from "@/ui/atoms/button";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  console.error(error);
  return (
    <div className='bg-background h-[80dvh]'>
      <div className='container mb-10 flex h-full flex-col items-center justify-center'>
        <div className='w-[min(75dvw,370px)] text-center'>
          <h2 className='mb-6 text-xl'>{"Something went wrong"}</h2>
        </div>
        <Button
          onClick={() => {
            router.push("/");
          }}
        >
          {"back to home"}
        </Button>
      </div>
    </div>
  );
}
