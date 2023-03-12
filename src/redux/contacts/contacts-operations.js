import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAllContacts,
  addContact,
  deleteContact,
} from 'components/services/apiContacts';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetch-all',
  async (_, thunkAPI) => {
    try {
      const data = await getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data.message);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContact(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  },
  {
    condition: ({ name }, { getState }) => {
      const { contacts } = getState();
      if (contacts.items.find(contact => contact.name === name)) {
        alert(`${name} is already in contacts`);
        return false;
      }
    },
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      await deleteContact(id);
      return id;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

// export const fetchAllContacts = () => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.fetchAllContactsLoading());
//       const data = await getAllContacts();
//       dispatch(actions.fetchAllContactsSuccess(data));
//     } catch ({ response }) {
//       dispatch(actions.fetchAllContactsError(response.data.message));
//     }
//   };

//   return func;
// };

// const isDublicate = (contacts, data) => {
//   const nameNormalize = data.name.toLowerCase();
//   const contact = contacts.find(({ name, number }) => {
//     return nameNormalize === name.toLowerCase() && number === data.number;
//   });
//   return Boolean(contact);
// };

// export const fetchAddContact = data => {
//   const func = async (dispatch, getState) => {
//     try {
//       const { contacts } = getState();
//       if (isDublicate(contacts.items, data)) {
//         alert(`${data.name}:${data.number} is already exist!`);
//         return false;
//       }
//       dispatch(actions.fetchAddContactLoading());
//       const result = await addContact(data);
//       dispatch(actions.fetchAddContactSuccess(result));
//     } catch ({ response }) {
//       dispatch(actions.fetchAddContactError(response.data.message));
//     }
//   };
//   return func;
// };

// export const fetchDeleteContacts = id => {
//   const func = async dispatch => {
//     try {
//       dispatch(actions.fetchDeleteContactLoading());
//       deleteContact(id);
//       dispatch(actions.fetchDeleteContactSuccess(id));
//     } catch ({ response }) {
//       dispatch(actions.fetchDeleteContactError(response.data.message));
//     }
//   };

//   return func;
// };
