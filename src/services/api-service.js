import config from '../config'
import TokenService from './token-service'

const ApiService = {
  postHousehold(householdName) {
    console.log('inside api-service', householdName)
    let name = householdName;
    fetch(`${config.API_ENDPOINT}/households`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ name }) // req.body = {name: ["dunders"]}
    })
      .then(res =>
        // console.log(res)
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },
}

export default ApiService;