

import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-4 sm:p-5 rounded-lg shadow-md bg-white border border-gray-100 cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      {/* Company Info */}
      <div className="mb-2">
        <h1 className="font-semibold text-base sm:text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>

      {/* Job Title + Description */}
      <div className="mb-3">
        <h2 className="font-bold text-lg sm:text-xl mb-1">{job?.title}</h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position} Position{job?.position > 1 ? 's' : ''}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          ₹{job?.salary} LPA
        </Badge>
      </div>
    </div>
  )
}

export default LatestJobCards
