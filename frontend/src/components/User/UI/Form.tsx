import React from 'react'
import Heading from "./Heading";

interface formType {
    title: string;
    children: React.ReactNode;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => any
}

const Form: React.FC<formType> = ({
    title, children, onSubmit
}) => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
            <Heading title={title} />

            <div className=" my-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-9" method="POST" onSubmit={onSubmit}>
                    {children}
                </form>
            </div>
        </div>
    );
};

export default Form;
