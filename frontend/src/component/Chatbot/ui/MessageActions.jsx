import React from 'react';
// import { HiOutlineClipboard, HiOutlineThumbUp, HiOutlineSpeakerWave } from 'react-icons/hi2';

const MessageActions = () => {
  return (
    <div className="flex items-center gap-2 mt-2">
      <button className="p-1 hover:bg-gray-100 rounded" aria-label="Copy message">
        {/* <HiOutlineClipboard className="w-4 h-4 text-gray-500" /> */}
      </button>
      <button className="p-1 hover:bg-gray-100 rounded" aria-label="Like message">
        {/* <HiOutlineThumbUp className="w-4 h-4 text-gray-500" /> */}
      </button>
      <button className="p-1 hover:bg-gray-100 rounded" aria-label="Dislike message">
        {/* <HiOutlineThumbDown className="w-4 h-4 text-gray-500" /> */}
      </button>
      <button className="p-1 hover:bg-gray-100 rounded" aria-label="Read aloud">
        {/* <HiOutlineSpeakerWave className="w-4 h-4 text-gray-500" /> */}
      </button>
    </div>
  );
};

export default MessageActions;
