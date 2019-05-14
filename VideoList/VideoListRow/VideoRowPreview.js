import React from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";
import YouTubePlayer from "react-player/lib/players/YouTube";

const style = {
  wrapper: {
    position: "relative",
    paddingTop: "56.25%",
    height: 0
  },
  player: {
    position: "absolute",
    top: 0,
    left: 0
  }
};

VideoRowPreview.propTypes = {
  videoId: PropTypes.string
};

function VideoRowPreview({ videoId }) {
  return (
    <LazyLoad unmountIfInvisible={true} height={200}>
      {/* <img src={video.snippet.thumbnails.medium.url} /> */}
      <div style={style.wrapper}>
        <YouTubePlayer
          url={`https://youtu.be/${videoId}`}
          width="100%"
          height="100%"
          style={style.player}
        />
      </div>
    </LazyLoad>
  );
}

export default VideoRowPreview;
