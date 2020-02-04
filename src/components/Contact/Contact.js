import React from 'react';
import PropTypes from 'prop-types';
import styles from './Contact.module.css';

const Contact = ({ name, number, onDeleteContact }) => (
  <div className={styles.contactBlock}>
    <p className={styles.contact}>
      {name}: {number}
    </p>
    <button className={styles.button} type="button" onClick={onDeleteContact}>
      Delete
    </button>
    <div />
  </div>
);

Contact.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default Contact;
