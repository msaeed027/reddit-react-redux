import React from "react";
import { connect } from "react-redux";
import Picker from "./picker/Picker";
import Posts from "./posts/Posts";
import {
  fetchPostsIfNeeded,
  selectSubreddit,
  invalidateSubreddit
} from "../redux/actions";

class App extends React.Component {
  options = ["reactjs", "backend"];

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
  }

  componentDidUpdate(prevProps) {
    // if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(fetchPostsIfNeeded(selectedSubreddit));
    // }
  }

  onChange = subreddit => {
    this.props.dispatch(selectSubreddit(subreddit));
  };

  handleRefreshClick = () => {
    const { dispatch, selectedSubreddit } = this.props;
    dispatch(invalidateSubreddit(selectedSubreddit));
    // dispatch(fetchPostsIfNeeded(selectedSubreddit));
  };

  render() {
    const { items, isFetching, selectedSubreddit, lastUpdated } = this.props;
    const isEmpty = items.length === 0;
    return (
      <>
        <Picker
          value={selectedSubreddit}
          options={this.options}
          onChange={this.onChange}
        />
        <p>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{" "}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isEmpty ? (
          isFetching ? (
            <h2>Loading...</h2>
          ) : (
            <h2>Empty</h2>
          )
        ) : (
          <Posts posts={items} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  selectedSubreddit: state.selectedSubreddit,
  ...prepareSubredditPosts(state.postsBySubreddit[state.selectedSubreddit])
});

const prepareSubredditPosts = subredditPosts =>
  subredditPosts ? subredditPosts : { isFetching: true, items: [] };

const mapDispatchToProps = dispatch => ({
  dispatch
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
