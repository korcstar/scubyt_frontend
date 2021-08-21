import React, { Component } from "react";
import MovieDataService from "../services/movie.service";
import CommentService from "../services/comment.service";
import Pagination from "@material-ui/lab/Pagination";
import MovieSubList from "./movies.sub.list.js";
import MovieDetail from "./movies.sub.detail.js";
import MovieSubComments from "./movies.sub.comments.js";
import CommentForm from "./movies.sub.commentForm.js";

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveMovies = this.retrieveMovies.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveMovie = this.setActiveMovie.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.submitComment = this.submitComment.bind(this);

    this.state = {
      movies: [],
      selectedMovie: null,
      currentIndex: -1,
      searchTitle: "",
      
      page: 1,
      count: 0,
      pageSize: 10,

      comments: [],
      message: "",
    };

    this.pageSizes = [10, 25, 50];
  }

  componentDidMount() {
    this.retrieveMovies();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });

    this.retrieveMovies();
  }

  getRequestParams(searchTitle, page, pageSize) {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  }

  retrieveMovies() {
    const { searchTitle, page, pageSize } = this.state;
    const params = this.getRequestParams(searchTitle, page, pageSize);

    MovieDataService.getAll(params)
      .then((response) => {
        const { movies, totalPages } = response.data;

        this.setState({
          movies: movies,
          count: totalPages,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveMovies();
    this.setState({
      selectedMovie: null,
      currentIndex: -1,
    });
  }

  setActiveMovie(movie, index) {
    this.setState({
      selectedMovie: movie,
      currentIndex: index,
      comments: null,

      message: "",
    });

    if(this.commentForm) {
      this.commentForm.clearForm();
    }

    CommentService.getAll(movie.id)
      .then((response) => {
        this.setState({
          comments: response.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  submitComment(name, comment){
    const movieID = this.state.selectedMovie.id;
    const params = {
      name: name,
      comment: comment
    };
    CommentService.create(movieID, params)
      .then((response) => {
        const { result, message, comment } = response.data;
        if (result){
          const oldComments = this.state.comments;
          params.cid = comment.cid;
          params.movie_id = comment.movie_id;

          oldComments.push(params);
          this.setState({
            comments: oldComments,
          });
        }
        else {
          /*
          this.setState({
            message: message
          });*/
        }
        return message;
      })
      .catch((e) => {
        /*
        this.setState({
          message: "some error occurred while adding the comment.",
        });
        */
        return "some error occurred while adding the comment.";
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
        currentIndex: -1,
      },
      () => {
        this.retrieveMovies();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveMovies();
      }
    );
  }

  render() {
    const {
      searchTitle,
      movies,
      selectedMovie,
      currentIndex,
      page,
      count,
      pageSize,
      comments,
    } = this.state;

    return (
      <div className="row">
        <div className="col-md-6">
          <h3>Movies</h3>
          <hr/>
          <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
          <div className="mt-3 mb-2">
            {"Movies per Page: "}
            <select onChange={this.handlePageSizeChange} value={pageSize}>
              {this.pageSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <MovieSubList 
            movies={movies}
            currentIndex={currentIndex}
            setActiveMovie={this.setActiveMovie}
          />
          <Pagination
              className="my-3"
              count={count}
              page={page}
              siblingCount={1}
              boundaryCount={1}
              variant="outlined"
              shape="rounded"
              onChange={this.handlePageChange}
            />
        </div>
        <div className="col-md-5 ml-3">
          {selectedMovie ? (
            <div className="row">
              <MovieDetail 
                selectedMovie={selectedMovie}
              />
              <hr className="wd100p"/>
              <MovieSubComments 
                comments={comments}
              />
              <hr className="wd100p"/>
              <CommentForm
                ref={(instance)=>{this.commentForm = instance}}
                //message={this.state.message}
                submitComment={this.submitComment}
              />
            </div>
          ) : (
            <div className="row">
              <br />
              <p>Please click on a movie to view the detail</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
