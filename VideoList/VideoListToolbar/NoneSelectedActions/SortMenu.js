import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import MenuItem from "material-ui/MenuItem";
import SortIcon from "material-ui/svg-icons/content/sort";

import PopoverMenu from "../../../../Components/PopoverMenu";
import { get_video_sort } from "../../../../selectors/ui";
import { updateSort } from "../../../../actions/ui";
import RaisedButton from "material-ui/RaisedButton/RaisedButton";

const styles = {
  root: {
    backgroundColor: "#fff"
  },
  menu_button: {
    margin: 12
  }
};

SortMenu.propTypes = {
  updateSort: PropTypes.func,
  currentVal: PropTypes.string
};

function SortMenu({ updateSort, currentVal }) {
  return (
    <PopoverMenu
      button={
        <RaisedButton
          label="Sort"
          style={styles.menu_button}
          icon={<SortIcon />}
        />
      }
      onChange={updateSort}
      value={currentVal}
      menu_items={[
        <MenuItem primaryText="Newest to Oldest" key={1} value="date_desc" />,
        <MenuItem primaryText="Oldest to Newest" key={2} value="date_asc" />,
        <MenuItem primaryText="Alphabetically" key={3} value="alpha_asc" />,
        <MenuItem
          key={4}
          primaryText="Reverse Alphabetically"
          value="alpha_desc"
        />
      ]}
    />
  );
}

const enhance = compose(
  connect(
    state => ({
      currentVal: get_video_sort(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          updateSort: updateSort
        },
        dispatch
      )
  )
);

export default enhance(SortMenu);
