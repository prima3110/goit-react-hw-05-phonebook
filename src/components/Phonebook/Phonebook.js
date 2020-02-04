import React, { Component } from 'react';
import shortid from 'shortid';
import { CSSTransition } from 'react-transition-group';
import styles from './Phonebook.module.css';
import slideTransition from '../../transitions/slide.module.css';
import popTransition from '../../transitions/pop.module.css';
import appearTransition from '../../transitions/appear.module.css';
import ContactCreator from '../ContactCreator/ContactCreator';
import ContactList from '../ContactList/ContactList';
import ContactFilter from '../ContactFilter/ContactFilter';
import ContactChecking from '../ContactChecking/ContactChecking';
import * as localStorage from '../../services/localStorage';

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toUpperCase().includes(filter.toUpperCase()),
  );
};

export default class Phonebook extends Component {
  state = {
    contacts: [],
    filter: '',
    flag: false,
    notification: '',
  };

  componentDidMount() {
    const contacts = localStorage.getContacts();
    if (contacts) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.saveContacts(contacts);
    }
  }

  addContact = contact => {
    const { contacts } = this.state;
    const existContact = contacts.find(
      contactInPhonebook => contactInPhonebook.name === contact.name,
    );
    const phoneNumberSplitted = contact.number.split('');
    const findOnlyNumbers = phoneNumberSplitted.filter(
      el => +el || el === '-' || el === '+' || el === ' ' || el === '0',
    );
    if (existContact) {
      this.setState({
        flag: true,
        notification: `Contact ${contact.name} is already exists in your phonebook!`,
      });
      setTimeout(() => {
        this.setState({
          flag: false,
        });
      }, 2000);
    } else if (contact.name.trim() === '' || contact.number.trim() === '') {
      this.setState({
        flag: true,
        notification: 'Please, fill all fields!',
      });
      setTimeout(() => {
        this.setState({
          flag: false,
        });
      }, 2000);
    } else if (phoneNumberSplitted.length !== findOnlyNumbers.length) {
      this.setState({
        flag: true,
        notification: 'You should enter right number format!',
      });
      setTimeout(() => {
        this.setState({
          flag: false,
        });
      }, 2000);
    } else {
      const contactToAdd = {
        ...contact,
        id: shortid.generate(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contactToAdd],
      }));
    }
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter, notification, flag } = this.state;
    const filteredContacts = filterContacts(contacts, filter);
    return (
      <div>
        <CSSTransition in appear timeout={500} classNames={appearTransition}>
          <h1 className={styles.title}>Phonebook</h1>
        </CSSTransition>
        <ContactCreator onAddContact={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <ContactFilter value={filter} onChangeFilter={this.changeFilter} />
        </CSSTransition>
        <ContactList
          items={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
        <CSSTransition
          in={flag}
          timeout={2500}
          classNames={slideTransition}
          unmountOnExit
        >
          <ContactChecking notification={notification} />
        </CSSTransition>
      </div>
    );
  }
}
