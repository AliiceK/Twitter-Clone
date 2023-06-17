import useLoginModal from "@/hooks/useLoginModal";
import { useCallback, useState } from "react";
import Input from "../input";
import Modal from "../Modal";
import axios from 'axios';
import useRegisterModal from "@/hooks/UseRegisterModal";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
{/*Overall, the LoginModal component integrates the useLoginModal hook,
 state management hooks, custom Input component, and the Modal component to create a 
login modal with email and password input fields and associated functionality */}

const RegisterModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[name, setName] = useState('');
    const [username, setUsername] = useState('')
    const[isLoading, setLoading] = useState(false);

    const onToggle = useCallback(() => {
        if (isLoading) {
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal])


    const onSubmit = useCallback(async () => {
        try {
            setLoading(true);

            await axios.post('/api/register', {
                email,
                password,
                username,
                name
            });

            toast.success('Account created');


            signIn('credentials', {
                email,
                password
            }); 

            registerModal.onClose();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
           setLoading(false);
        }
    }, [registerModal, email, password, username, name])
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
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            disabled={isLoading} 
            />
            <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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


        const footerContent = (
            <div className="text-neutral-400 text-center mt-4">
                <p> Already have an account ?</p>
                <span 
                onClick={onToggle}className="text-white cursor-pointer hover:underline">
                    Sign In

                </span>
            </div>
        )
    return ( 
        <div>
            <Modal 
            disabled = {isLoading}
            isOpen= {registerModal.isOpen}
            title = "Create an account"
            actionLabel="Register"
            onClose={registerModal.onClose}
            onSubmit= {onSubmit}
            body = {bodyContent}
            footer = {footerContent}/>
        </div>
    );
}


{/*  Our bodycontent (or body )is the email and password all together */}
export default RegisterModal;