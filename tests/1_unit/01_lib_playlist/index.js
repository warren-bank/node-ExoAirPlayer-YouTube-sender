const {get_playlist_id, get_videos_in_playlist} = require('../../../lib/playlist')

const run_test = async function(url) {
  const playlist_id = get_playlist_id(url)
  const video_ids   = await get_videos_in_playlist(playlist_id)
  const video_count = video_ids.length

  console.log(JSON.stringify({url, playlist_id, video_count, video_ids}, null, 4))
}

const run_all_tests = async function() {
  await run_test('https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA')
  await run_test('https://www.youtube.com/watch?v=IQ4dUowGAKI&list=UUFgSnQojiEXb9-N3ViRdRnA')
}

run_all_tests()
