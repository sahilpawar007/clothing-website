import React from 'react'
import Heading from "./Heading";

interface formType {
    title: string;
    children: React.ReactNode;
}

const Form: React.FC<formType> = ({
    title, children
}) => {
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <Heading title={title} />

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    {children}
                </form>
            </div>
        </div>
    );
};

export default Form;
