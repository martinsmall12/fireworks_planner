import React from "react"
import { Link } from "gatsby"
import { connect } from 'react-redux';

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import { toggleDarkMode } from '../state/app';

const IndexPage = ({isDarkMode, dispatch}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <button
      style={isDarkMode ? { background: 'black', color: 'white' } : null}
      onClick={() => dispatch(toggleDarkMode(!isDarkMode))}>Dark mode {isDarkMode ? 'on' : 'off'}
    </button>
  </Layout>
)


export default connect(state => ({
  isDarkMode: state.app.isDarkMode
}), null)(IndexPage)

