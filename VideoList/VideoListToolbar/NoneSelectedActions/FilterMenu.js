import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import MenuItem from "material-ui/MenuItem";
import SortIcon from "material-ui/svg-icons/content/sort";
import RaisedButton from "material-ui/RaisedButton";

import PopoverMenu from "../../../../Components/PopoverMenu";
import { getVideoFilterKeys } from "../../../../selectors/ui";
import { updateVideoListFilters } from "../../../../actions/ui";

const styles = {
  root: {
    backgroundColor: "#fff"
  },
  menu_button: {
    margin: 12
  }
};

FilterMenu.propTypes = {
  updateFilters: PropTypes.func,
  currentVals: PropTypes.array
};

function FilterMenu({ updateFilters, currentVals }) {
  return (
    <PopoverMenu
      button={
        <RaisedButton
          label="Filter"
          style={styles.menu_button}
          icon={<SortIcon />}
        />
      }
      onChange={updateFilters}
      value={currentVals}
      multiple={true}
      menu_items={[
        <MenuItem key={1} primaryText="Private" value="private" />,
        <MenuItem key={2} primaryText="Unlisted" value="unlisted" />,
        <MenuItem key={3} primaryText="Published" value="public" />,
        <MenuItem key={4} primaryText="Scheduled" value="scheduled" />,
        <MenuItem key={5} primaryText="Date Range" value="byDate" />,
        <MenuItem key={6} primaryText="Clear All Filters" value="clearAll" />
      ]}
    />
  );
}

const enhance = compose(
  connect(
    state => ({
      currentVals: getVideoFilterKeys(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          updateFilters: updateVideoListFilters
        },
        dispatch
      )
  )
);

export default enhance(FilterMenu);
