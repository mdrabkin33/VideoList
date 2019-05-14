import React from "react";
import PropTypes from "prop-types";
import { CardActions } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { Link } from "react-router-dom";

import UpdateVideoStatusButton from "./UpdateVideoStatusButton";
import UpdateVideoStatusDropdown from "./UpdateVideoStatusDropdown";

const style = {
  float: "right"
};

VideoRowActions.propTypes = {
  video: PropTypes.object
};

function VideoRowActions({ video }) {
  const videoId = video.id;
  return (
    <CardActions style={style}>
      <UpdateVideoStatusButton video={video} />
      <UpdateVideoStatusDropdown video={video} />
      <br />
      <br />
      <Link to={`/video/${videoId}`}>
        {" "}
        <RaisedButton label="Edit" />
      </Link>
    </CardActions>
  );
}

export default VideoRowActions;
