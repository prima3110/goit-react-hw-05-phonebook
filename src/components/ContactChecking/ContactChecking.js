import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactChecking.module.css';

const ContactChecking = ({ notificationText }) => (
  <div className={styles.div}>{notificationText}</div>
);

ContactChecking.propTypes = {
  notificationText: PropTypes.string.isRequired,
};

export default ContactChecking;
