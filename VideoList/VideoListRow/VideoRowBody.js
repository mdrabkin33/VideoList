import React from "react";
import PropTypes from "prop-types";
import Chip from "material-ui/Chip";
import { CardText } from "material-ui/Card";
import ThumbUpIcon from "material-ui/svg-icons/action/thumb-up";
import ThumbDownIcon from "material-ui/svg-icons/action/thumb-down";
import {
  duration_to_secs,
  format_date_for_video_row,
  formatDateForStatusChip
} from "../../../lib/time_utils";
import {
  pretty_print_status,
  is_video_scheduled
} from "../../../lib/video_utils";
import LinkNewTab from "../../../Components/LinkNewTab";

const style = {
  meta: {
    paddingRight: "20px",
    display: "inline-block"
  },
  reaction: {
    paddingRight: "10px"
  },
  status: {}
};

VideoRowBody.propTypes = {
  video: PropTypes.object
};

function VideoRowBody({ video }) {
  const {
    snippet,
    contentDetails,
    fileDetails,
    statistics,
    status,
    id
  } = video;
  const duration = duration_to_secs(contentDetails.duration);
  const formatted_date = format_date_for_video_row(snippet.publishedAt);
  return (
    <CardText>
      <div>
        <span>Original filename: {fileDetails.fileName}</span>
        <br />
        <LinkNewTab href={`https://youtu.be/${id}`}>
          {`https://youtu.be/${id}`}
        </LinkNewTab>
      </div>
      <div style={style.meta}>
        <span>{statistics.viewCount} views</span>
        <br />
        <span>Duration: {duration}</span>
      </div>
      <div style={style.meta}>
        <span>Uploaded on {formatted_date}</span>
        <br />
        <StatusChip video={video} />
      </div>
      <div style={style.meta}>
        <span style={style.reaction}>
          <ThumbUpIcon /> {statistics.likeCount}
        </span>
        <span style={style.reaction}>
          <ThumbDownIcon /> {statistics.dislikeCount}
        </span>
      </div>
      <div style={style.meta}>
        <span>{statistics.commentCount} comments</span>
      </div>
    </CardText>
  );
}

StatusChip.propTypes = {
  video: PropTypes.object
};
function StatusChip({ video }) {
  const isScheduled = is_video_scheduled(video);
  const status = isScheduled ? "scheduled" : video.status.privacyStatus;
  const chipText = isScheduled
    ? `Scheduled (${formatDateForStatusChip(video.status.publishAt)})`
    : pretty_print_status(video.status.privacyStatus);

  let color = "";
  let textColor = "#000";
  switch (status) {
    case "public":
      color = "#76FF03";
      break;
    case "private":
      color = "#E53935";
      textColor = "#FFF";
      break;
    case "scheduled":
      color = "#FFEE58";
      break;
    default:
      color = "#BDBDBD";
  }
  return (
    <Chip backgroundColor={color} labelColor={textColor}>
      {chipText}
    </Chip>
  );
}

export default VideoRowBody;
