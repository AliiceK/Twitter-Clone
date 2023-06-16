import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../input";
import Modal from "../Modal";


const LoginModal = () => {
    const loginModal = useLoginModal();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLoading, setLoading] = useState(false);


    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            loginModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
           setLoading(false);
        }
    }, [loginModal])



    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={isLoading} 
            />
            <Input
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading} 
            />
        </div>
    )
    return ( 
        <div>
            <Modal 
            disabled = {isLoading}
            isOpen= {loginModal.isOpen}
            title = "Login"
            actionLabel="SignIn"
            onClose={loginModal.onClose}
            onSubmit= {onSubmit}
            body = {bodyContent}/>
        </div>
    );
}

export default LoginModal;