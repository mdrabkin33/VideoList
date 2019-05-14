import React from "react";
import PropTypes from "prop-types";
import RaisedButton from "material-ui/RaisedButton";
import UnpublishIcon from "material-ui/svg-icons/action/visibility-off";

import AsyncConfirmDialog from "../../../../Components/AsyncConfirmDialog";

const styles = {
  button: {
    margin: 12
  }
};

UnpublishMultiButton.propTypes = {
  videos: PropTypes.array,
  onConfirm: PropTypes.func
};

function UnpublishMultiButton({ videos, onConfirm }) {
  const newVideos = videos.map(video => ({
    ...video,
    status: { ...video.status, privacyStatus: "private" }
  }));
  return (
    <AsyncConfirmDialog
      openButton={
        <RaisedButton
          label="Un-Publish"
          style={styles.button}
          icon={<UnpublishIcon />}
        />
      }
      dialogTitle="Are you sure you want to make these videos private?"
      onSubmit={() => onConfirm(newVideos)}
    >
      <p>
        You are about to make {videos.length} videos private. Click 'Submit' to
        make private, or cancel to go back.
      </p>
    </AsyncConfirmDialog>
  );
}

export default UnpublishMultiButton;
