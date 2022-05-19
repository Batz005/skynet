const axios = require("axios")

const handler = async (event) => {
    try {
      const youtubeKey = process.env.YOUTUBE_API_KEY
      
      const BASE_URL = "youtube.googleapis.com/youtube/v3";
        const { videoId }= event.body
        
        const response = axios(
          `https://${BASE_URL}/videos?key=${youtubeKey}&part=snippet&id=${videoId}`
        )
        const videoData = await response
        const data = videoData.data
        const { title,  publishedAt } = data.items[0].snippet;
            const thumbnailUrl = data.items[0].snippet.thumbnails.default.url;
            const publishedDateArray = publishedAt.substr(0,10).split("-");
            const publishedDate = publishedDateArray.reverse().join("-")  
        
      return {
        statusCode: 200,
        body: JSON.stringify({
            title: title,
            publishedDate: publishedDate,
            thumbnailUrl: thumbnailUrl
        }),
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
  }
  
  module.exports = { handler }
  