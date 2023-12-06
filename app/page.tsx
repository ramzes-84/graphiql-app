import Link from "next/link";
import { USUAL_BTN } from "./styles/uni-classes";

export default function Home() {
  return (
    <main className="h-screen">
      <div>Welcome page</div>
      <Link href="/main" className={USUAL_BTN}>
        Main page
      </Link>
    </main>
  );
}
