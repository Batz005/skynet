// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method

const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')




const handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }
  try {
    const bodyData = JSON.parse(event.body)
    console.log(bodyData, "77")
    async function fetchGraphQL(operationsDoc, operationName, variables) {
      Token = jwt.sign(
        {
         
          iat: Math.floor(Date.now() / 1000),
          exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
          "https://hasura.io/jwt/claims": {
            "x-hasura-allowed-roles": ["user", "admin"],
            "x-hasura-default-role": "user",
            "x-hasura-user-id": `${bodyData.id}`,
          },
        },
        process.env.JWT_SECRET
      );
      console.log(Token)
      const result = await fetch(
        process.env.HASURA_URL,
        {
          method: "POST",
          body: JSON.stringify({
            query: operationsDoc,
            variables: variables,
            operationName: operationName
          }),
          headers: {
            "Authorization": `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      
      return await result.json();
    }
    
    const operationsDoc = `
      query MyQuery($id: uuid!) {
        Users_by_pk(id: $id) {
          id
          email
          role
          roll_num
          avatar_url
        }
      }
    `;
    
    function fetchMyQuery(id) {
      return fetchGraphQL(
        operationsDoc,
        "MyQuery",
        {"id": id}
      );
    }
    
    
      const { errors, data } = await fetchMyQuery(bodyData.id);
    
      if (errors) {
        // handle those errors like a pro
        console.error(errors, "64");
      }
    
      // do something great with this precious data
      console.log(data, "68");
    
    
    
    

    console.log( "80");
    return {
      statusCode: 200,
      body: JSON.stringify({
        role: data.Users_by_pk.role,
        token: Token,
        avatar_url: data.Users_by_pk.avatar_url
      })
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
