import config from '../config';
import TokenService from './token-service';

const ApiService = {
  postHousehold(householdName) {
    let name = householdName;
    return fetch(`${config.API_ENDPOINT}/households`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({ name }), // req.body = {name: ["dunders"]}
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getHouseholds() {
    return fetch(`${config.API_ENDPOINT}/households`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  //Get an individual household based on /:id
  getHousehold(id) {
    return fetch(`${config.API_ENDPOINT}/households/${id}`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  addMember(newMember, householdId) {
    return fetch(`${config.API_ENDPOINT}/${householdId}/members`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify(newMember),
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getMemberTasks() {
    return fetch(`${config.API_ENDPOINT}/households/householdId/members/memberId/tasks`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },

  getMembers(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/members`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getTasksForAll(household_id) {
    return fetch(`${config.API_ENDPOINT}/households/${household_id}/tasks`, {
      method: 'GET',
      headers: {
          'content-type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  editHouseholdName(id, updateHousehold) {
    return fetch(`${config.API_ENDPOINT}/households/${id}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(updateHousehold)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  
  completeTask(id) {
    return fetch(`${config.API_ENDPOINT}/households/householdId/members/memberId/tasks`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({taskId: id})
    }).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  },
};

export default ApiService;
