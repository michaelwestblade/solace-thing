"use client";

import { useEffect, useState } from "react";
import {Advocate} from "@/interfaces/advocate.interface";
import {Search} from "@/app/components/Search";
import {AdvocateList} from "@/app/components/AdvocateList";

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
          <Search onChange={onChange} onClick={onClick} searchTerm={searchTerm}/>
          <br/>
          <br/>
          <AdvocateList filteredAdvocates={filteredAdvocates}/>
      </main>
  );
}
