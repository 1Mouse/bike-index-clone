import Image from "next/image";
import Link from "next/link";

export function NavBar() {
  return (
    <nav className='h-24 bg-black'>
      <div className='mx-auto max-w-screen-xl py-4'>
        <Link href={"/"}>
          <Image
            src={"logo.svg"}
            width={74}
            height={72}
            alt={"logo of Bike Index"}
          />
        </Link>
      </div>
    </nav>
  );
}
