const ytdl = require('ytdl-core')

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

    const format = ytdl.chooseFormat(info.formats, {filter: 'video'})

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

module.exports = {get_videos: get_videos_data}
