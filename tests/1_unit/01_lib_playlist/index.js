const {get_playlist_id, get_videos_in_playlist, get_videos_in_range} = require('../../../lib/playlist')

const run_test = async function(url, range) {
  const playlist_id = get_playlist_id(url)
  const video_ids   = await get_videos_in_playlist(playlist_id).then(videos => get_videos_in_range(videos, range))
  const video_count = video_ids.length

  console.log(JSON.stringify({url, playlist_id, range, video_count, video_ids}, null, 4))
}

const run_all_tests = async function() {
  let range

  range = null
  await run_test('https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA', range)
  await run_test('https://www.youtube.com/watch?v=IQ4dUowGAKI&list=UUFgSnQojiEXb9-N3ViRdRnA', range)

  range = "4:14"
  await run_test('https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA', range)
  await run_test('https://www.youtube.com/watch?v=IQ4dUowGAKI&list=UUFgSnQojiEXb9-N3ViRdRnA', range)

  range = "-4:14"
  await run_test('https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA', range)
  await run_test('https://www.youtube.com/watch?v=IQ4dUowGAKI&list=UUFgSnQojiEXb9-N3ViRdRnA', range)
}

run_all_tests()
