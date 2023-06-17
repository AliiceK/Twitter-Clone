import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import SidebarLogo from './SidebarLogo';
import SidebarItem from './SidebarItem';
import { BiLogOut } from 'react-icons/bi';
import SidebarTweetButton from './SidebarTweetButton';
import useCurrentUser from '@/hooks/useCurrentUser';
import { signOut } from 'next-auth/react';


const Sidebar = () => {
    const {data: currentUser} = useCurrentUser();
    const items = [
    {
        label: 'Home',
        href: '/',
        icon: BsHouseFill
    }, 
    {
        label: 'Notification',
        href: '/notification',
        icon: BsBellFill,
        auth: true
    },
    {
       label:'Profile',
       href: '/users/123',
       icon: FaUser,
       auth: true
    }
    ];
    {/* Here we created an array of items so that we can display them on the first column : the profile, home and notifications*/}
    return (
        <div className="col-span-1 h-full pr-4 md:pr-6">
           <div className="flex flex-col items-end">
            <div className="space-y-2 lg:w-[230px]">
                <SidebarLogo /> {/* The SidebarLogo is the little twitter sign at the top */}
                {items.map((item) => (
                    <SidebarItem 
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    auth= {item.auth}
                    />
                ))}
               { currentUser && ( <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout' />)} {/*  the sidebaritem taking 4 prameters*/}
                <SidebarTweetButton />
            </div>
           </div>

         </div>
    )
}

{/* The outermost <div> sets the column span and padding, 
the second <div> creates a flex container with column direction and aligns items to the end, 
and the innermost <div> defines the spacing and width of its child elements.*/}

export default Sidebar