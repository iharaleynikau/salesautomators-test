import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport';
import { OAuth2Strategy } from 'passport-oauth';

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import User from './db/user.js';
import api from './api.js';

User.createTable();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

passport.use(
  'pipedrive',
  new OAuth2Strategy(
    {
      authorizationURL: 'https://oauth.pipedrive.com/oauth/authorize',
      tokenURL: 'https://oauth.pipedrive.com/oauth/token',
      clientID: process.env.clientID || '',
      clientSecret: process.env.clientSecret || '',
      callbackURL: process.env.callbackURL || ''
    },
    async (accessToken, refreshToken, profile, done) => {
      const userInfo = await api.getUser(accessToken);
      const user = await User.add(userInfo.data.name, accessToken, refreshToken);

      done(null, { user });
    }
  )
);

app.disable('x-powered-by');
app.use(passport.initialize());

app.use(async (req, res, next) => {
  req.user = await User.getById(1);
  next();
});

app.get('/auth/pipedrive', passport.authenticate('pipedrive'));
app.get(
  '/auth/pipedrive/callback',
  passport.authenticate('pipedrive', {
    session: false,
    failureRedirect: '/',
    successRedirect: '/'
  })
);

app.post('/create', async (req, res) => {
  if (req.user.length < 1) {
    return res.redirect('/auth/pipedrive');
  }

  const data = {
    title: 'Deal of the century',
    value: 0,
    currency: 'USD',
    user_id: null,
    person_id: null,
    org_id: 1,
    stage_id: 1,
    status: 'open',
    expected_close_date: '',
    probability: 60,
    lost_reason: null,
    visible_to: 1,
    add_time: ''
  };

  try {
    const create = api.addDeal(req.user[0].access_token, data);

    await create;
    console.log('success!');
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/', async (req, res) => {
  if (req.user.length < 1) {
    return res.redirect('/auth/pipedrive');
  }

  try {
    const deals = await api.getDeals(req.user[0].access_token);

    res.send(deals);
  } catch (error) {
    return res.send('Failed to get deals');
  }
});

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
