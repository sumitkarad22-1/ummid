@echo off
echo.
echo ==========================================================
echo          UMMID - Push to GitHub Script
echo ==========================================================
echo.

echo Checking if Git is installed...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/downloads
    echo After installing, restart your terminal/cmd and run this script again.
    echo.
    pause
    exit /b 1
)

echo.
echo Git is installed. Proceeding...
echo.

echo Initializing Git repository...
git init

echo.
echo Getting ready .gitignore file...
type NUL > .gitignore
echo node_modules/ >> .gitignore
echo .env >> .gitignore
echo dist/ >> .gitignore
echo .DS_Store >> .gitignore

echo.
echo Adding files to staging...
git add .
git reset node_modules -- .
git reset dist -- .
git reset .env -- .

echo.
echo Committing files...
git commit -m "Initial commit of UMMID PHRMS"

echo.
echo Renaming branch to main...
git branch -M main

echo.
echo Adding remote origin...
git remote add origin https://github.com/sumitkarad07/UMMID-Digital_Health_Wallet.git

echo.
echo Pushing to GitHub...
git push -u origin main

echo.
echo ==========================================================
echo          Process Complete!
echo ==========================================================
pause
