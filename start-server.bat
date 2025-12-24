@echo off
echo 正在启动校园外卖平台...
echo.
echo 请选择启动方式:
echo 1. 使用Python启动 (需要安装Python)
echo 2. 使用Node.js启动 (需要安装Node.js)
echo 3. 直接打开HTML文件
echo.
set /p choice=请输入选择 (1-3): 

if "%choice%"=="1" (
    echo 使用Python启动服务器...
    python -m http.server 8000
    echo 请在浏览器中访问: http://localhost:8000
) else if "%choice%"=="2" (
    echo 使用Node.js启动服务器...
    npx serve . -p 8000
    echo 请在浏览器中访问: http://localhost:8000
) else if "%choice%"=="3" (
    echo 直接打开HTML文件...
    start index.html
) else (
    echo 无效选择，直接打开HTML文件...
    start index.html
)

pause