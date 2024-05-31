import React from "react";

const PostLoading = () => {
  return (
    <div className="flex items-center gap-x-4 animate-pulse">
      <div className="flex items-center gap-x-3 flex-wrap gap-y-2 w-fit">
        <div className="w-48 md:w-80 h-6 rounded-sm bg-muted" />
        <div className="w-24 md:w-40 h-6 rounded-sm bg-muted" />
      </div>
      <div className="w-10 md:w-12 h-6 rounded-sm bg-muted ml-auto shrink-0" />
    </div>
  );
};

export default PostLoading;
