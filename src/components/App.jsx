import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAddContact,
  fetchAllContacts,
} from 'redux/contacts/contacts-operations';
import { setFilter } from 'redux/filter/filter-slice';

import Contacts from './ContactsList/ContactsList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

import styles from '../components/App.module.css';

const App = () => {
  const filter = useSelector(store => store.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onAddContact = ({ name, number }) => {
    dispatch(fetchAddContact({ name, number }));
  };

  const onChangeFilter = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setFilter(value));
  };

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h2 className={styles.title}>Contacts</h2>
      <Filter value={filter} onChange={onChangeFilter} />
      <Contacts />
    </div>
  );
};

export default App;
