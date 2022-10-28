const {request} = require('@warren-bank/node-request')

const parse_url = require('url').parse

const download_playlist = function(playlist_id) {
  if (!playlist_id)
    return Promise.reject(new Error('YouTube playlist ID is not defined'))

  const url = 'https://www.youtube.com/playlist?list=' + playlist_id

  return request(url)
  .then(data => data.response.toString())
}

const cast_video = function(host, port, video_urls, queue) {
  if (!host)
    return Promise.reject(new Error('ExoAirPlayer IP address is not defined'))
  if (!port)
    return Promise.reject(new Error('ExoAirPlayer port number is not defined'))
  if (!video_urls)
    return Promise.reject(new Error('Resolved URL for YouTube video is not defined'))
  if (!Array.isArray(video_urls))
    video_urls = [video_urls]
  if (!video_urls.length)
    return Promise.reject(new Error('Resolved URL for YouTube video is not defined'))

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

  const POST_data = video_urls.map(video_url => `Content-Location: ${video_url}`).join("\n")

  const config = {
    binary: true,
    stream: true
  }

  return request(options, POST_data, config)
}

module.exports = {download_playlist, cast_video}
