const fetch = require('node-fetch')


const jwt = require('jsonwebtoken')



const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }

  // send account information along with the POST
  const bodyData = JSON.parse(event.body)
  const { user_id, body, image, username, avatar_url } = bodyData
  let Token = ""
  async function fetchGraphQL(operationsDoc, operationName, variables) {

    console.log(bodyData)
    // Token = jwt.sign(
    //   {
        
    //     iat: Math.floor(Date.now() / 1000),
    //     exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
    //     "https://hasura.io/jwt/claims": {
    //       "x-hasura-allowed-roles": ["user", "admin"],
    //       "x-hasura-default-role": "user",
    //       "x-hasura-user-id": `${user_id}`,
    //     },
    //   },
    //   process.env.JWT_SECRET
    // );

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
  mutation MyMutation($body: String, $image: String, $user_id: uuid, $username: String, $avatar_url: String) {
    insert_Posts_one(object: {body: $body, image: $image,  user_id: $user_id, username: $username, avatar_url: $avatar_url}) {
      id
      body
      image
      user_id
      avatar_url
      username
      date_created
      likes
      dislikes
    }
  }
`;

function executeInsertPost(user_id, body, image, username, avatar_url) {
  return fetchGraphQL(
    operationsDoc,
    "MyMutation",
    {"user_id": user_id, "body": body, "image": image, "username": username, "avatar_url": avatar_url}
  );
}


  const { errors, data } = await executeInsertPost(user_id, body, image, username, avatar_url );

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data, "84");

  

  
  
  

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

module.exports = { handler }
