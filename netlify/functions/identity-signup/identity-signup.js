// note - this function MUST be named `identity-signup` to work
// we do not yet offer local emulation of this functionality in Netlify Dev
//
// more:
// https://www.netlify.com/blog/2019/02/21/the-role-of-roles-and-how-to-set-them-in-netlify-identity/
// https://www.netlify.com/docs/functions/#identity-and-functions
const GoTrue = require("gotrue-js");





const handler = async function (event) {
  const auth = new GoTrue({
    APIUrl: `${process.env.DOMAIN_URL}/.netlify/identity`,
    audience: '',
    setCookie: false,
  });

  const data = JSON.parse(event.body)
  const { user } = data

  const responseBody = {
    app_metadata: {
      roles: user.role,
      my_user_info: 'this is some user info',
    },
    user_metadata: {
      // append current user metadata
      ...user.user_metadata,
      custom_data_from_function: 'hurray this is some extra metadata',
    },
  }
  let userData = {}
  auth.signup(email, password, ...responseBody)
                .then((response) => {
                  userData = response;
                    console.log('Confirmation email sent', response)})
                .catch((error) => console.log("It's an error", error));
 
  return {
    statusCode: 200,
    body: JSON.stringify(userData),
  }
}

module.exports = { handler }
