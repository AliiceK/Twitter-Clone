import {create} from 'zustand';

{/*   The isOpen state determines whether the modal is open or closed, and the onOpen and onClose actions are provided to update the state accordingly.
 Other components can import and use this useLoginModal hook to access and update the state of the login modal. */}

interface RegisterModalStore {
    isOpen: boolean;
    onOpen : ()=> void;
    onClose: ()=> void;
};

const useRegisterModal = create<RegisterModalStore>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen : true}),
    onClose: () => set({ isOpen: false}),
}))

export default useRegisterModal;