

import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const isResume = true;

const Profile = () => {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='max-w-4xl mx-auto my-5 px-4'>
        {/* Profile Card */}
        <div className='bg-white border border-gray-200 rounded-2xl p-6 md:p-8'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                  alt="profile"
                />
              </Avatar>
              <div>
                <h1 className='font-semibold text-xl'>{user?.fullname}</h1>
                <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
              </div>
            </div>
            <Button onClick={() => setOpen(true)} variant="outline">
              <Pen className='h-4 w-4' />
            </Button>
          </div>

          {/* Contact Info */}
          <div className='my-5 space-y-3'>
            <div className='flex items-center gap-3 text-sm text-gray-700'>
              <Mail className='h-4 w-4' />
              <span>{user?.email}</span>
            </div>
            <div className='flex items-center gap-3 text-sm text-gray-700'>
              <Contact className='h-4 w-4' />
              <span>{user?.phoneNumber}</span>
            </div>
          </div>

          {/* Skills */}
          <div className='my-5'>
            <h2 className='text-sm font-semibold mb-2'>Skills</h2>
            <div className='flex flex-wrap gap-2'>
              {
                user?.profile?.skills?.length > 0
                  ? user?.profile?.skills.map((item, index) => (
                      <Badge key={index}>{item}</Badge>
                    ))
                  : <span className='text-sm text-gray-500'>NA</span>
              }
            </div>
          </div>

          {/* Resume */}
          <div className='mt-5'>
            <Label className="text-md font-bold">Resume</Label>
            <div>
              {isResume ? (
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={user?.profile?.resume}
                  className='text-blue-600 hover:underline break-all text-sm'
                >
                  {user?.profile?.resumeOriginalName}
                </a>
              ) : (
                <span className='text-sm text-gray-500'>NA</span>
              )}
            </div>
          </div>
        </div>

        {/* Applied Jobs Section */}
        <div className='bg-white border border-gray-200 rounded-2xl my-8 p-6 md:p-8'>
          <h2 className='font-bold text-lg mb-4'>Applied Jobs</h2>
          <div className='overflow-x-auto'>
            <AppliedJobTable />
          </div>
        </div>
      </div>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  )
}

export default Profile
