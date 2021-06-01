import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateNote extends Component {
  state = {
    users: [],
    userSelected: [],
    title: "",
    content: "",
    date: new Date(),
  };

  async componentDidMount() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data.map((user) => user.username) });
  }

  onChangeDate = (date) => this.setState({ date });

  onInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = async (e) => e.preventDefault();

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body p-5">
          <h4>Create a Note</h4>

          {/* SELECT USER */}
          <div className="row mb-3">
            <select
              className="form-select form-select-lg"
              name="userSelected"
              onChange={this.onInputChange}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="form-floating row mb-3">
            <input
              type="text"
              className="form-control"
              name="title"
              id="title"
              placeholder="Title"
              onChange={this.onInputChange}
              required
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="form-floating row mb-3">
            <textarea
              name="content"
              className="form-control"
              placeholder="Note..."
              id="textarea"
              style={{ height: 100 + "px", resize: "none" }}
              onChange={this.onInputChange}
              required
            ></textarea>
            <label htmlFor="textarea">Comments</label>
          </div>

          <div className="row mb-3">
            <DatePicker
              className="form-control"
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>

          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-lg btn-primary float-end">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
