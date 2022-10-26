### [exoairtube](https://github.com/warren-bank/node-ExoAirPlayer-YouTube-sender)

Command-line utility to "cast" videos from [YouTube](https://www.youtube.com/) to [ExoAirPlayer](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver).

Supports:
* YouTube URLs: videos and playlists
* ExoAirPlayer API endpoints: `/play` and `/queue`

#### Installation:

```bash
npm install --global @warren-bank/exoairplayer-youtube-sender
```

#### Usage:

```bash
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
```

#### Credits:

* [node-airtube](https://github.com/Deliaz/node-airtube) by [Denis Leonov](https://github.com/Deliaz)
  - depends on:
    * [bonjour](https://github.com/watson/bonjour) by [Thomas Watson](https://github.com/watson)
    * [airplay-protocol](https://github.com/watson/airplay-protocol) by [Thomas Watson](https://github.com/watson)
    * [ytdl-core](https://github.com/fent/node-ytdl-core) by [Roly Fentanes](https://github.com/fent)
  - improved upon by:
    * [fork-node-airtube](https://github.com/warren-bank/fork-node-airtube)
  - limited by:
    * lack of support for YouTube playlists
      - which is perfectly understandable, because the concept of a video queue does not exist in the [API for AirPlay v1](http://nto.github.io/AirPlay.html#video)
      - this feature is an enhancement added by [ExoAirPlayer](https://github.com/warren-bank/Android-ExoPlayer-AirPlay-Receiver)

#### Legal:

* copyright: [Warren Bank](https://github.com/warren-bank)
* license: [GPL-2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.txt)
