import Link from "next/link";

export default async function Home() {
  return (
    <div className='bg-background h-[80dvh]'>
      <div className='container mb-10 flex h-full flex-col items-center justify-center'>
        <div className='w-[min(75dvw,370px)] text-center'>
          <h1 className='mb-6 text-xl'>{"a placeholder for the homepage"}</h1>
        </div>
        <Link
          href={`/bikes`}
          className={"bg-purple/80 px-5 py-2.5 text-white hover:bg-purple/90"}
        >
          go to browse bikes
        </Link>
      </div>
    </div>
  );
}
