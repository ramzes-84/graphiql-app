import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full flex justify-center min-h-screen">
      <Image
        src="/spinner.gif"
        width={200}
        height={200}
        alt="loading"
        className="inline-block w-56 h-56"
      />
    </div>
  );
}
