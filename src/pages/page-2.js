import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Player from "../components/Player";


const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />

      <Player/>
  </Layout>
);

export default SecondPage;
