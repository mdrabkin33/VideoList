/**
 * Selectors specific to the VideoList page.
 *
 */
import { createSelector } from "reselect";

import { dateStringIsBetween } from "../../lib/time_utils";
import { is_video_scheduled } from "../../lib/video_utils";

import {
  get_selected_video_rows,
  get_video_sort,
  get_video_filters,
  select_video_search_term,
  getNumVisibleRows
} from "../../selectors/ui";
import { getAllIndices } from "../../selectors/indices";
import { selectAllVideos } from "../../selectors/videos";

const getIndexForCurrentSort = createSelector(
  get_video_sort,
  getAllIndices,
  (sort, indices) => {
    switch (sort) {
      case "alpha_desc":
        return [...indices.alpha].reverse(); // have to copy the array so we don't incidentally mutate it
      case "alpha_asc":
        return indices.alpha;
      case "date_asc":
        return [...indices.date].reverse();

      case "date_desc":
      default: {
        return indices.date;
      }
    }
  }
);

const selectVideosForCurrentSortIndex = createSelector(
  selectAllVideos,
  getIndexForCurrentSort,
  (videos, index) => index.map(id => videos[id])
);

const getVideosForDateFilters = createSelector(
  selectVideosForCurrentSortIndex,
  get_video_filters,
  (videos, filters) => {
    if (filters.byDate && filters.byDate.fromDate && filters.byDate.toDate) {
      return videos.filter(video =>
        dateStringIsBetween(
          video.snippet.publishedAt,
          filters.byDate.fromDate,
          filters.byDate.toDate
        )
      );
    }
    return videos;
  }
);

const getVideosForStatusAndDateFilters = createSelector(
  getVideosForDateFilters,
  get_video_filters,
  (videos, filters) => {
    let statusFilters = [];
    for (const key in filters) {
      if (key !== "byDate") {
        if (filters.hasOwnProperty(key)) {
          statusFilters.push(key);
        }
      }
    }
    if (statusFilters.length > 0) {
      return videos.filter(video => {
        const isScheduled = is_video_scheduled(video);
        let status = video.status.privacyStatus;
        if (isScheduled) {
          status = "scheduled";
        }
        let isVisible = statusFilters.includes(status);
        if (statusFilters.includes("scheduled") && isVisible === false) {
          isVisible = isScheduled;
        }
        return isVisible;
      });
    } else {
      return videos;
    }
  }
);

const getAllVideosForList = createSelector(
  getVideosForStatusAndDateFilters,
  select_video_search_term,
  (videos, searchTerm) => {
    return videos.filter(video => {
      if (searchTerm != "") {
        return video.snippet.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      } else {
        return true;
      }
    });
  }
);
export const getVisibleVideos = createSelector(
  getAllVideosForList,
  getNumVisibleRows,
  (videos, numRows) => videos.slice(0, numRows)
);

export const getNumFilteredVideos = createSelector(
  getAllVideosForList,
  videos => videos.length
);

export const get_selected_videos = createSelector(
  get_selected_video_rows,
  getVisibleVideos,
  (selected, videos) =>
    selected === "all"
      ? videos
      : selected === "none"
        ? []
        : videos.filter((v, i) => selected.includes(i))
);

export const get_num_selected_video_rows = createSelector(
  get_selected_videos,
  videos => videos.length
);
