const {download_playlist} = require('./networking')

const regexs = {
  "playlist_url": /^.*[\?&]list=([^&]+)(&.*)?$/,
  "whitespace":   /[ \s\t\r\n]+/g,
  "js_data":      /^.*>\s*var\s+ytInitialData\s*=\s*(.+?)\s*;?\s*<\/\s*script\s*>.*$/
}

const get_playlist_id = function(url) {
  return regexs.playlist_url.test(url)
    ? url.replace(regexs.playlist_url, '$1')
    : ''
}

const get_videos_in_playlist = function(playlist_id) {
  return download_playlist(playlist_id)
  .then(html => {
    let js_data, video_ids
    regexs.whitespace.lastIndex = 0

    js_data = html.replace(regexs.whitespace, ' ').replace(regexs.js_data, '$1')
    js_data = JSON.parse(js_data)

    video_ids = js_data.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents
    video_ids = video_ids
      .map(video => {
        try {
          if (!video.playlistVideoRenderer.isPlayable || !video.playlistVideoRenderer.videoId) throw ''

          return video.playlistVideoRenderer.videoId
        }
        catch(e) {
          return null
        }
      })
      .filter(video => !!video)

    return video_ids
  })
  .catch(error => ([]))
}

module.exports = {get_playlist_id, get_videos_in_playlist}
