import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";

interface PostItemProps {
    data: Record<string, any>
    userId?: string;
}


const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const {data: currentUser} = useCurrentUser();

    const gotoUser = useCallback((event: any ) => {
        event.stopProgation();
        
    }, [])
    return ( 
        <div>

        </div>
     );
}
 
export default PostItem;