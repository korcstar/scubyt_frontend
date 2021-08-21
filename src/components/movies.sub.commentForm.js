import React, { Component } from "react";
export default class CommentForm extends Component {
    constructor(props) {
        super(props);
    
        this.onChangeCommentName = this.onChangeCommentName.bind(this);
        this.onChangeCommentText = this.onChangeCommentText.bind(this);
        this.submitComment = this.submitComment.bind(this);
    
        this.state = {
            message: "",
            commentName: "",
            commentText:""
        };    
    }
    clearForm() {
        this.setState({
            commentName: "",
            commentText: ""
        })
    }
    onChangeCommentName(e) {
        this.setState({
            commentName: e.target.value,
        });
    }
    
    onChangeCommentText(e) {
        this.setState({
            commentText: e.target.value,
        });
    }

    submitComment = () => {
        if(this.props.submitComment) {
            const msg = this.props.submitComment(this.state.commentName, this.state.commentText);
            console.log(msg);
        }
    }
    render() {
        const {message} = this.props;

        return (
            <div className="col-md-12">
                <input type="text" className="form-control" placeholder="Your Name" value={this.state.commentName} onChange={this.onChangeCommentName} required/>
                <textarea className="form-control mt-2" placeholder="Your comment" value={this.state.commentText} onChange={this.onChangeCommentText} required/>
                <span className="badge badge-danger">{message}</span>
                <button type="button" className="btn btn-primary float-right mt-3" onClick={this.submitComment}>
                    Submit
                </button>
            </div>
        )
    }
}