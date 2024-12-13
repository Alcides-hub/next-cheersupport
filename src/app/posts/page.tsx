
/* eslint-disable @typescript-eslint/no-unused-vars */

import { POSTS_QUERY } from "@/src/lib/sanity/queries";
import { Title } from '@/components/shared/Title';
import { client } from '@/src/lib/sanity/client';
import { PostCard } from '@/components/shared/PostCard';

const options = { next: { revalidate: 60 } };

export default async function Page() {
  const posts = await client.fetch(POSTS_QUERY, {}, options);

  return (
    <main className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>投稿インデックス</Title>
      <div className="flex flex-col gap-24 py-12">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
  );
}
