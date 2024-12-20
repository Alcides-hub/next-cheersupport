
import { PortableText } from "next-sanity";
import { POST_QUERY } from '@/src/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from "next/image";
import Link from 'next/link'
import { urlFor } from "@/src/lib/sanity/image";
import { client } from '@/src/lib/sanity/client';

export type ParamsType = Promise<{ slug: string }>;

const options = { next: { revalidate: 60 } }



const customComponents = {
  types: {
    // @ts-expect-error/not-important
    image: ({ value }) => (
      <div className="flex justify-center my-6">
        <Image
          className="aspect-[2/1] object-contain"
          src={urlFor(value).width(600).height(300).quality(80).auto('format').url()}
          alt={value.alt || 'Sanity image'}
          width={600}
          height={300}
        />
      </div>
    ),
  },
};

export default async function Page({ params }: { params: ParamsType }) {
  const { slug } = await params; // Await the promise to get the slug

  const post = await client.fetch(POST_QUERY, { slug });

  if (!post) {
    notFound();
  }

  return (
    <main className="container mx-auto h-screen p-6">
      {/* <Post {...post} /> */}
       {post?.mainImage ? (
       <div className="flex justify-center items-center mb-6">
        <Image
          className="aspect-[2/1] object-contain"
          src={urlFor(post.mainImage).width(600).height(300).quality(80).auto('format').url()}
          alt={post?.mainImage?.alt || ''}
          width="600"
          height="300"
          />
        </div>
        ) : null}
      
      <h1 className="text-4xl font-bold text-balance mb-6">{post?.title}</h1>
      {post?.body ? (
        <div className="prose mb-6">
         <PortableText value={post?.body} components={customComponents}/>
        </div>
      ) : null}
      <hr />
      <div className="mt-6">
      <Link href="/posts">&larr; インデックスに戻る</Link>
      </div>
    </main>
    
  );
}
