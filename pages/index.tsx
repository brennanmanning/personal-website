import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default function Home({
  allPostsData,
}: {
  allPostsData: { date: string; excerpt: string; title: string; id: string }[];
}) {
  return (
    <div className="mx-4 md:mx-40 lg:mx-80">
      <Head>
        <title>Home | Brennan Manning</title>
      </Head>
      <Navbar />
      <h1 className="text-6xl">Brennan Manning</h1>
      <div className="lg:flex lg:justify-between lg:items-center mt-12">
        <div className="flex justify-center lg:flex-shrink-0 brightness-110 contrast-[.85]">
          <Image
            src="/cropped-portrait.jpeg"
            alt="My Picture"
            width="300"
            height="350"
            className="rounded-full"
          />
        </div>
        <div>
          <p className="text-2xl lg:ml-8">
            Hi there. I&apos;m Brennan Manning, a recent graduate from the
            University of Amsterdam where I got my Masters&apos; in Econometrics
            with a specialization in Financial Econometrics. Usually, I&apos;m either
            reading a book or trying to teach myself something new. Right now, I
            am teaching myself Typescript and web dev while building this
            website.
          </p>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="text-3xl underline decoration-slate-900 decoration-3 mb-2 underline-offset-2 dark:decoration-gray-300">
          Bio
        </h3>
        <ul className="text-lg">
          <li>
            <b>1998</b>: Born in Baltimore, MD
          </li>
          <li>
            <b>2017</b>: Moved to Amsterdam, NL
          </li>
          <li>
            <b>2020</b>: Finished BSc. in Econometrics
          </li>
          <li>
            <b>2021</b>: Finished MSc. in Econometrics
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <h3 className="text-3xl underline decoration-slate-900 decoration-3 mb-2 underline-offset-2 dark:decoration-gray-300">
          Blog
        </h3>
        <ul className="mt-4">
          {allPostsData.slice(0, 3).map(({ id, date, excerpt, title }) => (
            <li key={id}>
              <div className="rounded-md shadow-md shadow-stone-600 py-4 text-blue-500 hover:text-blue-800 dark:shadow-zinc-900 dark:text-neutral-300 dark:hover:text-neutral-500">
                <div className="flex justify-between lg:mx-4">
                  <div>
                    <Link href={`/blog/${id}`}>
                      <a className="text-2xl">{title}</a>
                    </Link>
                  </div>
                  <div className="text-xl text-black mr-4 dark:text-gray-200">
                    {date}
                  </div>
                </div>
                <p className="mx-4 text-black dark:text-gray-200"> {excerpt}</p>
              </div>
              <div className="pb-4" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
