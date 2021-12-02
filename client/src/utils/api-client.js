import axios from 'axios'

export const getReq = async (url, options={}) => {
    const data = await axios.get(url, options)
      return data.data 
}

export const postReq = async (url, body, options={}) => {
    return (
        await axios.post(url, body,options)
      ).data 
}


export const putReq = async (url, body, options={}) => {
    return (
        await axios.put(url, body,options)
      ).data 
}


export const deleteReq = async (url,  options={}) => {
    return (
        await axios.delete(url, options)
      ).data 
}

