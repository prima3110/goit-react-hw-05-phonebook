import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactChecking.module.css';

const ContactChecking = ({ notification }) => (
  <div className={styles.div}>{notification}</div>
);

ContactChecking.propTypes = {
  notification: PropTypes.string.isRequired,
};

export default ContactChecking;
