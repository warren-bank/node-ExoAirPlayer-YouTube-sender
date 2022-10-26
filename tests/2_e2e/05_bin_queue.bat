@echo off

set opts=
set opts=%opts% --url "https://www.youtube.com/watch?v=IQ4dUowGAKI"
set opts=%opts% --device-host "192.168.1.211"
set opts=%opts% --device-port "8192"
set opts=%opts% --queue

call node "%~dp0..\..\bin\exoairtube.js" %opts%

echo.
pause
