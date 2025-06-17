import React from 'react';
import 'aframe';

export function ARMeditationRoom() {
  return (
    <div className="ar-container h-screen w-full">
      <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
        {/* Sky */}
        <a-sky color="#ECECEC"></a-sky>

        {/* Floor */}
        <a-plane position="0 0 0" rotation="-90 0 0" width="30" height="30" color="#7BC8A4"></a-plane>

        {/* Meditation cushion */}
        <a-cylinder position="0 0.5 -3" radius="0.5" height="0.1" color="#FFC65D"></a-cylinder>

        {/* Plants */}
        <a-cone position="-2 0 -3" radius-bottom="0.5" radius-top="0" height="1.5" color="#4CAF50"></a-cone>
        <a-cone position="2 0 -3" radius-bottom="0.5" radius-top="0" height="1.5" color="#4CAF50"></a-cone>

        {/* Candles */}
        <a-cylinder position="-1 0 -2" radius="0.1" height="0.3" color="#FFA500"></a-cylinder>
        <a-cylinder position="1 0 -2" radius="0.1" height="0.3" color="#FFA500"></a-cylinder>

        {/* Ambient light */}
        <a-light type="ambient" color="#BBB"></a-light>

        {/* Directional light */}
        <a-light type="directional" color="#FFF" intensity="0.6" position="-0.5 1 1"></a-light>

        {/* Camera and Cursor */}
        <a-entity camera look-controls>
          <a-cursor></a-cursor>
        </a-entity>
      </a-scene>
    </div>
  );
}
