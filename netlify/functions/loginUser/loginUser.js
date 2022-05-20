const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');



const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const handler = async (event, context) => {
// const signup = async (req, res) => {
//     try {
//         const { fullName, username, password, phoneNumber } = JSON.parse(event.body);

//         const userId = crypto.randomBytes(16).toString('hex');

//         const serverClient = connect(api_key, api_secret, app_id);

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const token = serverClient.createUserToken(userId);
//         return {
//             statusCode: 200,
//             body: JSON.stringify({ token, fullName, username, userId, hashedPassword, phoneNumber }),
//           }
//         // res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
//     } catch (error) {
//         console.log(error);
//         return {
//             statusCode: 500,
//             body: JSON.stringify({ message: error }),
//           }
//         // res.status(500).json({ message: error });
//     }
// };

// const login = async (req, res) => {
    try {
        const bodyData= JSON.parse(event.body);
        const { username, fullName, phoneNumber, id } = bodyData;
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        // const data = await client.user(id).getOrCreate({
        //     name: username, 
        //     fullName: fullName,
        //     phoneNumber: phoneNumber
        // });
        console.log(id, "iiiiiid")
        const { users } = await client.queryUsers({ id: id });
       
        // let token = ""
        if(!users.length) {
            // const updateResponse = await client.upsertUser({ 
            //     id: id, 
            //     role: 'admin', 
            //     fullName: fullName,
            //     phoneNumber: phoneNumber
        
            //  });
            //  console.log(updateResponse, "kkkk")
            token = serverClient.createUserToken(id);
        }
        else{
            token = serverClient.createUserToken(users[0].id);
        }

        

        

        
            return {
                statusCode: 200,
                body: JSON.stringify({ token, fullName: fullName, username, userId: id}),
              }
            // res.status(200).json({ token, fullName: users[0].fullName, username, userId: users[0].id});
       
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error }),
          }
        // res.status(500).json({ message: error });
    }
};

module.exports = { handler }
// module.exports = { signup, login }