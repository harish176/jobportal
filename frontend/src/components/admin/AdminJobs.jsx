

import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs'
import { setSearchJobByText } from '@/redux/jobSlice'

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto px-4 sm:px-6 my-10'>
        {/* Responsive header section */}
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 my-5'>
          <Input
            className="w-full sm:w-[300px]"
            placeholder="Filter by name, role"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/jobs/create")} className="w-full sm:w-auto">
            New Jobs
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  )
}

export default AdminJobs
