import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://6408de9e2f01352a8a9fc00a.mockapi.io/api/contacts/',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  // console.log(data);
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  // console.log(data);
  return result;
};

export const deleteContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
