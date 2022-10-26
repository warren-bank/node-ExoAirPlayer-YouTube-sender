@echo off

cd /D "%~dp0."

call :run_test "01_lib_playlist"
call :run_test "02_lib_networking_cast_video"
call :run_test "03_lib_mdns_discovery_find_devices"

goto :done

:run_test
  set test_dir=%~1
  set tst_file="%test_dir%/index.js"
  set log_file="%test_dir%/output.txt"
  call node %tst_file% >%log_file% 2>&1
  goto :eof

:done
