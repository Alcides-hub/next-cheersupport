

  export type ParamsType = Promise<{ id: string }>;
  
  export default async function ProfilePage({ params }: { params: ParamsType }) {
    const { id } = await params; // Await the promise to get the slug
  
    // const post = await client.fetch(POST_QUERY, { slug });
  
    // if (!post) {
    //   notFound();
    // }
  
    console.log("Params received:", params);
  
    return (
      <main>
        <h1>Welcome to the Profile Page!</h1>
        <p>User ID: {id}</p>
        <p>This is some test content to ensure the page works correctly.</p>
      </main>
    );
  }
  
