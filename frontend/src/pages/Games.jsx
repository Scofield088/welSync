import React from 'react';

function Games() {
  return (
    <div className="overflow-y-hidden h-screen w-screen" style={{ height: 'calc(100vh - 70px)' }}>
      <iframe
        src="https://mental-mend-aviral-2023.netlify.app/otherjs/cargame/games"
        className="w-full h-full"
        style={{ border: "none" }}

        title="Car Game"
      ></iframe>
    </div>
  );
}

export default Games;
