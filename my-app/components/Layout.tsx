import FollowBar from "./layout/FollowBar";
import Sidebar from "./layout/Sidebar";

interface LayoutProps {
    children : React.ReactNode;
}


const Layout : React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="h-screen bg-black">
           <div className="container h-full mx-auto xl:px-30 max-w-6xl">
                <div className="grid grid-cols-4 h-full"> 
                    <Sidebar />  
                    <div className="
                    col-span-3
                    lg:col-span-2
                     border-x-[1px]
                     border-neutral-800
                    ">
                        {children}
                    </div> 
                    <FollowBar />
                </div>
            </div>
        </div>
    );
}

{/* Thsi is our Layout of the app it has 3 columns :
-- the first column i sthe column with the home, notifications icon
-- the second column is where we are going to see the tweets
-- the third column is the followbar and such*/}

export default Layout