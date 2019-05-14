import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose, lifecycle, branch, renderNothing } from "recompose";
import Table, { TableBody, TableHeader, TableRow } from "material-ui/Table";
import Waypoint from "react-waypoint";

import "../../App.css";
import withAsyncFetchStates from "../../Components/hoc/withAsyncFetchStates";
import { fetchUserChannel } from "../../actions/channels";
import {
  setupVideoListData,
  updateVideoListData,
  clearVideos
} from "../../actions/videos";
import { selectVideoRows, setNumVisibleVideoRows } from "../../actions/ui";
import { onUserLogout } from "../../actions/user";
import * as Video from "../../selectors/videos";
import * as UI from "../../selectors/ui";
import { getVisibleVideos } from "./selectors";

import VideoListToolbar from "./VideoListToolbar";
import VideoListRow from "./VideoListRow";
import DateRangeFilterDialog from "./DateRangeFilterDialog";

VideoList.propTypes = {
  selectRows: PropTypes.func,
  visibleVideos: PropTypes.array,
  loading: PropTypes.bool,
  rowsVisible: PropTypes.number,
  setNumVideosVisible: PropTypes.func,
  numVideos: PropTypes.number
};

function VideoList({
  selectRows,
  visibleVideos,
  loading,
  rowsVisible,
  setNumVideosVisible,
  numVideos
}) {
  return (
    <React.Fragment>
      <DateRangeFilterDialog />
      <Table multiSelectable={true} onRowSelection={selectRows}>
        <TableHeader>
          <TableRow>
            <VideoListToolbar />
          </TableRow>
        </TableHeader>
        <TableBody deselectOnClickaway={false}>
          {numVideos > 0 && renderVideoRows(visibleVideos)}
        </TableBody>
      </Table>
      <VideoListLazyLoader
        rowsVisible={rowsVisible}
        loading={loading}
        numVideos={numVideos}
        setNumVideosVisible={setNumVideosVisible}
      />
    </React.Fragment>
  );
}

const withVideoData = lifecycle({
  state: { loading: true },
  async componentDidMount() {
    const { fetchVideos, numVideos, fetchRecentVideos } = this.props;
    try {
      if (numVideos > 0) {
        this.setState({ loading: false });
        await fetchRecentVideos();
      } else {
        await fetchVideos();
        this.setState({ loading: false });
      }
    } catch (e) {
      this.setState({ error: e });
    }
  },
  async componentDidUpdate(prevProps) {
    if (prevProps.numVideos > 0 && this.props.numVideos === 0) {
      this.setState({
        loading: true
      });
      await this.props.fetchVideos();
    }
  }
});

const enhance = compose(
  connect(
    state => ({
      numVideos: Video.select_total_num_videos(state),
      visibleVideos: getVisibleVideos(state),
      rowsVisible: UI.getNumVisibleRows(state)
    }),
    dispatch =>
      bindActionCreators(
        {
          fetchChannel: fetchUserChannel,
          fetchVideos: setupVideoListData,
          fetchRecentVideos: updateVideoListData,
          selectRows: selectVideoRows,
          setNumVideosVisible: setNumVisibleVideoRows,
          onAuthErr: onUserLogout,
          clearVideos: clearVideos
        },
        dispatch
      )
  ),
  withVideoData,
  withAsyncFetchStates
);

const renderIfShouldLazyLoad = compose(
  branch(
    ({ loading, numVideos, rowsVisible }) =>
      loading || numVideos <= rowsVisible,
    renderNothing
  )
);

const VideoListLazyLoader = renderIfShouldLazyLoad(
  ({ rowsVisible, loading, numVideos, setNumVideosVisible }) => (
    <Waypoint onEnter={() => setNumVideosVisible(rowsVisible + 5)} />
  )
);

export default enhance(VideoList);

function renderVideoRows(videos) {
  return videos.map((video, index) => (
    <TableRow key={index} displayBorder={false}>
      <VideoListRow key={index} video={video} />
    </TableRow>
  ));
}
