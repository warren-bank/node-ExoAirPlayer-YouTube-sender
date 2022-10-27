const verbose    = require('./verbose_logger')
const playlist   = require('./playlist')
const ytdl       = require('./ytdl')
const discovery  = require('./mdns_discovery')
const networking = require('./networking')

const process_cli = async function(argv_vals) {
  verbose.set_enabled(argv_vals["--verbose"])

  const playlist_id = playlist.get_playlist_id(argv_vals["--url"])

  const urls = (playlist_id)
    ? await playlist.get_videos_in_playlist(playlist_id)
        .then(video_ids => {
          return playlist.get_videos_in_range(video_ids, argv_vals["--playlist-range"])
        })
        .then(video_ids => {
          return video_ids.map(video_id => `https://www.youtube.com/watch?v=${video_id}`)
        })
    : [argv_vals["--url"]]

  const videos = await ytdl.get_videos(urls)

  const device = (argv_vals["--device-host"] && argv_vals["--device-port"])
    ? {host: argv_vals["--device-host"], port: argv_vals["--device-port"]}
    : await discovery.find_device(argv_vals["--discovery-timeout"], false)

  await networking.cast_video(device.host, device.port, videos.map(video => video.url), argv_vals["--queue"])

  for (let i=0; i < videos.length; i++) {
    const queue = (i > 0) || argv_vals["--queue"]

    console.log(`${queue ? 'Queued' : 'Playing'} video: "${videos[i].title}"`)
  }
}

module.exports = {send: process_cli}
