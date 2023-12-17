import Image from "next/image";

export default function Loading() {
  return (
    <div className="w-full grid justify-center min-h-screen">
      <Image
        src="/spinner.gif"
        width={200}
        height={200}
        alt="loading"
        priority={true}
      />
    </div>
  );
}
