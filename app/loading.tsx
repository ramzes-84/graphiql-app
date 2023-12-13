import Image from "next/image";

export default function Loading() {
  return (
    <main className="w-full flex justify-center min-h-screen">
      <Image
        src="/spinner.gif"
        width={200}
        height={200}
        alt="loading"
        className="inline-block"
      />
    </main>
  );
}
