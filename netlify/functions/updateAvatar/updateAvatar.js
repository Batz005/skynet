
 
  


  const fetch = require('node-fetch')

  
  
  
  
  
  const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }
  
    // send account information along with the POST
    const bodyData = JSON.parse(event.body)
    const { id, avatar_url } = bodyData
    
    async function fetchGraphQL(operationsDoc, operationName, variables) {
  
      console.log(bodyData)
    //   Token = jwt.sign(
    //     {
          
    //       iat: Math.floor(Date.now() / 1000),
    //       exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
    //       "https://hasura.io/jwt/claims": {
    //         "x-hasura-allowed-roles": ["user", "admin"],
    //         "x-hasura-default-role": "user",
    //         "x-hasura-user-id": `${added_by}`,
    //       },
    //     },
    //     process.env.JWT_SECRET
    //   );
  
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
    mutation MyMutation($id: uuid!, $avatar_url: String) {
        update_Users_by_pk(pk_columns: {id: $id}, _set: {avatar_url: $avatar_url}){
            id
            avatar_url
        }
      }
      
  `;
  
  function executeInsertResource(id, avatar_url) {
    return fetchGraphQL(
      operationsDoc,
      "MyMutation",
      {"id": id, "avatar_url": avatar_url}
    );
  }
  
  
    const { errors, data } = await executeInsertResource(id, avatar_url);
  
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
  