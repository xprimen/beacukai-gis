// export { default } from "@native-base/next-adapter/document";

import { getInitialProps } from '@native-base/next-adapter/document';
import { theme } from 'native-base';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

class CustomDocument extends Document {
  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <style tsx>{`
            .table-data {
              border-collapse: collapse;
              width: 100%;
            }

            .table-data td,
            .table-data th {
              
              padding: 8px;
            }

            .table-data tr:nth-child(even) {
              background-color: ${theme.colors.gray[200]};
            }

            .table-data tr:hover {
              background-color: #ddd;
            }

            .table-data th {
              padding-top: 12px;
              padding-bottom: 12px;
              background-color: ${theme.colors.blue[800]};
              color: white;
            }
          `}</style>
        </Head>
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Import the getInitialProps method and assign it to your component to ensure the react-native-web styles are used.
CustomDocument.getInitialProps = getInitialProps;

export default CustomDocument;
