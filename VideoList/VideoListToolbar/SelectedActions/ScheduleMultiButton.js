import React from "react";
import PropTypes from "prop-types";
import { compose, withStateHandlers } from "recompose";
import DatePicker from "material-ui/DatePicker";
import TimePicker from "material-ui/TimePicker";
import RaisedButton from "material-ui/RaisedButton";
import ScheduleIcon from "material-ui/svg-icons/action/schedule";

import AsyncSubmitDialog from "../../../../Components/AsyncSubmitDialog";
import { sanitizeMUIDateToUTC } from "../../../../lib/time_utils";

const styles = {
  button: {
    margin: 12
  },
  inlineSelect: {
    marginRight: 10
  }
};

ScheduleMultiButton.propTypes = {
  closeDialog: PropTypes.func,
  onConfirm: PropTypes.func,
  dialogOpen: PropTypes.bool,
  openDialog: PropTypes.func,
  newVideos: PropTypes.array,
  updateScheduleTime: PropTypes.func,
  updateScheduleDate: PropTypes.func,
  time: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date)
};

function ScheduleMultiButton({
  closeDialog,
  onConfirm,
  dialogOpen,
  openDialog,
  newVideos,
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
        onSubmit={() => onConfirm(newVideos)}
        closeDialog={closeDialog}
      >
        <p>
          You are about to schedule {newVideos.length} videos. Pick your date
          and time below and click 'Submit' to confirm, or cancel to go back.
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
          onChange={updateScheduleTime}
        />
      </AsyncSubmitDialog>
      <RaisedButton
        styles={styles.button}
        primary={false}
        onClick={openDialog}
        icon={<ScheduleIcon />}
        label="Schedule"
      />
    </React.Fragment>
  );
}

const enhance = compose(
  withStateHandlers(
    ({ videos }) => ({
      newVideos: videos,
      dialogOpen: false,
      time: null,
      date: null
    }),
    {
      closeDialog: () => () => ({
        dialogOpen: false
      }),
      openDialog: (_, { videos }) => () => ({
        dialogOpen: true,
        newVideos: videos.map(video => ({
          ...video,
          status: {
            ...video.status,
            privacyStatus: "private"
          }
        }))
      }),
      updateScheduleTime: ({ newVideos, date }, { videos }) => (_, time) => ({
        newVideos: newVideos.map(video => ({
          ...video,
          status: {
            ...video.status,
            publishAt: sanitizeMUIDateToUTC(date, time)
          }
        })),
        time: time
      }),
      updateScheduleDate: ({ newVideos, time }) => (_, date) => ({
        newVideos: newVideos.map(video => ({
          ...video,
          status: {
            ...video.status,
            publishAt: sanitizeMUIDateToUTC(date, time)
          }
        })),
        date: date
      })
    }
  )
);

export default enhance(ScheduleMultiButton);
