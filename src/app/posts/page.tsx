"use client";
import { useEffect, useState } from "react";
import { POSTS_QUERY, OFFSET_BASED_POSTS_QUERY } from "@/src/lib/sanity/queries";
import { client } from "@/src/lib/sanity/client";
import { PostCard } from "@/components/shared/PostCard";
import { Pagination } from "@/components/shared/Pagination";

export default function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(1);
  const postsPerPage = 9;

  useEffect(() => {
    async function fetchPosts() {
      const start = (currentPage - 1) * postsPerPage;
      const end = start + postsPerPage;
      const result = await client.fetch(OFFSET_BASED_POSTS_QUERY, { start, end });
      setPosts(result);
      // Fetch total count of posts
      const total = await client.fetch(
        `count(*[_type == "post"])`
      );
      setTotalPosts(total);
    }
    fetchPosts();
  }, [currentPage]);




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
      <div className="py-8 mx-auto container">
     {/* Pagination */}
     <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(totalPosts / postsPerPage)}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
    </main>
  );
}