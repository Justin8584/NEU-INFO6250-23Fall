// This is a sample file that demonstrates
// how you can write an abstraction around
// a fetch() call
// This exported function returns a promise
// that resolves with data
// or rejects with an error object
//
// The caller of this function can decide
// what to do with the data
// or what to do with the error
//
// You can add to this file and use this function
// or write your own files/functions

function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // set this header when sending JSON in the body of request
    },
    body: JSON.stringify({ username }),
  })
    // fetch() rejects on network error
    // So we convert that to a formatted error object
    // so our caller can handle all "errors" in a similar way
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {  // response.ok checks the status code from the service
        // This service returns JSON on errors,
        // so we use that as the error object and reject
        return response.json().then(err => Promise.reject(err));
      }
      return response.json(); // happy status code means resolve with data from service
    });
}

function checkSession() {
  return fetch('/api/session', {
    method: 'GET'
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return Promise.reject({ error: 'no-session' })
      }
      return response.json();
    })
}

function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => response.json())
}

function getStoredWord() {
  return fetch('/api/word', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (response.status === 401) {
        return Promise.reject({ error: 'auth-missing' })
      }
      if (!response.ok) {
        return Promise.reject({ error: 'unknown-error' })
      }
      return response.json();
    })
}

function updateStoredWord(word) {

  if (!word || word === '') {
    return Promise.reject({ error: 'invalid-word' })
  }

  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ word }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (response.status === 401) {
        Promise.reject({ error: 'auth-missing' })
      }
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json()
    });
}

export { fetchLogin, checkSession, fetchLogout, getStoredWord, updateStoredWord };



