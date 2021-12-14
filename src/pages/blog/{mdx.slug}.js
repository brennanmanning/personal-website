import * as React from "react";
import { graphql } from "gatsby";
import MDXRenderer from "gatsby-plugin-mdx"
import Layout from "../../components/layout";

const BlogPost = () => {
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <p>{data.mdx.frontmatter.title}</p>
      <MDXRenderer>
        {data.mdx.body}
      </MDXRender>
    </Layout>
  );
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
      body
    }
  }
`;

export default BlogPost;
