

import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'

const shortlistingStatus = ['Accepted', 'Rejected']

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application)

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      )
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <Table>
        <TableCaption>A list of recently applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applicants?.applications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="whitespace-nowrap">{item?.applicant?.fullname}</TableCell>
              <TableCell className="whitespace-nowrap text-sm truncate max-w-[160px]">
                {item?.applicant?.email}
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm">
                {item?.applicant?.phoneNumber}
              </TableCell>
              <TableCell className="whitespace-nowrap text-blue-600 text-sm max-w-[180px] truncate">
                {item.applicant?.profile?.resume ? (
                  <a
                    href={item?.applicant?.profile?.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {item?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap text-sm">
                {item?.applicant?.createdAt?.split('T')[0]}
              </TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="cursor-pointer" />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((status, index) => (
                      <div
                        key={index}
                        onClick={() => statusHandler(status, item?._id)}
                        className="flex items-center py-1 cursor-pointer hover:text-primary"
                      >
                        {status}
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ApplicantsTable
