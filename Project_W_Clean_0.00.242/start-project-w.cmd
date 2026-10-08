@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 goto node_missing
node "tools\local-server.js"
if errorlevel 1 goto server_failed
exit /b 0

:node_missing
echo [Project_W Clean] Node.js was not found.
echo Install Node.js and run this file again.
pause
exit /b 1

:server_failed
echo [Project_W Clean] The local server stopped with an error.
pause
exit /b 1
