import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import RaisedButton from "material-ui/RaisedButton";

import AsyncConfirmDialog from "../../../Components/AsyncConfirmDialog";
import { updateVideo } from "../../../actions/videos";

UpdateVideoStatusButton.propTypes = {
  video: PropTypes.object,
  updateVideo: PropTypes.func
};

function UpdateVideoStatusButton({ video, updateVideo }) {
  const status = video.status.privacyStatus;
  const buttonLabel = status === "public" ? "Make Private" : "Make Public";
  const newStatus = status === "public" ? "private" : "public";
  const newVideo = {
    ...video,
    status: {
      ...video.status,
      privacyStatus: newStatus
    }
  };
  return (
    <AsyncConfirmDialog
      openButton={
        <RaisedButton
          label={buttonLabel}
          primary={newStatus === "private" && true}
          backgroundColor={newStatus === "public" ? "#F44336" : null}
          labelColor="#FFF"
        />
      }
      dialogTitle="Video Status Update"
      onSubmit={() => updateVideo(newVideo)}
    >
      <p>
        You are about to change this video's status to {newStatus}. Click
        'Submit' to confirm, or cancel to go back.
      </p>
    </AsyncConfirmDialog>
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
  )
);

export default enhance(UpdateVideoStatusButton);
