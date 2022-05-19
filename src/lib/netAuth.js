import GoTrue from "gotrue-js";

const auth = new GoTrue({
    APIUrl: `${process.env.PUBLIC_URL}/.netlify/identity`,
    audience: '',
    setCookie: true,
  });

export default auth;
