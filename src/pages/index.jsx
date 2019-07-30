/* eslint react/display-name: 0 */
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { useTrail } from 'react-spring'
import styled from 'styled-components'
import { Layout, ProjectItem } from '../components'

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  width: 100%;
`

const Index = ({
  data: {
    allMdx: { edges: projectEdges },
  },
  location,
}) => {
  let devProjectEdges = projectEdges.filter(project => project.node.frontmatter.projectType === 'dev');
  let designProjectEdges = projectEdges.filter(project => project.node.frontmatter.projectType === 'design');
  const devTrail = useTrail(devProjectEdges.length, {
    from: { height: '0%' },
    to: { height: '100%' },
  })
  const designTrail = useTrail(designProjectEdges.length, {
    from: { height: '0%' },
    to: { height: '100%' },
  })


  return (
    <Layout pathname={location.pathname}>
      <h2>Dev Projects</h2>
      <ListWrapper>
        {devTrail.map((style, index) => (
          <ProjectItem
            testid={`projectItem-${index}`}
            style={style}
            key={devProjectEdges[index].node.fields.slug}
            node={devProjectEdges[index].node}
          />
        ))}
      </ListWrapper>
      <h2>Design Projects</h2>
      <ListWrapper>
        {designTrail.map((style, index) => (
          <ProjectItem
            testid={`projectItem-${index}`}
            style={style}
            key={designProjectEdges[index].node.fields.slug}
            node={designProjectEdges[index].node}
          />
        ))}
      </ListWrapper>
    </Layout>
  )
}

export default Index

Index.propTypes = {
  data: PropTypes.shape({
    allMdx: PropTypes.shape({
      edges: PropTypes.array.isRequired,
    }),
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export const pageQuery = graphql`
  query IndexQuery {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceInstanceName: { eq: "projects" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            service
            color
            languages
            teamMembers
            projectType
            cover {
              childImageSharp {
                fluid(maxWidth: 850, quality: 90, traceSVG: { color: "#f3f3f3" }) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
