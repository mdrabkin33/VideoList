import React from "react";
import PropTypes from "prop-types";
import FlatButton from "material-ui/FlatButton";
import { withStateHandlers } from "recompose";

const enhance = withStateHandlers(
  ({ expanded = false }) => ({
    expanded: expanded
  }),
  {
    close: () => () => ({
      expanded: false
    }),
    open: () => () => ({
      expanded: true
    })
  }
);

Description.propTypes = {
  expanded: PropTypes.bool,
  description: PropTypes.string,
  close: PropTypes.func,
  open: PropTypes.func
};

function Description({ expanded, description, close, open }) {
  if (description.length > 375 && !expanded) {
    const shortened = description.slice(0, 375) + "...";
    return (
      <span>
        {shortened} <FlatButton onClick={open} label="Show More" />
      </span>
    );
  } else if (expanded) {
    return (
      <span>
        {description} <FlatButton onClick={close} label="Show Less" />
      </span>
    );
  } else {
    return description;
  }
}

export default enhance(Description);
