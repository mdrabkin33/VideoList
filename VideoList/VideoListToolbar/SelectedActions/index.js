import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import { ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";

import {
  get_num_selected_video_rows,
  get_selected_videos
} from "../../selectors";
import { updateMultipleVideos } from "../../../../actions/videos";
import PublishMultiButton from "./PublishMultiButton";
import UnpublishMultiButton from "./UnpublishMultiButton";
import ScheduleMultiButton from "./ScheduleMultiButton";

SelectedActions.propTypes = {
  numSelectedRows: PropTypes.number,
  selectedVideos: PropTypes.array,
  updateMultipleVideos: PropTypes.func
};

function SelectedActions({
  numSelectedRows,
  selectedVideos,
  updateMultipleVideos
}) {
  return (
    <React.Fragment>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text={`${numSelectedRows} Selected`} />
      </ToolbarGroup>
      <ToolbarGroup>
        <PublishMultiButton
          videos={selectedVideos}
          onConfirm={updateMultipleVideos}
        />
        <UnpublishMultiButton
          videos={selectedVideos}
          onConfirm={updateMultipleVideos}
        />
        <ScheduleMultiButton
          videos={selectedVideos}
          onConfirm={updateMultipleVideos}
        />
      </ToolbarGroup>
    </React.Fragment>
  );
}

const enhance = compose(
  connect(
    state => ({
      numSelectedRows: get_num_selected_video_rows(state),
      selectedVideos: get_selected_videos(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          updateMultipleVideos: updateMultipleVideos
        },
        dispatch
      )
  )
);

export default enhance(SelectedActions);
