# IHS Monaco Editor (IME)

A custom Monaco-based code editor for IHS Robotics.
![Demo Image](./demo.png)

## Installation

Before installing, you need to install the Node.js dependencies. You need at least Node.js v16.

Linux (Raspbian/Ubuntu/Debian)

```shell
sudo apt-get update
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E shell -
sudo apt-get install -y nodejs
```

Windows/Mac

[nodejs download](https://nodejs.org/en/download)

Then, clone the source files.

`git clone https://github.com/ihsrobotics/IHS-Monaco-Editor.git`

`cd` into the cloned directory, and install all the node modules.

```shell
cd server && npm install
cd ..
```

You only need to install the node modules in the client directory if you are downloading for development. For deployment the stock build files are already in client/dist because it is impossible to build from source on Raspberry Pi 3B due to memory and CPU constraints.

To build from source (for development):

```shell
cd client
npm install
npm run build
#to increase memory allocated to nodejs in case of memory leak (change 2048 to however many MiB you want to allocate):
export NODE_OPTIONS="--max-old-space-size=2048"
```

Finally, serve the frontend and backend.

Backend

```shell
sudo npm install -g pm2
cd server
pm2 start index.js
```

Frontend (you don't necessarily have to use port 3000)

```shell
sudo npm install -g serve
cd client
serve -s dist -l 3000
```

### Start IME Process on Startup

To start IME on startup on linux, edit the crontab file.
To open the crontab file:
`sudo crontab -e`

Then at the first available line, type toe following:

```shell
@reboot pm2 start <your path>/IHS-Monaco-Editor/server/index.js
@reboot serve -s <your path>/IHS-Monaco-Editor/client/dist -l 3000
```

Replace `<your path>` with the path to the cloned folder (such as ~/Documents).

**The address of the editor on the Wombat on AP mode should be `10.42.0.1:3000`, but if that doesn't work you can check the ip using `ifconfig` in the terminal.**

## Roadmap

### Version 1.0.0

- File management
- [Monaco code editor](https://microsoft.github.io/monaco-editor/)
- Compile and run button with project configurations
- Linux terminal
- Custom user settings
- Collaborative editing (only with internet connection or on same device)

### Version 1.1.0

- Compatibility with Raspberry Pi server

### Version 1.2.0

- Complete refactor of source code for easier development and maintenance

### Future Plans

- Download project button
- Custom project tests
- Full (offline) collaborative editing
- Advanced save features
- Python IntelliSense
- C++ IntelliSense
