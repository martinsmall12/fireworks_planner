import React from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql, Link} from "gatsby"
import {Container, Row, Col, Nav, Navbar} from 'react-bootstrap'

import "bootstrap/dist/css/bootstrap.min.css";
import "./layout.css"

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
      <>
        <Container fluid>
            <Row>
                <Col>
                    <Navbar bg="lighr" expand="lg">
                        <Link className="navbar-brand" to="/">PYRO SERVIS</Link>
                    <Nav defaultActiveKey="/">
                        <Nav.Item>
                            <Link className="nav-link" to="/">Domů</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link className="nav-link" to="/page-2/">Plánovač</Link>
                        </Nav.Item>
                    </Nav>
                    </Navbar>
                </Col>
            </Row>
            <Row>
                <Col>
                {children}
                </Col>
            </Row>
        </Container>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
