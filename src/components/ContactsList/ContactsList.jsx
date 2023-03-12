import { useSelector } from 'react-redux';

import { Contact } from './Contact';

import styles from '../ContactsList/Contacts.module.css';

export const ContactList = () => {
  const contacts = useSelector(store => store.contacts.items);
  const filter = useSelector(store => store.filter);

  const filterContacts = () => {
    if (!filter) {
      return contacts;
    }

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const contactsList = filterContacts();

  return (
    <div className={styles.contacts}>
      <ol className={styles.contactsList}>
        {contactsList.map(({ id, name, number }) => {
          return <Contact key={id} name={name} number={number} ID={id} />;
        })}
      </ol>
    </div>
  );
};

export default ContactList;
