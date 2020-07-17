import * as React from 'react';

const UserContext = React.createContext({
  avatar: null,
  bio: null,
  created_at: '2020-07-16T08:34:59.503580Z',
  email: 'inf3cti0n95@gmail.com',
  id: 4,
  is_email_verified: false,
  last_login: '2020-07-17T06:00:42.220039Z',
  name: 'Viraj Trivedi',
  social_profiles: [
    {
      avatar:
        'https://lh3.googleusercontent.com/a-/AOh14GgOhS1B2WQ3mQYDW1FJ5Eokji10kgqRHV5vRSHBBg=s96-c',
      email: 'inf3cti0n95@gmail.com',
      name: 'Viraj Trivedi',
      provider: 'GOOGLE',
      social_id: '100702608497699310470',
      user_id: 4,
    },
  ],
  token: '5e4c29d29ad04655e34889cf03ca5e5f1169c139',
  updated_at: '2020-07-16T08:34:59.503633Z',
  username: 'inf3cti0n95',
});

export default UserContext;
