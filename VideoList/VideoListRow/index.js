import React from "react";
import PropTypes from "prop-types";
import { TableRowColumn } from "material-ui/Table";
import { Card, CardHeader } from "material-ui/Card";
import { Link } from "react-router-dom";

import VideoRowActions from "./VideoRowActions";
import VideoRowPreview from "./VideoRowPreview";
import VideoRowDescription from "./VideoRowDescription";
import VideoRowBody from "./VideoRowBody";

const style = {
  paddingTop: "30px"
};

VideoListRow.propTypes = {
  video: PropTypes.object
};

function VideoListRow({ video }) {
  const { id, snippet } = video;
  const description =
    snippet.description === ""
      ? "No description provided"
      : snippet.description;
  return (
    <React.Fragment>
      <TableRowColumn width="25%" style={style}>
        <VideoRowPreview videoId={id} />
      </TableRowColumn>
      <TableRowColumn width="70%" style={style}>
        <Card>
          <VideoRowActions video={video} />
          <CardHeader
            style={{ width: "85%" }}
            title={<Link to={`/video/${id}`}>{snippet.title}</Link>}
            subtitle={<VideoRowDescription description={description} />}
          />
          <VideoRowBody video={video} />
        </Card>
      </TableRowColumn>
    </React.Fragment>
  );
}

export default VideoListRow;
