"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { getJobLists } from "@/services/getJobLists";
import JobPostCard from "@/components/JobPostCard";

export default function Home() {
  // Filter required ==>  Min experience(Derived), Company name(Search), Location(Search), Remote/on-site(Fixed), Tech stack(Not included), Role(Derived), Min base pay(derived)

  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const [filters, setFilters] = useState({
    minExperience: [],
    companyName: "",
    location: "",
    remote: ["Onsite", "Remote"],
    jobRole: [],
    minBasePay: [],
  });

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
      //       jdLink: "https://weekday.works"
      // ​
      // jdUid: "cfff3d72-053c-11ef-83d3-06301d0a7178-92062"
      // ​
      // jobDetailsFromCompany: "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment."
      // ​
      // jobRole: "ios"
      // ​
      // location: "mumbai"
      // ​
      // maxExp: 11
      // ​
      // maxJdSalary: 103
      // ​
      // minExp: 9
      // ​
      // minJdSalary: 98
      // ​
      // salaryCurrencyCode: "USD"
      const result = await getJobLists(offset, 10);
      for (let i = 0; i < result.length; i++) {
        setFilters({ ...filters, minExperience: [...filters.minExperience] });
      }
      setData((prevData) => [...prevData, ...result.jdList]);
      if (result.jdList.length < 10) {
        setHasMore(false);
      }
    }

    if (hasMore) {
      fetchData();
    }
  }, [offset, hasMore]);
  console.log(data);
  return (
    <div className="h-[100vh] w-[100vw] px-[10%] overflow-auto grid grid-cols-3 gap-x-[70px] gap-y-[40px] bg-white py-4">
      {data.map((item, index) => (
        <div key={index}>
          <JobPostCard jobDetails={item} />
        </div>
      ))}
      {hasMore && <div ref={lastElementRef}>Loading...</div>}
    </div>
  );
}
