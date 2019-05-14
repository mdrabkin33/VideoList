import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { connect } from "react-redux";
import { TableHeaderColumn } from "material-ui/Table";
import { Toolbar } from "material-ui/Toolbar";

import { get_num_selected_video_rows } from "../selectors";

import SelectedActions from "./SelectedActions";
import NoneSelectedActions from "./NoneSelectedActions";

const styles = {
  root: {
    backgroundColor: "#fff"
  }
};

VideoListToolbar.propTypes = {
  numSelectedRows: PropTypes.number
};

function VideoListToolbar({ numSelectedRows }) {
  return (
    <TableHeaderColumn>
      <Toolbar style={styles.root}>
        {numSelectedRows > 0 ? <SelectedActions /> : <NoneSelectedActions />}
      </Toolbar>
    </TableHeaderColumn>
  );
}

const enhance = compose(
  connect(state => ({
    numSelectedRows: get_num_selected_video_rows(state)
  }))
);

export default enhance(VideoListToolbar);
