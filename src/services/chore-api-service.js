import config from '../config'
import TokenService from './token-service'

const ChoreApiService = {
  //Still working on this.
  postPoints: async (houseID, points) => {
    let data;
    let updatePoints; // must grab this value from the state

    try {
      let res = await fetch(`${config.API_ENDPOINT}/households/${houseID}/tasks`, {
        method: 'POST',
        body: JSON.stringify({ points }),
        headers: {
          'content-type' : 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      data = await res.json();
    } catch (err) {
      throw new Error(err)
    }
    return data;
  },

}

export default ChoreApiService;