import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import slideTransition from '../../transitions/slide.module.css';
import Contact from '../Contact/Contact';
import styles from './ContactList.module.css';

const ContactList = ({ items, onDeleteContact }) =>
  items.length > 0 && (
    <TransitionGroup component="ul" className={styles.list}>
      {items.map(item => (
        <CSSTransition
          key={item.id}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <li>
            <Contact
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...item}
              onDeleteContact={() => onDeleteContact(item.id)}
            />
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );

ContactList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
