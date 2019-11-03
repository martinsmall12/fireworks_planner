import React from "react"
import {connect} from 'react-redux';
import Preview from '../components/Preview.js'

import Layout from "../components/layout"
import SEO from "../components/seo"

const ColorContext = React.createContext("yellow")

const IndexPage = ({isDarkMode, dispatch}) => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <ColorContext.Provider>
            <Preview/>
        </ColorContext.Provider>
    </Layout>
)


export default connect(state => ({
    isDarkMode: state.app.isDarkMode
}), null)(IndexPage)

