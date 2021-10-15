import Head from "next/head";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>

      <div
        className="absolute overflow-auto bg-green-200 inset-0"
        id="background"
      >
        <div className="mx-16 my-8">{children}</div>
      </div>
    </>
  );
}
