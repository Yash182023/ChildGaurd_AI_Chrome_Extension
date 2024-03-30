# ChildGaurd_AI Chrome Extension

ChildGaurd_AI is a Chrome extension designed to detect explicit images on webpages using a FastAPI backend.

## Functionality

- Automatically scans webpages for explicit images in real-time.
- Notifies users when explicit images are detected.
- Utilizes deep learning models for image analysis.

## Installation

1. Clone or download the repository to your local machine.
2. Open Google Chrome.
3. Navigate to `chrome://extensions/`.
4. Enable "Developer mode" by toggling the switch in the top right corner.
5. Click on "Load unpacked" and select the downloaded extension folder.
6. The ChildGaurd_AI extension should now be installed and visible in your browser toolbar.

## Usage

- The trained model is there in CGAI folder, give it the right path.
- Once installed, the extension runs in the background and automatically scans images on webpages.
- If an explicit image is detected, a notification will pop up to alert the user.
- Click on the notification to view more details about the detected image.

## Note
If you encounter issues with loading the model, you may need to apply the following workaround:

```python
import pathlib
temp = pathlib.PosixPath
pathlib.PosixPath = pathlib.WindowsPath

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests.

## License

This project is licensed under the [MIT License].
