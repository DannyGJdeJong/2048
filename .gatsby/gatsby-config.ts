import { GatsbyConfig } from 'gatsby';

const config: GatsbyConfig = {
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: '2048.denni.dev',
      }
    }
  ]
};

export default config;
