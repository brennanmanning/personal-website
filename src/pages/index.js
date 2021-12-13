import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";

const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
      <p> I made this following a tutorial</p>
      <StaticImage
        alt="Georg Washing"
        src="../images/georg.jpg"
      />
    </Layout>
  );
};

export default IndexPage;
