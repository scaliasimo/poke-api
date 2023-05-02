/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  pathPrefix: `/`,
  siteMetadata: {
    title: `Pokéapp`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-preload-fonts',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nunito\:400,500,600,800,900`],
        display: 'swap',
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'PokeAPI',
        fieldName: 'pokeAPI',
        url: 'https://graphql-pokeapi.vercel.app/api/graphql',
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/pokemon/*`] },
    },
  ],
};
