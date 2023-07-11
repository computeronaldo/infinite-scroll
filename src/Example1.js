import React, { useState, useRef, useCallback } from "react";
import usePosts from "./hooks/usePosts";
import Post from "./Post";

function Example1() {
  const [pageNum, setPageNum] = useState(1);

  const { isLoading, isError, error, hasNextPage, results } = usePosts(pageNum);

  // stores a reference to intersection oberserver instance
  // here we are using useRef for intObserver as we want it
  // to persist in our infinite scroll implementation
  const intObserver = useRef();

  // lastPostRef is a callback function which is being passed
  // to last post component through ref attribute so this gives
  // access of last component dom node to this callback func
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return;

      // to make sure we remove any intersection oberserver from previous renders
      if (intObserver.current) intObserver.current.disconnect();

      // callback function of IntersectionObserver is executed
      // whenever observed element intersects with viewport

      // In the callback function posts is an IntersectionObserverEntry
      // objects array which contain info about intersection events
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log("We are near the last post!");
          setPageNum((prev) => prev + 1);
        }
      });

      // if last post component exist attach an observer to it
      // and this will trigger the callback function of IntersectionObserver
      // when itnintersects with the viewport
      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  if (isError) {
    return <p className="center">Error: {error.message}</p>;
  }

  const content = results.map((post, index) => {
    // this means we are at the last post from currently fetched results from api
    if (results.length === index + 1) {
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
