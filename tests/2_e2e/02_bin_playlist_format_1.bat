@echo off

set opts=
set opts=%opts% --url "https://www.youtube.com/playlist?list=UUFgSnQojiEXb9-N3ViRdRnA"

call node "%~dp0..\..\bin\exoairtube.js" %opts%

echo.
pause
