import useDarkMode from "../lib/useDarkMode";
import Link from "next/link";
import Image from "next/image";
import { MoonIcon, SunIcon } from "@heroicons/react/outline"
import github_logo from "../public/GitHub-Mark-32px.png"

export default function Navbar() {
  const [colorTheme, setTheme] = useDarkMode();

  return (
    <nav className="flex text-xl justify-between mt-4">
      <div className="flex">
        <Link href="/">
          <a className=" hover:underline decoration-2 dark:decoration-gray-300">Home</a>
        </Link>
        <Link href="/blog">
          <a className="ml-4 hover:underline decoration-2 dark:decoration-gray-300">Blog</a>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        {colorTheme === "light" ? (
          <SunIcon onClick={() => setTheme("light")} className="h-10 w-10 mr-4 "/>
        ) : (
          <MoonIcon onClick={() => setTheme("dark")} className="h-10 w-10 mr-4"/>
        )}
        <div className="rounded-full hover:shadow-lg hover:shadow-stone-600 dark:hover:shadow-zinc-50 dark:invert">
          <Link href="https://github.com/brennanmanning" passHref>
            <Image
              src={github_logo}
              alt="GitHub"
              height="32"
              width="32"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
