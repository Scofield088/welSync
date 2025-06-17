// UserMessage.js
import React from 'react';

const UserMessage = ({ message }) => {
    return (
        <div className="w-fit ml-auto max-w-lg bg-gray-700 text-white font-medium p-4 rounded-lg shadow-md animate-slideInRight">
            {message}
        </div>
    );
};

export default UserMessage;