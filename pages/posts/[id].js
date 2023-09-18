import React from 'react'
import Head from 'next/head'

import { DataProvider, Repeater } from '@teleporthq/react-components'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'

import postsPageInitialPathsAc029Resource from '../../resources/posts-page-initial-paths-ac029'
import postsPageInitialPropsA1351Resource from '../../resources/posts-page-initial-props-a1351'

const Posts11 = (props) => {
  return (
    <>
      <div className="posts11-container">
        <Head>
          <title>Posts1 - Principal Brand Executive</title>
          <meta
            property="og:title"
            content="Posts1 - Principal Brand Executive"
          />
        </Head>
        <DataProvider
          renderSuccess={(PostsEntity) => (
            <>
              <div className="posts11-container1">
                <h1>{PostsEntity?.Title}</h1>
                <span>{PostsEntity?.Preview}</span>
                <span>{PostsEntity?.slug}</span>
                <div className="posts11-container2">
                  <Markdown>{PostsEntity?.Content}</Markdown>
                </div>
              </div>
            </>
          )}
          initialData={props.postsEntity}
          persistDataDuringLoading={true}
          key={props?.postsEntity?.id}
        />
      </div>
      <style jsx>
        {`
          .posts11-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .posts11-container1 {
            gap: 12px;
            width: 100%;
            display: flex;
            flex-direction: column;
          }
          .posts11-container2 {
            width: 100%;
            align-self: stretch;
          }
        `}
      </style>
    </>
  )
}

Posts11.defaultProps = {
  postsEntity: [],
}

Posts11.propTypes = {
  postsEntity: PropTypes.array,
}

export default Posts11

export async function getStaticPaths() {
  const response = await postsPageInitialPathsAc029Resource({})
  return {
    paths: (response?.data || []).map((item) => {
      return {
        params: {
          id: (item?.id).toString(),
        },
      }
    }),
    fallback: 'blocking',
  }
}

export async function getStaticProps(context) {
  try {
    const response = await postsPageInitialPropsA1351Resource({
      ...context?.params,
    })
    if (!response?.data?.[0]) {
      return {
        notFound: true,
      }
    }
    return {
      props: {
        postsEntity: response?.data?.[0],
        ...response?.meta,
      },
      revalidate: 60,
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
