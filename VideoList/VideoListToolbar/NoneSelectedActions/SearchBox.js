import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import TextField from "material-ui/TextField";
import SearchIcon from "material-ui/svg-icons/action/search";

import { updateVideoSearchTerm } from "../../../../actions/ui";
import { select_video_search_term } from "../../../../selectors/ui";

const style = {
  margin: 12
};

SearchBox.propTypes = {
  search_term: PropTypes.string,
  update_search_term: PropTypes.func
};

function SearchBox({ search_term, update_search_term }) {
  return (
    <TextField
      hintText={
        <span>
          <SearchIcon /> Search by Title
        </span>
      }
      id="search-box-controlled"
      value={search_term}
      onChange={update_search_term}
      style={style}
    />
  );
}

const enhance = compose(
  connect(
    state => ({
      search_term: select_video_search_term(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          update_search_term: e => updateVideoSearchTerm(e.target.value)
        },
        dispatch
      )
  )
);

export default enhance(SearchBox);
