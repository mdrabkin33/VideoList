import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import PublishIcon from "material-ui/svg-icons/editor/publish";
import PropTypes from "prop-types";

import AsyncConfirmDialog from "../../../../Components/AsyncConfirmDialog";

const styles = {
  button: {
    margin: 12
  }
};

PublishMultiButton.propTypes = {
  videos: PropTypes.array,
  onConfirm: PropTypes.func
};

function PublishMultiButton({ videos, onConfirm }) {
  const newVideos = videos.map(video => ({
    ...video,
    status: { ...video.status, privacyStatus: "public" }
  }));
  return (
    <AsyncConfirmDialog
      openButton={
        <RaisedButton
          label="Publish"
          style={styles.button}
          icon={<PublishIcon />}
        />
      }
      dialogTitle="Are you sure you want to publish these videos?"
      onSubmit={() => onConfirm(newVideos)}
    >
      <p>
        You are about to make {videos.length} videos public. Click 'Submit' to
        publish, or cancel to go back.
      </p>
    </AsyncConfirmDialog>
  );
}

export default PublishMultiButton;
