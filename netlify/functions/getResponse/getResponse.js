const axios = require('axios')

const API_ENDPOINT = 'http://127.0.0.1:5000/api/get-response'

exports.handler = async (event, context) => {
    let data = JSON.parse(event.body)
    let { message } = data
    const mess = message
    console.log(message, "mess")
  let response
  try {
    response = await axios.post(API_ENDPOINT,{
        
            message: mess
        
    })
    console.log(response)
    // const x = await response
    // console.log(x)
    return {
        statusCode: 200,
        body: JSON.stringify({
          data: response.data
        })
      }
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  
}