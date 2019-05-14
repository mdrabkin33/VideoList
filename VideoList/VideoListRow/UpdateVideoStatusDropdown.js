import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, withStateHandlers } from "recompose";
import DownArrow from "material-ui/svg-icons/navigation/arrow-drop-down";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";

import PopoverMenu from "../../../Components/PopoverMenu";
import AsyncSubmitDialog from "../../../Components/AsyncSubmitDialog";
import { updateVideo } from "../../../actions/videos";
import { sanitizeMUIDateToUTC } from "../../../lib/time_utils";

const style = {
  float: "right"
};

UpdateVideoStatusDropdown.propTypes = {
  video: PropTypes.object,
  updateVideo: PropTypes.func,
  closeDialog: PropTypes.func,
  dialogOpen: PropTypes.bool,
  openDialog: PropTypes.func,
  newVideo: PropTypes.object,
  updateScheduleTime: PropTypes.func
};

function UpdateVideoStatusDropdown({
  closeDialog,
  updateVideo,
  dialogOpen,
  openDialog,
  newVideo,
  updateScheduleTime,
  updateScheduleDate,
  time,
  date
}) {
  return (
    <React.Fragment>
      <AsyncSubmitDialog
        dialogTitle="Update Video Status"
        dialogOpen={dialogOpen}
        onSubmit={() => updateVideo(newVideo)}
        closeDialog={closeDialog}
      >
        {newVideo.status.privacyStatus === "scheduled" ? (
          <ScheduleChangeBody
            updateScheduleTime={updateScheduleTime}
            updateScheduleDate={updateScheduleDate}
            time={time}
            date={date}
          />
        ) : (
          <p>
            You are about to change this video's status to{" "}
            {newVideo.status.privacyStatus}. Click 'Submit' to confirm, or
            cancel to go back.
          </p>
        )}
      </AsyncSubmitDialog>
      <PopoverMenu
        styles={style}
        primary={true}
        menu_items={[
          <MenuItem key="private" value="private">
            <span>Private</span>
          </MenuItem>,
          <MenuItem primaryText="Unlisted" key="unlisted" value="unlisted" />,
          <MenuItem primaryText="Public" key="public" value="public" />,
          <MenuItem primaryText="Scheduled" key="scheduled" value="scheduled" />
        ]}
        onChange={openDialog}
        button={
          <IconButton>
            <DownArrow />
          </IconButton>
        }
      />
    </React.Fragment>
  );
}

ScheduleChangeBody.propTypes = {
  updateScheduleTime: PropTypes.func,
  updateScheduleDate: PropTypes.func,
  video: PropTypes.object,
  time: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date)
};

function ScheduleChangeBody({
  updateScheduleTime,
  updateScheduleDate,
  time,
  date
}) {
  return (
    <React.Fragment>
      <p>
        You are about to schedule this video. Pick your dates below and click
        'Submit' to confirm, or cancel to go back.
      </p>
      <DatePicker
        hintText="Schedule Date"
        container="inline"
        value={date}
        autoOk={true}
        onChange={updateScheduleDate}
      />
      <TimePicker
        hintText="Schedule Time"
        container="inline"
        value={time}
        autoOk={true}
        onChange={updateScheduleTime}
      />
    </React.Fragment>
  );
}

const enhance = compose(
  connect(null, dispatch =>
    bindActionCreators(
      {
        updateVideo: updateVideo
      },
      dispatch
    )
  ),
  withStateHandlers(
    ({ video }) => ({
      newVideo: video,
      dialogOpen: false,
      time: null,
      date: null
    }),
    {
      closeDialog: () => () => ({
        dialogOpen: false
      }),
      openDialog: (_, { video }) => (_, status) => ({
        dialogOpen: true,
        newVideo: {
          ...video,
          status: {
            ...video.status,
            privacyStatus: status
          }
        }
      }),
      updateScheduleTime: ({ newVideo, date }, { video }) => (_, time) => {
        const status = newVideo ? newVideo.status : video.status;
        const updatedVideo = {
          ...video,
          status: { ...status, publishAt: sanitizeMUIDateToUTC(date, time) }
        };
        return {
          newVideo: updatedVideo,
          time: time
        };
      },
      updateScheduleDate: ({ newVideo, time }, { video }) => (_, date) => {
        const status = newVideo ? newVideo.status : video.status;
        const updatedVideo = {
          ...video,
          status: { ...status, publishAt: sanitizeMUIDateToUTC(date, time) }
        };
        return {
          newVideo: updatedVideo,
          date: date
        };
      }
    }
  )
);

export default enhance(UpdateVideoStatusDropdown);
