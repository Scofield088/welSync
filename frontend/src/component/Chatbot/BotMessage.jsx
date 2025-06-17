// BotMessage.js
import React from 'react';

const BotMessage = ({ message }) => {
    return (
        <div className="w-fit max-w-lg bg-blue-100 text-gray-900 font-medium p-4 rounded-lg shadow-md animate-slideInLeft">
            {message}
        </div>
    );
};

export default BotMessage;