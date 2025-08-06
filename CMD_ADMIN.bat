@echo off
cd /d "%~dp0"
powershell -Command "Start-Process cmd -ArgumentList '/k cd /d ""%CD%""' -Verb RunAs"
exit
