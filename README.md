# html2markdown

A Node.js tool to download HTML from URLs and convert it to Markdown format.

## Features

- Download HTML content from any URL
- Convert HTML to clean Markdown format
- Automatically removes script tags and their contents
- Customizable output filename
- Can be used as a CLI tool or as a module

## Installation

```bash
npm install -g html2markdown
# or
yarn global add html2markdown
```

## Usage

### As a CLI tool

Basic usage (auto-generated filename):
```bash
html2md https://example.com
```

Specify output filename:
```bash
html2md https://example.com output.md
```

The first command will:
1. Download the HTML from the URL
2. Convert it to Markdown
3. Save it to an auto-generated file (e.g., `example-com-20231024123456.md`)
4. Print the filename where the Markdown was saved

The second command will save the output to the specified file (`output.md`).

### As a Module

Basic usage (auto-generated filename):
```javascript
const html2markdown = require('html2markdown');

html2markdown('https://example.com')
    .then(markdown => {
        console.log('Conversion complete!');
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

Specify output filename:
```javascript
html2markdown('https://example.com', 'output.md')
    .then(markdown => {
        console.log('Conversion complete!');
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
```

## License

MIT
