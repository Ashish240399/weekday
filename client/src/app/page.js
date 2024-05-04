"use client";
import { useEffect, useState, useRef, useCallback, useReducer } from "react";
import { getJobLists } from "@/services/getJobLists";
import JobPostCard from "@/components/JobPostCard";
import MultiSelection from "@/components/MultiSelection";
import { getJobRoleArrLabel } from "@/utils/getJobRoleArrLable";
import { getJobTypeArrLabel } from "@/utils/getJobTypeArrLabel";
import { getMinExpArrLabel } from "@/utils/getMinExpArrLabels";
import { getMinSalaryArrLabel } from "@/utils/getMinSalaryArrLabel";
import SingleSelection from "@/components/SingleSelection";
import SearchBar from "@/components/SearchBar";

const initialState = {
  location: "",
  company: "",
  minExp: 0,
  minSalary: 0,
  jobType: [],
  role: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      // Only return a new object if the filter value actually changed
      if (state[action.filterName] !== action.filterValue) {
        return {
          ...state,
          [action.filterName]: action.filterValue,
        };
      }
      break;
    default:
      break;
  }
  // If there's no change, return the existing state
  return state;
}

export default function Home() {
  // Filter required ==>  Min experience(Derived), Company name(Search), Location(Search), Remote/on-site(Fixed), Tech stack(Not included), Role(Derived), Min base pay(derived)

  const [dataLoading, setDataLoading] = useState(false);
  const [totalJob, setTotalJobs] = useState(0);
  const lastJobPostCardRef = useRef();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [hasMoreData, setHasMoreData] = useState(true);
  const observer = useRef();
  const [filters, setFilters] = useState({
    minExperience: 0,
    jobType: ["onsite", "remote"],
    jobRole: [],
    minBasePay: 0,
  });
  const [minExpData, setMinExpData] = useState();
  const [minBasePay, setMinBasePay] = useState();
  const [jobRole, setJobRole] = useState();
  const [jobType, setJobType] = useState();

  const [selectedFilters, dispatch] = useReducer(reducer, initialState);

  const lastElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreData) {
            setOffset((prevOffset) => prevOffset + 10);
          }
        },
        { rootMargin: "500px" }
      );
      if (node) observer.current.observe(node);
    },
    [hasMoreData]
  );

  // Fetch data from server
  async function fetchData() {
    setDataLoading(true);
    const response = await getJobLists(offset, 10);

    // setOffset((prev) => prev + 10);
    setTotalJobs(response.totalCount);
    const jdArr = response.jdList;
    let minSalary = filters.minBasePay;
    let minExp = filters.minExperience;
    let role = [...filters.jobRole];

    // Make array to pass to the options of the React Select
    for (let i = 0; i < jdArr.length; i++) {
      if (jdArr[i].maxJdSalary && jdArr[i].maxJdSalary > minSalary) {
        const lessFromNextVal = jdArr[i].maxJdSalary % 10;
        minSalary = jdArr[i].maxJdSalary + (10 - lessFromNextVal);
      } else if (jdArr[i].minJdSalary && jdArr[i].minJdSalary > minSalary) {
        const lessFromNextVal = jdArr[i].minJdSalary % 10;
        minSalary = jdArr[i].minJdSalary + (10 - lessFromNextVal);
      }
      if (jdArr[i].minExp && jdArr[i].minExp > minExp) {
        minExp = jdArr[i].minExp;
      }
      if (role.includes(jdArr[i].jobRole) == false) {
        role.push(jdArr[i].jobRole);
      }
    }
    setFilters({
      ...filters,
      minBasePay: minSalary,
      minExperience: minExp,
      jobRole: role,
    });
    setJobRole(getJobRoleArrLabel(role));
    setJobType(getJobTypeArrLabel(filters.jobType));
    setMinExpData(getMinExpArrLabel(minExp));
    setMinBasePay(getMinSalaryArrLabel(minSalary));

    if (jdArr.length < 10) {
      setHasMoreData(false);
    }

    setDataLoading(false);
    setData((prevData) => [...prevData, ...jdArr]);
  }

  // Whenever all filter closed then make the data list empty
  useEffect(() => {
    if (
      selectedFilters.location == "" &&
      selectedFilters.company == "" &&
      selectedFilters.minExp == 0 &&
      selectedFilters.minSalary == 0 &&
      selectedFilters.jobType.length == 0 &&
      selectedFilters.role.length == 0
    ) {
      setData([]);
    }
    fetchData();
  }, [selectedFilters]);

  useEffect(() => {
    if (hasMoreData) {
      fetchData();
    }
  }, [offset, hasMore, selectedFilters, hasMoreData]);

  // Filter the data which are in view
  useEffect(() => {
    const allJdArr = [...data];
    const filterdJdArr = allJdArr.filter((job) => {
      if (
        job.location
          .toLowerCase()
          .includes(selectedFilters.location.toLowerCase()) &&
        job.companyName
          .toLowerCase()
          .includes(selectedFilters.company.toLowerCase()) &&
        selectedFilters.minExp <= job.minExp &&
        selectedFilters.minSalary <= job.maxJdSalary &&
        (selectedFilters.jobType.length === 0 ||
          selectedFilters.jobType.some(
            (type) =>
              (job.location != "remote" && type == "onsite") ||
              (job.location == "remote" && type == "remote")
          )) &&
        (selectedFilters.role.length === 0 ||
          selectedFilters.role.some((role) =>
            job.jobRole.toLowerCase().includes(role.toLowerCase())
          ))
      ) {
        return job;
      }
    });
    if (filteredData.length == 0) {
      if (offset < totalJob) {
        // setOffset((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    }
    setFilteredData(filterdJdArr);
  }, [data, selectedFilters]);

  // Check for the data present at last and call the fetch data
  useEffect(() => {
    if (lastJobPostCardRef.current) {
      const rect = lastJobPostCardRef.current.getBoundingClientRect();
      const distanceFromViewportBottom = window.innerHeight - rect.bottom;
      if (
        distanceFromViewportBottom < 100 &&
        rect.top > 10 &&
        rect.top <= window.innerHeight
      ) {
        fetchData();
      }
    }
  }, [filteredData, data]);
  return (
    <div className="h-[100vh] w-[100vw] md:px-[10%] px-[2.5%] overflow-auto relative py-4">
      <div className="z-[200] relative md:flex md:flex-wrap md:items-center md:gap-3 grid grid-cols-2 gap-3 text-[12px]">
        <MultiSelection
          name={"Role"}
          label="role"
          setValue={dispatch}
          options={jobRole}
        />
        <MultiSelection
          name="Job Type"
          label="jobType"
          setValue={dispatch}
          options={jobType}
        />
        <SingleSelection
          name="Minimum Salary"
          label="minSalary"
          setValue={dispatch}
          options={minBasePay}
        />
        <SingleSelection
          name="Minimum Experience"
          label="minExp"
          setValue={dispatch}
          options={minExpData}
        />
        <SearchBar
          name="Location"
          label="location"
          setValue={dispatch}
          value={selectedFilters.location}
        />
        <SearchBar
          name="Company"
          label="company"
          setValue={dispatch}
          value={selectedFilters.company}
        />
      </div>
      <div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[70px] gap-y-[40px] bg-white py-4">
        {filteredData.map((item, index) => (
          <div
            key={index}
            ref={index === filteredData.length - 1 ? lastJobPostCardRef : null}
          >
            <JobPostCard jobDetails={item} />
          </div>
        ))}
      </div>
      {filteredData.length == 0 && hasMore == false && (
        <div className="text-center text-[14px] text-gray-500 py-[3vh]">
          Data Not Found
        </div>
      )}
      {dataLoading && (
        <div className="text-center text-[14px] text-gray-500 py-[3vh]">
          Loading...
        </div>
      )}
      {hasMoreData && (
        <div
          className="text-center text-[14px] text-gray-500"
          ref={lastElementRef}
        ></div>
      )}
    </div>
  );
}
