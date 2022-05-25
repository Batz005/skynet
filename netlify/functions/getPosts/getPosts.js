const fetch = require('node-fetch')
const jwt = require('jsonwebtoken')



const handler = async (event, context) => {
 

  // send account information along with the POST
  const bodyData = JSON.parse(event.body)
  const { id }  = bodyData
  let Token = ""
  async function fetchGraphQL(operationsDoc, operationName, variables) {

    console.log(bodyData)
    Token = jwt.sign(
      {
       
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${id}`,
        },
      },
      process.env.JWT_SECRET
    );

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
          "x-hasura-admin-secret": `notasecretanymore`,
          "Content-Type": "application/json",
        },
      }
    );
  
    return await result.json();
  }
  

  const operationsDoc = `
  query MyQuery {
    Posts {
      id
      body
      image
      user_id
      username
      date_created
      likes
      dislikes
    }
  }
`;

function fetchMyQuery() {
  return fetchGraphQL(
    operationsDoc,
    "MyQuery",
    {}
  );
}


  const { errors, data } = await fetchMyQuery();

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);

  
//   const response = startFetchMyQuery();
  
  
  console.log(data, "85")

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

module.exports = { handler }
