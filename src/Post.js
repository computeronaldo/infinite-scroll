import React from "react";

const Post = React.forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  );

  // essentially what this piece of code is trying to imply
  // is that we need to have a ref to our last post as we
  // might need to do something with it so we are accessing
  // that dom node (we might do something with intersection obsv.)
  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  );

  return content;
});

export default Post;
