import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchDeleteContacts } from 'redux/contacts/contacts-operations';

import styles from '../ContactsList/Contacts.module.css';

export const Contact = ({ ID, name, number }) => {
  const dispatch = useDispatch();

  const deleteContact = id => {
    dispatch(fetchDeleteContacts(id));
  };

  return (
    <li className={styles.listItem}>
      <div className={styles.contactWrapper}>
        <span>Name: {name}</span>
        <span>Phone: {number}</span>
      </div>
      <button
        className={styles.button}
        onClick={() => deleteContact(ID)}
        type="button"
      >
        Delete
      </button>
    </li>
  );
};

Contact.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
