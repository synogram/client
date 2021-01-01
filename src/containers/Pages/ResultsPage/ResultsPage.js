import React from "react";
import styles from "./ResultsPage.module.scss";
import NavBarWSeachbar from "../../../components/NavBarWSearchbar/NavBarWSeachbar";
import {connect} from "react-redux";
import * as actionTypes from "../../../store/index";
import Loading from "../../../components/Loading/Loading";
import Error from "../../../components/Error/Error";
import GraphSelection from "../../../components/GraphSelection/GraphSelection";
import TreeGraph from "../../../components/TreeGraph/TreeGraph";
class ResultsPage extends React.Component {
  componentDidMount() {
    if (this.props.searchWord) {
      this.generateSearchWordData();
    }
  }

  componentDidUpdate(prevprops, prevState) {
    if (prevprops.searchWord !== this.props.searchWord) {
      this.generateSearchWordData();
    }
  }

  generateSearchWordData() {
    this.props.getRelatedWord(this.props.searchWord);
    this.props.getSummary(this.props.searchWord);
  }

  render() {
    return (
      <div className={styles.container}>
        <NavBarWSeachbar />
        {this.props.searchWord &&
          this.props.relatedWords.length > 0 &&
          !this.props.loading && (
            <TreeGraph relatedWords={this.props.relatedWords} />
          )}
        {this.props.error && <Error />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchWord: state.general.searchWord,
    loading: state.related.loading,
    relatedWords: state.related.relatedWords,
    error: state.related.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRelatedWord: (value) => dispatch(actionTypes.getRelatedWords(value)),
    getSummary: (value) => dispatch(actionTypes.getSummary(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPage);
