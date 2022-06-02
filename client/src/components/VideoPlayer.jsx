import React from "react";
import ReactPlayer from "react-player";
import styled from "styled-components";

const VideoPlayer = ({ url }) => {
  return (
    <PlayerWrapper>
      <ReactPlayer
        className="react-player"
        url={url}
        width="100%"
        // playing="true"
        // loop="true"
        height="100%"
        // autoplay="true"
        controls
        muted={true}
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
        // onEnded={() => this.onEnded()}
      />
    </PlayerWrapper>
  );
};

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export default VideoPlayer;
