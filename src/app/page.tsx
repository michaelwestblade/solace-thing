"use client";

import { useEffect, useState } from "react";
import {Advocate} from "@/interfaces/advocate.interface";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: { target: { value: any; }; }) => {
      setSearchTerm(e.target.value);
    const searchTerm = e.target.value;
    const lowercaseSearchTerm = searchTerm.toLowerCase();

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.lastName.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.city.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.degree.toLowerCase().includes(lowercaseSearchTerm) ||
        advocate.specialties.map(s => s.toLowerCase()).some(s => s.includes(lowercaseSearchTerm)) ||
        advocate.yearsOfExperience && advocate.yearsOfExperience.toString().includes(lowercaseSearchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(advocates);
    event.preventDefault();
    setSearchTerm("");
    setFilteredAdvocates(advocates);
  };

  return (
      <main style={{margin: "24px"}}>
          <h1>Solace Advocates</h1>
          <br/>
          <br/>
          <form className="max-w-md mx-auto">
              <label htmlFor="default-search"
                     className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                      </svg>
                  </div>
                  <input type="search" id="default-search"
                         onChange={onChange}
                         value={searchTerm}
                         className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         placeholder="Filter advocates" required/>
                  <button type="submit"
                          onClick={onClick}
                          className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      Reset Search
                  </button>
              </div>
          </form>
          <br/>
          <br/>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <td className="px-6 py-3">
                      First Name
                  </td>
                  <td className="px-6 py-3">
                      Last Name
                  </td>
                  <td className="px-6 py-3">
                      City
                  </td>
                  <td className="px-6 py-3">
                      Degree
                  </td>
                  <td className="px-6 py-3">
                      Specialties
                  </td>
                  <td className="px-6 py-3">
                      Years of Experience
                  </td>
                  <td className="px-6 py-3">
                      Phone Number
                  </td>
              </tr>
              </thead>
              <tbody>
              {filteredAdvocates.map((advocate, advocateIndex) => {
                  return (
                      <tr key={`advocate-${advocate.id}`}
                          className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {advocate.firstName}
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {advocate.lastName}
                          </td>
                          <td>{advocate.city}</td>
                          <td>{advocate.degree}</td>
                          <td>
                              {advocate.specialties.map((s, specialtyIndex) => (
                                  <div key={`${s}-${advocateIndex}-${specialtyIndex}`}>{s}</div>
                              ))}
                          </td>
                          <td>{advocate.yearsOfExperience}</td>
                          <td>{advocate.phoneNumber}</td>
                      </tr>
                  );
              })}
              </tbody>
          </table>
      </main>
  );
}
