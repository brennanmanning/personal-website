import Navbar from "../../components/Navbar";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";

export default function Post({ postData }) {
    return (
        <>
            <Head>
                <title>{postData.title} | Brennan Manning</title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.2/dist/katex.min.css" integrity="sha384-MlJdn/WNKDGXveldHDdyRP1R4CTHr3FeuDNfhsLPYrq2t0UBkUdK2jyTnXPEK1NQ" crossOrigin="anonymous"/>
            </Head>
            <div className="md:mx-40 lg:mx-80">
                <Navbar/>
                <h1 className="text-5xl mb-4">{postData.title}</h1>
                <h3 className="text-xl text-slate-400 mb-8">{postData.date}</h3>
                <div className="prose max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths, 
        fallback: false
    } 
}

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}
