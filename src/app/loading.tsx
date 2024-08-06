export default function Loading() {
  return (
    <div className='flex h-[80dvh] items-center justify-center'>
      <div className='flex h-[160px] w-[160px] items-center justify-center rounded-full bg-white bg-[url("../../public/loader.svg")] bg-cover text-[14px] focus-visible:border-0 focus-visible:outline-0'>
        {"please_wait"}
      </div>
    </div>
  );
}
