import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ value, onChangeFilter }) => (
  <div className={styles.div}>
    <label className={styles.label} htmlFor="filter">
      Find contacts by name
      <input
        id="filter"
        className={styles.input}
        type="text"
        value={value}
        onChange={onChangeFilter}
        placeholder="Enter a name..."
      />
    </label>
  </div>
);

ContactFilter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default ContactFilter;
