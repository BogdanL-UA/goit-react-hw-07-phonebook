import {
  getAllContacts,
  addContact,
  deleteContact,
} from 'components/services/apiContacts';

import * as actions from './contacts-actions';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchAllContactsLoading());
      const data = await getAllContacts();
      dispatch(actions.fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(actions.fetchAllContactsError(response.data.message));
    }
  };

  return func;
};

const isDublicate = (contacts, data) => {
  const nameNormalize = data.name.toLowerCase();
  const contact = contacts.find(({ name, number }) => {
    return nameNormalize === name.toLowerCase() && number === data.number;
  });
  return Boolean(contact);
};

export const fetchAddContact = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDublicate(contacts.items, data)) {
        alert(`${data.name}:${data.number} is already exist!`);
        return false;
      }
      dispatch(actions.fetchAddContactLoading());
      const result = await addContact(data);
      dispatch(actions.fetchAddContactSuccess(result));
    } catch ({ response }) {
      dispatch(actions.fetchAddContactError(response.data.message));
    }
  };
  return func;
};

export const fetchDeleteContacts = id => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchDeleteContactLoading());
      deleteContact(id);
      dispatch(actions.fetchDeleteContactSuccess(id));
    } catch ({ response }) {
      dispatch(actions.fetchDeleteContactError(response.data.message));
    }
  };

  return func;
};
