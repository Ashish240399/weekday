"use client"
import { useEffect, useState, useRef, useCallback } from "react";
import { getJobLists } from "@/services/getJobLists";

export default function Home() {
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset((prevOffset) => prevOffset + 10);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  useEffect(() => {
    async function fetchData() {
      const result = await getJobLists(offset, 10);
      setData((prevData) => [...prevData, ...result.jdList]);
      if (result.jdList.length < 10) {
        setHasMore(false);
      }
    }

    if (hasMore) {
      fetchData();
    }
  }, [offset, hasMore]);

  return (
    <div className="h-[30vh] border border-red-600 overflow-auto">
      {data.map((item, index) => (
        <div key={index}>{item.jobRole}</div>
      ))}
      {hasMore && <div ref={lastElementRef}>Loading...</div>}
    </div>
  );
}