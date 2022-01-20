import Navbar from "../components/Navbar";
import Head from "next/head";
import Link from "next/link";
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

export default function Blog({ allPostsData }) {
  return (
    <div className="md:mx-40 lg:mx-80">
      <Head>
        <title>Blog | Brennan Manning</title>
      </Head>
      <Navbar />
      <h1 className="text-6xl mb-4">Blog</h1>
      <div className="mt-8">
        <ul>
          {allPostsData.map(({ id, date, excerpt, title }) => (
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
