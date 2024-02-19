import axios from 'axios';

const getUser = async accessToken => {
  const requestOptions = {
    url: 'https://api.pipedrive.com/v1/users/me',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    timeout: 10000
  };

  const userInfo = await axios(requestOptions);

  return userInfo.data;
};

const addDeal = async (accessToken, data) => {
  const requestOptions = {
    url: 'https://api.pipedrive.com/v1/deals?status=open',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      ...data
    },
    timeout: 10000
  };

  const response = await axios(requestOptions);

  return response;
};

const getDeals = async accessToken => {
  const requestOptions = {
    url: 'https://api.pipedrive.com/v1/deals?status=open',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    timeout: 10000
  };
  const deals = await axios(requestOptions);

  return deals.data;
};

const updateDeal = async (id, outcome, accessToken) => {
  const requestOptions = {
    url: `https://api.pipedrive.com/v1/deals/${id}`,
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    data: {
      status: outcome
    },
    timeout: 10000
  };

  await axios(requestOptions);
};

export default {
  getUser,
  addDeal,
  getDeals,
  updateDeal
};
