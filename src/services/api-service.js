import config from '../config'
import TokenService from './token-service'

const ApiService = {
  postHousehold(householdName) {
    let name = householdName;
    fetch(`${config.API_ENDPOINT}/households`, {
    method: 'POST',
    headers: {
    'content-type': 'application/json',
    'authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify({name})
  })
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}

export default ApiService;