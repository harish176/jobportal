

import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // for mobile menu

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    return (
        <div className='bg-white shadow-md sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6'>
                <div className='flex items-center justify-between w-full'>
                    <h1 className='text-2xl font-bold'>
                        Job<span className='text-[#F83002]'>Spot</span>
                    </h1>

                    {/* Mobile Menu Toggle */}
                    <div className='md:hidden'>
                        <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </div>

                {/* Desktop Menu */}
                <div className='hidden md:flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-80">
                                    <div>
                                        <div className='flex gap-2'>
                                            <Avatar>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user?.role === 'student' && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }
                </div>
            </div>

            {/* Mobile Menu Content */}
            {
                isOpen && (
                    <div className='md:hidden px-4 py-3 space-y-3 bg-white shadow-inner'>
                        <ul className='flex flex-col gap-2'>
                            {
                                user && user.role === 'recruiter' ? (
                                    <>
                                        <li><Link to="/admin/companies">Companies</Link></li>
                                        <li><Link to="/admin/jobs">Jobs</Link></li>
                                    </>
                                ) : (
                                    <>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/jobs">Jobs</Link></li>
                                        <li><Link to="/browse">Browse</Link></li>
                                    </>
                                )
                            }
                        </ul>

                        {
                            !user ? (
                                <div className='flex flex-col gap-2'>
                                    <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                                    <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6] w-full">Signup</Button></Link>
                                </div>
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    {
                                        user?.role === 'student' && (
                                            <Link to="/profile">
                                                <Button variant="ghost" className="w-full flex gap-2 items-center"><User2 /> View Profile</Button>
                                            </Link>
                                        )
                                    }
                                    <Button onClick={logoutHandler} variant="ghost" className="w-full flex gap-2 items-center">
                                        <LogOut /> Logout
                                    </Button>
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Navbar;
