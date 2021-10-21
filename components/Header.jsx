import Link from 'next/link';

export default function Header() {
  return (
    <header className="pl-12 pt-3 pb-1 bg-fogra w-full fixed">
      <Link href="/">
        <h1 className="text-3xl font-bold">ETH Crawler</h1>
      </Link>
    </header>
  );
}
