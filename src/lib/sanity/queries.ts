import { defineQuery } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title,
    },
    []
  ),
  author->{
    name,
    image
  },
  tags
}`);

// Query to fetch slugs for all posts
export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`)

export const POST_QUERY =
defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
}`)
  export const OFFSET_BASED_POSTS_QUERY = defineQuery(`
*[_type == "post"] | order(publishedAt desc)[$start...$end]{
  _id,
  title,
  slug,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  publishedAt,
  "categories": categories[]->{
    _id,
    title
  },
  author->{
    name,
    image
  }
}`);
