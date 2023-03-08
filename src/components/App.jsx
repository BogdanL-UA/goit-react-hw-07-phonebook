import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';
import { getContacts } from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import Contacts from './Contacts/Contacts';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import styles from '../components/App.module.css';

const App = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const onAddContact = ({ name, number }) => {
    if (isDublicate(name, number)) {
      return alert(`${name}:${number} is already exist!`);
    }
    dispatch(addContact({ name, number }));
  };

  const isDublicate = (name, newNumber) => {
    const nameNormalize = name.toLowerCase();
    const contact = contacts.find(({ name, number }) => {
      return nameNormalize === name.toLowerCase() && number === newNumber;
    });
    return Boolean(contact);
  };

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  const onChangeFilter = e => {
    const { value } = e.target;
    dispatch(setFilter(value));
  };

  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    const filterLowerCase = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(filterLowerCase) ||
        number.includes(filterLowerCase)
      );
    });
    return result;
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter onChange={onChangeFilter} />
      <Contacts contacts={filteredContacts} removeContact={removeContact} />
    </div>
  );
};

export default App;
