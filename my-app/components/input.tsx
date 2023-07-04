interface InputProps {
    placeholder?: string
    value?: string;
    type?: string;
    disabled?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 

{/* This file is customizing our input elements for the email and password */ }

const Input: React.FC<InputProps> = ({
    placeholder,
    value,
    type,
    disabled,
    onChange
}) => {
    return (
        <input disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        type={type}
        className="
        w-full
        p-4
        bg-black
        border-4
        border-neutral-800
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        focus:border-2
        transition
        disabled: bg-neutral-900
        disabled: opacity-70
        "

        
        />
    );
}

export default Input