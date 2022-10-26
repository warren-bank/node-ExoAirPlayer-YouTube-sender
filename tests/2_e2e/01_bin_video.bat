@echo off

set opts=
set opts=%opts% --url "https://www.youtube.com/watch?v=IQ4dUowGAKI"

call node "%~dp0..\..\bin\exoairtube.js" %opts%

echo.
pause
