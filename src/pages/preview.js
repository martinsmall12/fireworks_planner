import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PageWithPlayer from "../components/PageWithPlayer";
import Preview from "../components/Preview";


const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
      <PageWithPlayer><Preview/></PageWithPlayer>
  </Layout>
);

export default SecondPage;
