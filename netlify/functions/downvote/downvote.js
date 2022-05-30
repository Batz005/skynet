const fetch = require('node-fetch')


// const jwt = require('jsonwebtoken')



const handler = async (event, context) => {
  if (event.httpMethod !== 'POST') return { statusCode: 400, body: 'Must POST to this function' }

  // send account information along with the POST
  const bodyData = JSON.parse(event.body)
  let { user_id,  id, dislikes } = bodyData
  console.log(user_id, id, dislikes, "body")
  async function fetchGraphQL(operationsDoc, operationName, variables) {

    // console.log(bodyData)
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

  const operationsDoc1 = `
  query MyQuery( $post_id: uuid!, $user_id: uuid!) {
  
    Post_Stats(where: {user_id: {_eq: $user_id}, post_id: {_eq: $post_id}}){
      id
      post_id
      is_disliked
      is_disliked
      user_id
    }

    Posts_by_pk(id: $post_id){
		id
        dislikes
    
  }
  }
  
`;

const operationsDoc2 = `
mutation MyMutation($id: uuid!, $user_id: uuid, $is_disliked: Boolean, $dislikes: Int) {
  update_Posts_by_pk(pk_columns: {id: $id},  _set: {dislikes: $dislikes}) {
    dislikes
  }
  insert_Post_Stats_one(object: {is_disliked: $is_disliked, post_id: $id, user_id: $user_id}){
    id  
    is_disliked
      post_id
      user_id
  }
}

`;

const operationsDoc3 = `
mutation MyMutation($id: uuid!, $is_disliked: Boolean, $dislikes: Int, $post_id: uuid!) {
    update_Post_Stats_by_pk(pk_columns: {id: $id}, _set: {is_disliked: $is_disliked}){
      id
      post_id
      is_disliked
      is_disliked
    }
    update_Posts_by_pk(pk_columns: {id: $post_id},  _set: {dislikes: $dislikes}) {
        dislikes
      }
  }
  
`


function fetchMyQuery(id,user_id) {
  return fetchGraphQL(
    operationsDoc1,
    "MyQuery",
    {"post_id": id, "user_id":user_id}
  );
}


  const { errors, data } = await fetchMyQuery(id, user_id);

  if (errors) {
    // handle those errors like a pro
    console.error(errors, "107");
  }
  
  function executeInsertPost(user_id, id,  is_disliked, dislikes) {
    return fetchGraphQL(
      operationsDoc2,
      "MyMutation",
      {"user_id": user_id, "id": id, "is_disliked": is_disliked, "dislikes": dislikes}
    );
  }
  
  function executeUpdatePost( post_stats_id, id,  is_disliked, dislikes) {
    return fetchGraphQL(
      operationsDoc3,
      "MyMutation",
      {"id": post_stats_id, "post_id": id, "is_disliked": is_disliked, "dislikes": dislikes}
    );
  }
  console.log(data, "125")
  const dataQuery = data
  if(dataQuery?.Post_Stats.length !== 0){
      let is_disliked = dataQuery?.Post_Stats[0]?.is_disliked;
      let dislikes = dataQuery?.Posts_by_pk?.dislikes
      console.log(dislikes, is_disliked, "136")
      if(is_disliked){
          dislikes--;
      }
      else
        dislikes++;
      is_disliked = !is_disliked;
      const post_stats_id = dataQuery.Post_Stats[0].id;
      console.log(post_stats_id, "post_stats_id")
      const { errors, data } = await executeUpdatePost( post_stats_id, id, is_disliked, dislikes)
      if (errors) {
        // handle those errors like a pro
        console.error(errors, "138");
    }
    console.log(data, "140")
    return {
        statusCode: 200,
        body: JSON.stringify({...data?.update_Posts_by_pk, ...data?.update_Post_Stats_by_pk}),
      }

  }
  else{

    let is_disliked = true;
    let dislikes = dataQuery?.Posts_by_pk?.dislikes
    console.log(dislikes, "160")
    dislikes++;
    const { errors, data } = await executeInsertPost(user_id, id, is_disliked, dislikes );
    console.log(data, "164")
    if (errors) {
        // handle those errors like a pro
        console.error(errors, "155");
    }

    return {
        statusCode: 200,
        body: JSON.stringify({...data?.update_Posts_by_pk, ...data?.insert_Post_Stats_one}),
      }
  }


 




  

  // do something great with this precious data
  console.log(data);

  

  
  
  

  
}

module.exports = { handler }
