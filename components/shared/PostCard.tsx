import { Author } from '@/components/shared/Author';
import { Categories } from '@/components/shared/Categories';
import { POSTS_QUERYResult } from '../../types/sanity.types';
import { PublishedAt } from '@/components/shared/PublishedAt';
import { urlFor } from '@/src/lib/sanity/image';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PostCard(props: POSTS_QUERYResult[0]) {
  const { title, author, mainImage, publishedAt, categories, slug } = props;

  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow border border-gray-200 rounded-lg overflow-hidden">
      {/* Image Section */}
      <CardHeader className="p-0">
        {mainImage ? (
          <Image
            src={urlFor(mainImage).width(700).height(400).url()}
            width={700}
            height={400}
            alt={mainImage.alt || title || ''}
            className="w-full h-48 object-cover"
          />
        ) : null}
      </CardHeader>

      {/* Content Section */}
      <CardContent className="p-4">
        <h2 className="text-xl font-bold text-red-600 uppercase group-hover:text-red-800 transition-colors">
          <Link href={`/posts/${slug?.current}`}>
            {title}
          </Link>
        </h2>
        <div className="flex items-center gap-x-4 mt-2">
          <Author author={author} />
          <PublishedAt publishedAt={publishedAt} />
        </div>
        {/* Categories (Tags) */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <span
                key={category._id}
                className="bg-gray-200 text-gray-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {category.title}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      {/* Footer with Button */}
      <CardFooter className="p-4">
        <Link href={`/posts/${slug?.current}`}>
          <Button variant="outline">Read More</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
