const help = `
usage:
======
exoairtube <options>

========
options:
========

"--help"
    Print a help message describing all command-line options.

"-V"
"--version"
    Display the current version.

"-u" <URL>
"--url" <URL>
    Specify the YouTube URL to play on ExoAirPlayer.
    Examples:
    - video
        https://www.youtube.com/watch?v=IQ4dUowGAKI
    - playlist (format 1)
        https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA
    - playlist (format 2)
        https://www.youtube.com/watch?v=IQ4dUowGAKI&list=UUFgSnQojiEXb9-N3ViRdRnA

"-r" <range>
"--playlist-range" <range>
    Specify a subset of videos in a playlist in "--url".
    Spec for <range>:
      [-]<start_index>[:]<stop_index>
    Where:
    * [-]
      - is optional
      - indicates that the resulting subset of videos
        should be sorted in reverse order
      - is implied when <start_index> is greater than <stop_index>
    * <start_index>
      - is an integer in the range:
          [1 .. <count_of_videos_in_playlist>]
      - is included in subset of videos
      - is required
    * [:]
      - any non-numeric non-empty string can be used as a delimiter
      - is optional
    * <stop_index>
      - is an integer in the range:
          [<start_index> .. <count_of_videos_in_playlist>]
      - is included in subset of videos
      - is optional
      - default value depends on whether <range> ends with a [:] delimiter
        * if not: <start_index>
          range:  cherry picks a single video at <start_index>
        * if yes: <count_of_videos_in_playlist>
          range:  includes <start_index> and all videos that follow
    * <count_of_videos_in_playlist>
      - has a maximum value of: 100
    Example:
      - <range> specs (all equivalent):
          1) -r "-5:10"
          2) -r "-5-10"
          3) -r "-5..10"
          4) -r "10:5"
      - videos included in all example <range> specs:
          [10,9,8,7,6,5]
    Default: "1:"

"-h" <IP_address>
"--device-host" <IP_address>
    Specify the hostname or IP for an instance of ExoAirPlayer.

"-p" <port>
"--device-port" <port>
    Specify the port for the instance of ExoAirPlayer at "--device-host".
    Default: 8192

"-t" <seconds>
"--discovery-timeout" <seconds>
    Specify the length of time (in seconds) to perform mDNS discovery.
    Discovery is used to find instances of ExoAirPlayer on the LAN.
    Discovery is not performed when "--device-host" is specified.
    When timeout occurs,
    * a list of all found devices is displayed
    * the user is prompted to choose a single device to use for playback
    Default: 15

"-q"
"--queue"
    Specify that the pre-existing queue on the playback device should be preserved.
    Videos resolved from "--url" are silently appended.
    Default:
    * the pre-existing queue is replaced
    * the new queue contains the list of videos resolved from "--url"
    * the first video in the new queue begins playback

"-v"
"--verbose"
    Specify that verbose logging should be enabled.
    Extremely long and detailed log messages will be written to stdout.
`

module.exports = help
