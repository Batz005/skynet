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
  const data = JSON.parse(event.body)
  const { branch, date_of_birth, father_name, first_name, id, last_name, mentor_email, mentor_name, mobile, roll_num, section, semester, created_at, email, role,  updated_at } = data
  let Token = ""
  async function fetchGraphQL(operationsDoc, operationName, variables) {

    console.log(data)
    Token = jwt.sign(
      {
        ...data,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        "https://hasura.io/jwt/claims": {
          "x-hasura-allowed-roles": ["user", "admin"],
          "x-hasura-default-role": "user",
          "x-hasura-user-id": `${data.id}`,
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
          "Authorization": `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    return await result.json();
  }
  
  const operationsDoc = `
  mutation MyMutation($created_at: timestamptz , $email: String , $id: uuid , $role: String , $roll_num: bigint , $updated_at: timestamptz , $branch: String , $date_of_birth: date , $father_name: String , $first_name: String ,  $last_name: String, $mentor_email: String , $mentor_name: String , $mobile: numeric ,  $semester: Int , $section: String ) {
    insert_Users_one(object: {created_at: $created_at, email: $email, id: $id, role: $role, roll_num: $roll_num, updated_at: $updated_at, username: $first_name}) {
      id
    }
    insert_User_details_one(object: {branch: $branch, date_of_birth: $date_of_birth, father_name: $father_name, first_name: $first_name, last_name: $last_name, mentor_email: $mentor_email, mentor_name: $mentor_name, mobile: $mobile, roll_num: $roll_num, section: $section, semester: $semester, user_id: $id}) {
      id
    }
  }
  
  `;
  
  function executeMyMutation(branch, date_of_birth, father_name, first_name, id, last_name, mentor_email, mentor_name, mobile, roll_num, section, semester, created_at, email, role,  updated_at) {
    return fetchGraphQL(
      operationsDoc,
      "MyMutation",
      {"branch": branch, "date_of_birth": date_of_birth, "father_name": father_name, "first_name": first_name, "id": id, "last_name": last_name, "mentor_email": mentor_email, "mentor_name": mentor_name, "mobile": mobile, "roll_num": roll_num, "section": section, "semester": semester, "created_at": created_at, "email": email, "role": role, "updated_at": updated_at}
    );
  }
  
  async function startExecuteMyMutation(branch, date_of_birth, father_name, first_name, id, last_name, mentor_email, mentor_name, mobile, roll_num, section, semester, created_at, email, role,  updated_at) {
    const { errors, data } = await executeMyMutation(branch, date_of_birth, father_name, first_name, id, last_name, mentor_email, mentor_name, mobile, roll_num, section, semester, created_at, email, role, updated_at);
  
    if (errors) {
      // handle those errors like a pro
      console.error(errors);
    }
  
    // do something great with this precious data
    console.log(data);
    return data
  }
  
  const response = startExecuteMyMutation(branch, date_of_birth, father_name, first_name, id, last_name, mentor_email, mentor_name, mobile, roll_num, section, semester, created_at, email, role, updated_at);
  
  
  // identity.token is a short lived admin token which
  // is provided to all Netlify Functions to interact
  // with the Identity API
  // const { identity } = context.clientContext

  // await fetch(`${identity.url}/admin/users`, {
  //   method: 'POST',
  //   headers: { Authorization: `Bearer ${identity.token}` },
  //   body: JSON.stringify({
  //     email,
  //     password,
  //     confirm: true,
  //     user_metadata: {
  //       full_name: fullName,
  //     },
  //   }),
  // })

  return {
    statusCode: 200,
    body: JSON.stringify(response, Token),
  }
}

module.exports = { handler }
