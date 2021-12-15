import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import {
  heading,
  bioList,
  flavorText,
  img,
  flavorSection,
} from "../styles/home.module.css";

const IndexPage = () => {
  return (
    <Layout pageTitle="Home">
      <div className={flavorSection}>
        <StaticImage
          src="../images/cropped-portrait.jpeg"
          alt="A photo of Me"
          className={img}
        />
        <p className={flavorText}>
          👋 Hi there. I'm Brennan Manning, a recent graduate from the
          University of Amsterdam where I got my Masters' in Econometrics with a
          specialization in Financial Econometrics. Some of my academic
          interests right now are high dimensional financial time series, and
          machine learning algorithms. Outside of that, some of my hobbies are
          reading, programming, and learning. Right now, though some of my
          projects are building this website and trying to teach myself
          classical mechanics. I am also attempting to read Ulysses by James
          Joyce again.
        </p>
      </div>
      <h3 className={heading}> Bio</h3>
      <ul className={bioList}>
        <li>
          <b>1998</b>: Born in Baltimore, MD
        </li>
        <li>
          <b>2017</b>: Moved to Amsterdam, the Netherlands
        </li>
        <li>
          <b>2020</b>: Completed the Bachelors' program in Econometrics from the
          University of Amsterdam
        </li>
        <li>
          <b>2021</b>: Completed the Masters' program in Econometrics from the
          University of Amsterdam
        </li>
      </ul>
    </Layout>
  );
};

export default IndexPage;
