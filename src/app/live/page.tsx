'use client'

import React, { useState } from 'react';
import axios from 'axios';

const CreateLiveStream = () => {
  const [streamDetails, setStreamDetails] = useState(null);
  const [streamName, setStreamName] = useState('');

  const handleCreateStream = async () => {
    try {
      const response = await axios.post('/api/create-live-stream', { name: streamName });
      setStreamDetails(response.data);
    } catch (error) {
      console.error('Error creating live stream:', error);
    }
  };  

  return (
    <div>
      <h1>Create Live Stream</h1>
      <input
        type="text"
        placeholder="Stream Name"
        value={streamName}
        onChange={(e) => setStreamName(e.target.value)}
      />
      <button onClick={handleCreateStream}>Create Stream</button>
  
      {streamDetails && (
        <div>
          <h2>Stream Details</h2>
          <p>RTMP URL: {streamDetails.input.uri}</p>
          <p>Stream Key: {streamDetails.input.stream_key}</p>
          {streamDetails.outputs.map((output) => (
            <div key={output.id}>
              <p>Output Type: {output.type}</p>
              {output.type === 'hls' && (
                <p>HLS URI: <a href={output.uri}>{output.uri}</a></p>
              )}
            </div>
          ))}
          <button
            onClick={() =>
              navigator.clipboard.writeText(
                `${streamDetails.input.uri}/${streamDetails.input.stream_key}`
              )
            }
          >
            Copy Stream Details
          </button>
        </div>
      )}
    </div>
  );
}  