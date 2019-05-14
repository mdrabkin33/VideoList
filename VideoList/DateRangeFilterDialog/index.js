import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, withStateHandlers } from "recompose";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import DatePicker from "material-ui/DatePicker";

import {
  toggleVideoDateRangeFilterDialog,
  updateVideoListDateFilter
} from "../../../actions/ui";
import { isVideoListDateRangeDialogOpen } from "../../../selectors/ui";

DateRangeFilterDialog.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  fromDate: PropTypes.object,
  toDate: PropTypes.object,
  handleFromDateChange: PropTypes.func,
  handleToDateChange: PropTypes.func,
  clearDates: PropTypes.func
};

function DateRangeFilterDialog({
  isOpen,
  handleClose,
  handleSubmit,
  fromDate,
  toDate,
  handleFromDateChange,
  handleToDateChange,
  clearDates
}) {
  return (
    <Dialog
      title="Filter by Date Range"
      actions={[
        <FlatButton
          key="ok"
          label="Ok"
          primary={true}
          keyboardFocused={true}
          onClick={handleSubmit}
        />,
        <FlatButton
          key="cancel"
          label="Cancel"
          secondary={true}
          keyboardFocused={false}
          onClick={handleClose}
        />,
        <FlatButton key="clear" label="Clear Dates" onClick={clearDates} />
      ]}
      modal={false}
      open={isOpen}
      onRequestClose={handleClose}
    >
      <DatePicker
        hintText="From Date"
        container="inline"
        value={fromDate}
        autoOk={true}
        onChange={handleFromDateChange}
      />
      <DatePicker
        hintText="To Date"
        container="inline"
        value={toDate}
        autoOk={true}
        onChange={handleToDateChange}
      />
    </Dialog>
  );
}

const enhance = compose(
  connect(
    state => ({
      isOpen: isVideoListDateRangeDialogOpen(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          // TODO: make handleClose also clear out the date range filter (or maybe do this in the action?)
          handleClose: () => toggleVideoDateRangeFilterDialog(false),
          updateDateFilters: updateVideoListDateFilter
        },
        dispatch
      )
  ),
  withStateHandlers(
    ({ fromDate = {}, toDate = {} }) => ({
      fromDate: fromDate,
      toDate: toDate
    }),
    {
      handleFromDateChange: () => (e, date) => ({
        fromDate: date
      }),
      handleToDateChange: () => (e, date) => ({
        toDate: date
      }),
      handleSubmit: ({ fromDate, toDate }, { updateDateFilters }) => () => {
        updateDateFilters(fromDate, toDate);
      },
      clearDates: () => () => ({
        fromDate: {},
        toDate: {}
      })
    }
  )
);

export default enhance(DateRangeFilterDialog);
