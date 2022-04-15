import React, {Component} from 'react';
import './form-add-item.css';

export default class FormAddItem extends Component {

  state = {
    label: ''
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.label) {
      return;
    }
    this.props.onAddItem(this.state.label);
    this.setState({
      label: ''
    })
  }

  render () {
    return (
      <form action="" onSubmit={this.onSubmit} className='mt-3 d-flex justify-content-between'>
        <input
        className='form-control me-3'
        type="text" name="value item"
        id=""
        onChange={this.onLabelChange}
        placeholder='What needs to be done?'
        value={this.state.label}/>
        <button
        className='mt-3 btn btn-primary ps-4 pe-4' type='submit'>
          Add</button>
      </form>
    );
  }
};

