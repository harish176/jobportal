

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useSelector(store => store.auth)

  const [input, setInput] = useState({
    fullname: user?.fullname || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    bio: user?.profile?.bio || '',
    skills: user?.profile?.skills?.join(', ') || '',
    file: user?.profile?.resume || ''
  })

  const dispatch = useDispatch()

  const changeEventHandler = e => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const fileChangeHandler = e => {
    const file = e.target.files?.[0]
    setInput({ ...input, file })
  }

  const submitHandler = async e => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('fullname', input.fullname)
    formData.append('email', input.email)
    formData.append('phoneNumber', input.phoneNumber)
    formData.append('bio', input.bio)
    formData.append('skills', input.skills)
    if (input.file) {
      formData.append('file', input.file)
    }

    try {
      setLoading(true)
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })
      if (res.data.success) {
        dispatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-[425px] w-full"
        onInteractOutside={() => setOpen(false)}
      >
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 py-4">
            {[
              { id: 'fullname', label: 'Name', type: 'text', value: input.fullname },
              { id: 'email', label: 'Email', type: 'email', value: input.email },
              { id: 'phoneNumber', label: 'Number', type: 'text', value: input.phoneNumber },
              { id: 'bio', label: 'Bio', type: 'text', value: input.bio },
              { id: 'skills', label: 'Skills', type: 'text', value: input.skills }
            ].map(({ id, label, type, value }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right col-span-1">{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={value}
                  onChange={changeEventHandler}
                  className="col-span-3"
                />
              </div>
            ))}

            {/* Resume Upload */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right col-span-1">Resume</Label>
              <Input
                id="file"
                name="file"
                type="file"
                accept="application/pdf"
                onChange={fileChangeHandler}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="w-full my-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                </>
              ) : (
                'Update'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog
