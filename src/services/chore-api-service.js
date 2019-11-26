import config from '../config'
import TokenService from './token-service'

const ChoreApiService = {
  getTasks: async (houseID) => {
    let data;
    try {
      let res = await fetch(`${config.API_ENDPOINT}/households/${houseID}/tasks`, {
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      data = await res.json()
    } catch (err) {
      throw new Error(err)
    }
    return data;
  },

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

  deleteTask: async (houseID, taskID) => {
    let data;

    try {
      let res = await fetch(`${config.API_ENDPOINT}/households/${houseID}/tasks/${taskID}`, {
        method: 'DELETE',
        headers: {
          "content-type": "application/json",
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        }
      })
      data = await res.json();
    } catch (err) {
      throw new Error(err)
    }
    return data;
  }
}

export default ChoreApiService;