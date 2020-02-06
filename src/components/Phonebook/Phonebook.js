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
    notification: false,
    notificationText: '',
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
    if (existContact) {
      this.setState({
        notification: true,
        notificationText: `Contact ${contact.name} is already exists in your phonebook!`,
      });
      setTimeout(() => {
        this.setState({
          notification: false,
        });
      }, 2000);
      return;
    }
    if (contact.name.trim() === '' || contact.number.trim() === '') {
      this.setState({
        notification: true,
        notificationText: 'Please, fill all fields!',
      });
      setTimeout(() => {
        this.setState({
          notification: false,
        });
      }, 2000);
      return;
    }
    const contactToAdd = {
      ...contact,
      id: shortid.generate(),
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contactToAdd],
    }));
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
    const { contacts, filter, notificationText, notification } = this.state;
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
          in={notification}
          timeout={2500}
          classNames={slideTransition}
          unmountOnExit
        >
          <ContactChecking notificationText={notificationText} />
        </CSSTransition>
      </div>
    );
  }
}
