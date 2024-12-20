"use client";

import { useEffect, useState } from "react";
import { POSTS_QUERY } from "@/src/lib/sanity/queries";
import { client } from "@/src/lib/sanity/client";
import { Title } from "@/components/shared/Title";
import { PostCard } from "@/components/shared/PostCard";

export default function Post() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const result = await client.fetch(POSTS_QUERY);
      setPosts(result);
    }
    fetchPosts();
  }, []);

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post._id} {...post} />
        ))}
      </div>
    </main>
  );
}
