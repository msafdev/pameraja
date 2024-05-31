import PostContainer from "@/components/main/post-container";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.channel ? searchParams.channel : "all";

  return (
    <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <PostContainer query={query} />
    </div>
  );
}
