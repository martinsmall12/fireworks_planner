import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FirePlan from "../components/FirePlan";
import PageWithPlayer from "../components/PageWithPlayer";


const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
      <PageWithPlayer><FirePlan /></PageWithPlayer>
  </Layout>
);

export default SecondPage;
