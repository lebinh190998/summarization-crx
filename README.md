# Web-Summarization

## Set up your environment

### 1. Installing Node.js

Node.js is a JavaScript runtime that allows you to run JavaScript on the server side. This project may require Node.js to manage dependencies and run scripts.

Follow these steps to install Node.js:

#### For Windows:

1. Visit the Node.js official website at https://nodejs.org/.
2. Download the recommended version for Windows.
3. Run the installer and follow the installation instructions.
4. To verify the installation, open a command prompt and type the following commands:

```bash
node -v
npm -v
```

#### For macOS:

1. You can install Node.js on macOS using Homebrew, a package manager:

```bash
brew install node
```

2. To verify the installation, open your terminal and type the following commands:

```bash
node -v
npm -v
```

#### For Linux:

1. You can install Node.js on Linux using a package manager such as apt or yum. The specific command may vary depending on your distribution. For example, on Ubuntu, you can use:

```bash
sudo apt-get install nodejs
```

2. To verify the installation, open a terminal and type the following commands:

```bash
node -v
npm -v
```

### 2. Installing Python

Python is a versatile programming language and is used for a wide range of applications, including data processing and web development. This project may require Python for various scripts and tools.

Follow these steps to install Python:

#### For Windows, macOS, and Linux:

1. Visit the Python official website at https://www.python.org/.
2. Download the latest version of Python.
3. Run the installer and follow the installation instructions.
4. To verify the installation, open a command prompt or terminal and type the following command:

```bash
python --version
```

## Set up project locally

### Backend:

1. Open the terminal, navigate to this repo directory and run this command to initiate a virtual environment.

```bash
cd ./server
python3 -m venv .venv
source .venv/bin/activate
```

2. Install required packages. Run this command.

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

3. Run the server locally.

```python
python run.py
```

4. You can test the endpoints separatedly at http://0.0.0.0:8000/docs#/

## Frontend:

1. Open another terminal, navigate to `/summarization-crx`, install the required packages

```bash
npm install
```

2. Build a chrome extension for local use

```bash
npm run build
```

This should create a `/build` directory in your project.

3. Go to chrome://extensions/ in your Chrome, click `Load unpacked` and select this `/build` directory created in step 2
4. Start the local development package,

```bash
npm run start
```

5. Profit
