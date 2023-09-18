import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'

import testPageResource from '../resources/test-page'

const TestPage = (props) => {
  return (
    <>
      <div className="test-page-container">
        <Head>
          <title>test-page - Principal Brand Executive</title>
          <meta
            property="og:title"
            content="test-page - Principal Brand Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(context_yomfap) => (
            <>
              <h1>{context_yomfap?.Name}</h1>
            </>
          )}
          initialData={props.contextYomfapProp}
          persistDataDuringLoading={true}
          key={props?.contextYomfapProp?.id}
        />
      </div>
      <style jsx>
        {`
          .test-page-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
        `}
      </style>
    </>
  )
}

export default TestPage

export async function getStaticProps(context) {
  try {
    const contextYomfapProp = await testPageResource({
      ...context?.params,
    })
    return {
      props: {
        contextYomfapProp: contextYomfapProp?.data?.[0],
      },
    }
  } catch (errro) {
    return {
      notFound: true,
    }
  }
}
