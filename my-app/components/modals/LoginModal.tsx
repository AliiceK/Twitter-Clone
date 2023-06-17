import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../input";
import Modal from "../Modal";
import useRegisterModal from "@/hooks/UseRegisterModal";
import RegisterModal from "./RegisterModal";
import { signIn } from "next-auth/react";
{/*Overall, the LoginModal component integrates the useLoginModal hook,
 state management hooks, custom Input component, and the Modal component to create a 
login modal with email and password input fields and associated functionality */}

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLoading, setLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        loginModal.onClose();
        registerModal.onOpen();
    }, [isLoading, registerModal, loginModal])

    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            await signIn('credentials', {
                email,
                password
            })

            loginModal.onClose();
        } catch (error) {
            console.log(error);
        } finally {
           setLoading(false);
        }
    }, [loginModal, email,password])
    {/* Setting Loading State: Before performing any asynchronous operations (e.g., making an API request for login), the setLoading function is called with the argument true.
 This sets the isLoading state to true, indicating that the login process is in a loading state.*/ }



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
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={isLoading} 
            />
        </div>
    )

const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
        <p> First time using Twitter ?</p>
        <span 
        onClick={onToggle}className="text-white cursor-pointer hover:underline">
            Create an Account

        </span>
    </div>
    )
    return ( 
        <div>
            <Modal 
            disabled = {isLoading}
            isOpen= {loginModal.isOpen}
            title = "Login"
            actionLabel="Sign In"
            onClose={loginModal.onClose}
            onSubmit= {onSubmit}
            body = {bodyContent}
            footer = {footerContent}/>
        </div>
    );
}


{/*  Our bodycontent (or body )is the email and password all together */}
export default LoginModal;