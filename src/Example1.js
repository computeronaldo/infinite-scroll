import React, { useState, useRef } from "react";
import usePosts from "./hooks/usePosts";
import Post from "./Post";

function Example1() {
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, isError, error, hasNextPage, results } = usePosts(pageNum);

  const lastPostRef = useRef();

  if (isError) {
    return <p className="center">Error: {error.message}</p>;
  }

  const content = results.map((post, index) => {
    // this means we are at the last post from currently fetched results from api
    if (post.length === index + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />;
    }
    return <Post key={post.id} post={post} />;
  });

  return (
    <>
      <h1 id="top">
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 1 - React only
      </h1>
      {content}
      {isLoading && <p className="center">Loading more posts....</p>}
      <p className="center">
        <a href="#top">Back to Top</a>
      </p>
    </>
  );
}

export default Example1;
