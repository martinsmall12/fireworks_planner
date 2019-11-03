import React from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"
import Typography from '@material-ui/core/Typography';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";
import pink from "@material-ui/core/colors/pink";
import CssBaseline from "@material-ui/core/CssBaseline";

import "./layout.css"

const theme = createMuiTheme({
    palette: {
        primary: {
            light: pink[300],
            main: pink[500],
            dark: pink[700]
        },
        secondary: {
            light: grey[300],
            main: grey[500],
            dark: grey[700]
        },
        type: "dark"
    }
});

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
        <ThemeProvider theme={theme}>
            <Typography component={'div'}>
                <CssBaseline />
                   {children}
            </Typography>
        </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
