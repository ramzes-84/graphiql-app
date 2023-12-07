import Link from "next/link";
import Image from "next/image";
import { USUAL_BTN } from "./styles/uni-classes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mx-auto my-4 p-6 rounded-xl">
      <Image src="/error.svg" alt="error" width={300} height={400} priority />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <p>
        Go to
        <Link href="/">
          <button className={USUAL_BTN}>Welcome Page</button>
        </Link>
      </p>
    </div>
  );
}
