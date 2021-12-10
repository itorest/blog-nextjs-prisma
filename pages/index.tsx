import React from 'react';
import { GetStaticProps } from 'next';
import Layout from '../components/Layout';
import Head from 'next/head';

import Post, { PostProps } from '../components/Post';
import prisma from '../lib/prisma';

type Props = {
  feed: PostProps[];
};

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page">
        <h1>Public Feed</h1>
        <main>
          {props.feed.map((post) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
          cursor: pointer;
        }

        .post:hover {
          box-shadow: 10px 10px 30px #ddd;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps = async () => {
  // const feed = [
  //   {
  //     id: 1,
  //     title: 'Prisma is the perfect ORM for Next.js',
  //     content: '[Prisma](https://github.com/prisma/prisma) and Next.js go _great_ **together**!',
  //     published: false,
  //     author: {
  //       name: 'Nikolas Burk',
  //       email: 'burk@prisma.io',
  //     },
  //   },
  // ];
  const feed = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return { props: { feed } };
};
