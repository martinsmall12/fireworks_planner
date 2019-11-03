import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Player from "../components/Player";
import FirePlan from "../components/FirePlan";



const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
      <FirePlan />
      <Player/>
  </Layout>
);

export default SecondPage;
