import React from "react"
import Home from '../components/Home.js'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Products from "../components/Products";

const ColorContext = React.createContext("yellow")

const IndexPage = () => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <ColorContext.Provider>
            <Home/>
            <Products/>
        </ColorContext.Provider>
    </Layout>
);


export default IndexPage;

