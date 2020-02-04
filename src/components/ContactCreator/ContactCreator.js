import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactCreator.module.css';

export default class ContactCreator extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
  };

  state = {
    name: '',
    number: '',
    filter: '',
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onAddContact({ ...this.state });

    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;

    return (
      <div>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <label className={styles.label} htmlFor="name">
            Name
            <input
              id="name"
              className={styles.input}
              type="text"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
          </label>

          <label className={styles.label} htmlFor="number">
            Number
            <input
              id="number"
              className={styles.input}
              type="text"
              name="number"
              value={number}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit" className={styles.button}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
