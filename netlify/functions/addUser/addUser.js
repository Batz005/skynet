const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');



const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;

const handler = async (event, context) => {

    try {
        const bodyData= JSON.parse(event.body);
        const { fullName, username,  phoneNumber, id, avatar_url } = bodyData;

        const userId = id;

        const serverClient = connect(api_key, api_secret, app_id);

        const client = StreamChat.getInstance(api_key);
        const updateResponse = await client.upsertUser({ 
            id: userId, 
            role: 'admin',
            fullName: fullName,
            phoneNumber: phoneNumber,
            avatar_url: avatar_url
         });
         console.log(updateResponse)
        const token = serverClient.createUserToken(userId);
        return {
            statusCode: 200,
            body: JSON.stringify({ token, fullName, username, userId, phoneNumber, avatar_url }),
          }
        // res.status(200).json({ token, fullName, username, userId, hashedPassword, phoneNumber });
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