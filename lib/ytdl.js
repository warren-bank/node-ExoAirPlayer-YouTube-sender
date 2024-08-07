const ytdl = require('@distube/ytdl-core')

const verbose = require('./verbose_logger')

const get_videos_data = function(urls) {
  return Promise.all(
    urls.map(get_video_data)
  )
}

const get_video_data = function(url) {
  return ytdl.getInfo(url)
    .then(info => choose_format(url, info))
    .then(({info, format}) => {
      const hash = '#video.' + (
        (format.isHLS)
          ? 'm3u8'
          : (format.isDashMPD)
            ? 'mpd'
            : (format.container)
              ? format.container
              : 'mp4'
      )

      const data = {
        title: info.videoDetails.title,
        url:   (format.url + hash)
      }

      return data
    })
}

const choose_format = function(url, info) {
  return new Promise((resolve, reject) => {
    if (!info || !info.formats) {
      const msg = `Failed to get info for the video at:\n${url}`
      verbose.log(msg)
      reject(new Error(msg))
      return
    }

    verbose.log('Info for video:', {url, info})

    const format =
         ytdl_chooseFormat(info.formats, {quality: 'highest', filter: 'videoandaudio'})
      || ytdl_chooseFormat(info.formats, {quality: 'highest', filter: 'video'})
      || ytdl_chooseFormat(info.formats, {quality: 'highest', filter: 'audio'})

    if (!format || !format.url) {
      const msg = `Failed to choose a format for the video at:\n${url}`
      verbose.log(msg)
      reject(new Error(msg))
      return
    }

    verbose.log('Format for video:', {url, format})

    resolve({url, info, format})
  })
}

/*
 * https://github.com/fent/node-ytdl-core/blob/v4.11.2/lib/format-utils.js#L95
 * https://github.com/fent/node-ytdl-core/blob/v4.11.2/lib/format-utils.js#L195
 */
const ytdl_chooseFormat = function(formats, options) {
  try {
    return ytdl.chooseFormat(formats, options)
  }
  catch(e) {
    return null
  }
}

module.exports = {get_videos: get_videos_data}
