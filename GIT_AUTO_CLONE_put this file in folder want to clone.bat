@echo off
set /p account=Enter GitHub account/organization name: 
set /p repo=Enter GitHub repository name: 

echo Cloning https://github.com/%account%/%repo%.git ...
git clone https://github.com/%account%/%repo%.git

pause