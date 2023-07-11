import { useState, useEffect } from "react";
import { getPostsPage } from "../api/axios";

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [isError, setIsError] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    // AbortController API is provided by web browser to
    // abort any async task when the component unmounts
    // In the clean up function we call the abort method
    // from our controller which signals to stop fetching
    // data from api as component has unmounted and fetching
    // data might affect the state's application

    const controller = new AbortController();
    const { signal } = controller;
    getPostsPage(pageNum, { signal })
      .then((data) => {
        setResults((prevResults) => {
          return [...prevResults, ...data];
        });
        setIsLoading(false);
        setHasNextPage(Boolean(data.length));
      })
      .catch((e) => {
        setIsLoading(false);
        // this is the kind of error we created on purpose
        // so we can simply return from here.
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum]);
  return { results, isLoading, error, isError, hasNextPage };
};

export default usePosts;
