const {request} = require('@warren-bank/node-request')

const parse_url = require('url').parse

const download_playlist = function(playlist_id) {
  if (!playlist_id)
    return Promise.reject(new Error('YouTube playlist ID is not defined'))

  const url = 'https://www.youtube.com/playlist?list=' + playlist_id

  return request(url)
  .then(data => data.response.toString())
}

const cast_video = function(host, port, video_url, queue) {
  const exoairplayer_api_endpoint = `http://${host}:${port}/${queue ? 'queue' : 'play'}`

  const options = Object.assign(
    {},
    {
      headers: {
        "Content-Type": "text/parameters"
      }
    },
    parse_url(exoairplayer_api_endpoint)
  )

  const POST_data = `Content-Location: ${video_url}`

  const config = {
    binary: true,
    stream: true
  }

  return request(options, POST_data, config)
}

const delay = function(duration_ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration_ms)
  })
}

module.exports = {download_playlist, cast_video, delay}
