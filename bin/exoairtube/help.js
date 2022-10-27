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
      [-]<start_index>:<stop_index>
    Where:
    * [-]
      - is optional
      - indicates that the resulting subset of videos
        should be sorted in reverse order
    * <start_index>
      - is an integer in the range:
          [0 .. <count_of_videos_in_playlist> - 1]
      - is required
      - is included in subset of videos
    * <stop_index>
      - is an integer in the range:
          [<start_index> + 1 .. <count_of_videos_in_playlist>]
      - is optional
        * default value: <count_of_videos_in_playlist>
      - is not included in subset of videos
    * <count_of_videos_in_playlist>
      - has a maximum value of: 100
    Default: "0"

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
