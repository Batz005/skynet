
 
  


  const fetch = require('node-fetch')

/*
This is an example snippet - you should consider tailoring it
to your service.
*/
/*
Add these to your `package.json`:
  "node-fetch": "^2.5.0"
*/

// Node doesn't implement fetch so we have to import it
const jwt = require('jsonwebtoken')



const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }

  // send account information along with the POST
  const bodyData = JSON.parse(event.body)
  const { added_by, description, title, img_url } = bodyData
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
          "x-hasura-user-id": `${added_by}`,
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
  mutation InsertResource($added_by: uuid!, $description: String, $title: String, $img_url: String) {
    insert_Resources_one(object: {added_by: $added_by, description: $description, title: $title, img_url: $img_url}) {
      id
      title
      description
      added_by
      img_url
    }
  }
`;

function executeInsertResource(added_by, description, title, img_url) {
  return fetchGraphQL(
    operationsDoc,
    "InsertResource",
    {"added_by": added_by, "description": description, "title": title, "img_url": img_url}
  );
}


  const { errors, data } = await executeInsertResource(added_by, description, title, img_url);

  if (errors) {
    // handle those errors like a pro
    console.error(errors);
  }

  // do something great with this precious data
  console.log(data);

  
//   const response = startExecuteInsertResource(added_by, description, title, img_url);
  
  
  

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

module.exports = { handler }
