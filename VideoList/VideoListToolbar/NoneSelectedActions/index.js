import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "recompose";
import { ToolbarGroup, ToolbarTitle } from "material-ui/Toolbar";

// import { select_total_num_videos } from "../../../../selectors/videos";
import { getNumFilteredVideos } from "../../selectors";

import SortMenu from "./SortMenu";
import FilterMenu from "./FilterMenu";
import SearchBox from "./SearchBox";
import FilterChips from "./FilterChips";

const enhance = compose(
  connect(state => ({
    numVideos: getNumFilteredVideos(state)
  }))
);

NoneSelectedActions.propTypes = {
  numVideos: PropTypes.number
};

function NoneSelectedActions({ numVideos }) {
  return (
    <React.Fragment>
      <ToolbarGroup firstChild={true}>
        <ToolbarTitle text={`${numVideos} Results`} />
      </ToolbarGroup>
      <FilterChips />
      <ToolbarGroup>
        <SortMenu />
        <FilterMenu />
        <SearchBox />
      </ToolbarGroup>
    </React.Fragment>
  );
}

export default enhance(NoneSelectedActions);
