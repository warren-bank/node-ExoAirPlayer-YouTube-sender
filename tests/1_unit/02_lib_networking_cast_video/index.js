require('../../../lib/verbose_logger').set_enabled(true)

const {cast_video} = require('../../../lib/networking')

const configs = {
  host: "192.168.1.211",
  port: 8192
}

const run_test = async function(video_urls, queue) {
  const data = await cast_video(configs.host, configs.port, video_urls, queue)

  const statusCode = data.response.statusCode

  console.log(JSON.stringify({queue: !!queue, video_urls, statusCode}, null, 4))
}

const delay = function(duration_ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, duration_ms)
  })
}

const run_all_tests = async function() {
  await run_test('rtmp://104.194.11.25:80/live/uVMS_ef7082d0422d07265f6c', false)
  await delay(10000)
  await run_test(
    [
      'https://www.cbsnews.com/common/video/cbsn_header_prod.m3u8',
      'https://www.cbsnews.com/common/video/cbsn-ny-prod.m3u8'
    ],
    true
  )
}

run_all_tests()
