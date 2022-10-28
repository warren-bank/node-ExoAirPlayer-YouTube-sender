const {download_playlist} = require('./networking')
const verbose             = require('./verbose_logger')

const regexs = {
  "playlist_url": /^.*[\?&]list=([^&]+)(&.*)?$/,
  "whitespace":   /[ \s\t\r\n]+/g,
  "js_data":      /^.*>\s*var\s+ytInitialData\s*=\s*(.+?)\s*;?\s*<\/\s*script\s*>.*$/,
  "range_spec":   /^\s*([-]?)\s*(\d+)([^\d]*)(\d*)\s*$/
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

    verbose.log('All videos in playlist:', {playlist_id, video_ids})

    return video_ids
  })
  .catch(error => ([]))
}

const get_videos_in_range = function(video_ids, range) {
  if (!video_ids || !Array.isArray(video_ids) || !video_ids.length)
    return []

  const matches = regexs.range_spec.exec(range)
  if (!matches)
    return video_ids

  const video_count   = video_ids.length
  let   reverse_order = (matches[1] === '-')
  let   start_index   = parseInt(matches[2], 10)
  const delimiter     = !!matches[3].trim()
  let   stop_index    = parseInt(matches[4], 10)

  if (isNaN(start_index) || (start_index < 1))
    start_index = 1

  if (start_index > video_count)
    start_index = video_count

  if (isNaN(stop_index))
    stop_index = (delimiter) ? video_count : start_index

  if (stop_index < 1)
    stop_index = 1

  if (stop_index > video_count)
    stop_index = video_count

  if (stop_index < start_index) {
    reverse_order = true
    ;[start_index, stop_index] = [stop_index, start_index]
  }

  const video_range_ids = video_ids.slice((start_index - 1), stop_index)

  if (reverse_order)
    video_range_ids.reverse()

  verbose.log('Videos in playlist range:', {range, reverse_order, start_index, stop_index, video_playlist_count: video_count, video_range_count: video_range_ids.length, video_range_ids})

  return video_range_ids
}

module.exports = {get_playlist_id, get_videos_in_playlist, get_videos_in_range}
