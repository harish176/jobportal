

import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="text-center px-4 sm:px-6 md:px-8 py-10 bg-white">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
          No. 1 Job Hunt Website
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Search, Apply & <br />
          Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
          A modern job search platform that helps users discover opportunities and apply for jobs seamlessly.
        </p>

        <div className="flex items-center w-full max-w-2xl mx-auto shadow-md border border-gray-200 rounded-full overflow-hidden">
          <input
            type="text"
            placeholder="Find your dream jobs"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow px-4 py-2 outline-none text-sm sm:text-base"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-none rounded-r-full bg-[#6A38C2] px-4 py-2 h-full"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
