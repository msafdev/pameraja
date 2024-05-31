import PostContainer from "@/components/main/post-container";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = searchParams.channel ? searchParams.channel : "all";

  return (
    <div className="px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8">
      <Suspense
        fallback={
          <div className="flex flex-col gap-y-4">
            {...Array(10).map((index) => (
              <div
                key={index}
                className="flex items-center gap-x-4 [&>*]:animate-pulse"
              >
                <div className="flex items-center gap-x-3 flex-wrap gap-y-2 w-fit">
                  <div className="w-48 md:w-80 h-6 rounded-sm bg-muted animate-pulse" />
                  <div className="w-24 md:w-40 h-6 rounded-sm bg-muted animate-pulse" />
                </div>
                <div className="w-10 md:w-12 h-6 rounded-sm bg-muted animate-pulse ml-auto shrink-0" />
              </div>
            ))}
          </div>
        }
      >
        <PostContainer query={query} />
      </Suspense>
    </div>
  );
}
