import {SignInSuccessResponse} from 'src/components/SignIn/SignIn.interface';
import {API_URL} from './config';
import {Buffer} from 'buffer';

export const user = {
  login: async (username, password) => {
    const response = await fetch(`${API_URL}/social/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${new Buffer(`${username}:${password}`).toString(
          'base64',
        )}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
  logout: async (token) => {
    const response = await fetch(`${API_URL}/social/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
};

export const social = {
  login: async (data: SignInSuccessResponse) => {
    const response = await fetch(`${API_URL}/social/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  },
};
