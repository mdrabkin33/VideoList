import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "recompose";
import Chip from "material-ui/Chip";
import { ToolbarGroup } from "material-ui/Toolbar";

import {
  getVideoFilterKeys,
  getVideoListDateFilterValues
} from "../../../../selectors/ui";
import { clearVideoFilter } from "../../../../actions/ui";
import { format_date_for_report } from "../../../../lib/time_utils";
import { prettyPrintVideoListFilterKey } from "../../../../lib/ui";

FilterChips.propTypes = {
  filters: PropTypes.array,
  onDelete: PropTypes.func,
  filterDates: PropTypes.object
};

function FilterChips({ filters, onDelete, filterDates }) {
  const chips = filters.map(filter => {
    if (
      (filter === "byDate" &&
        filterDates.fromDate !== undefined &&
        filterDates.toDate !== undefined) ||
      filter !== "byDate"
    ) {
      return (
        <Chip onRequestDelete={() => onDelete(filter)} key={filter}>
          {formatChipText(filter, filterDates)}
        </Chip>
      );
    }
  });
  return <ToolbarGroup>{chips}</ToolbarGroup>;
}

const enhance = compose(
  connect(
    state => ({
      filters: getVideoFilterKeys(state),
      filterDates: getVideoListDateFilterValues(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          onDelete: clearVideoFilter
        },
        dispatch
      )
  )
);

export default enhance(FilterChips);

function formatChipText(value, filterDates) {
  if (value === "byDate") {
    return (
      prettyPrintVideoListFilterKey(value) +
      ` ${format_date_for_report(
        filterDates.fromDate
      )} - ${format_date_for_report(filterDates.toDate)}`
    );
  } else {
    return prettyPrintVideoListFilterKey(value);
  }
}
