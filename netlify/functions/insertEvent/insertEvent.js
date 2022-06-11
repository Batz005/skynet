
 
  


  const fetch = require('node-fetch')

  
  
  
  
  const handler = async (event, context) => {
    if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }
  
    // send account information along with the POST
    const bodyData = JSON.parse(event.body)
    const { added_by, description, title, img_url, dates, timings, passes, isPassRequired } = bodyData
    let Token = ""
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
    mutation MyMutation($title: String, $added_by: uuid!,  $dates: String, $description: String, $img_url: String, $pass_required: Boolean, $passes: String, $timings: String) {
        insert_Events_one(object: {title: $title, added_by: $added_by, dates: $dates, description: $description, img_url: $img_url, pass_required: $pass_required, passes: $passes, timings: $timings}){
              added_by
              id
              title
              description
              img_url
              dates
              timings
              passes
              pass_required
        }
      }
  `;
  
  function executeInsertResource(added_by, description, title, img_url, dates, timings, passes, isPassRequired) {
    return fetchGraphQL(
      operationsDoc,
      "MyMutation",
      {"added_by": added_by, "description": description, "title": title, "img_url": img_url, "dates": dates, "timings": timings, "passes": passes, "pass_required": isPassRequired}
    );
  }
  
  
    const { errors, data } = await executeInsertResource(added_by, description, title, img_url, dates, timings, passes, isPassRequired);
  
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
  