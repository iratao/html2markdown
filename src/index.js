const axios = require('axios');
const TurndownService = require('turndown');
const fs = require('fs').promises;
const { URL } = require('url');
const jsdom = require('jsdom');

async function html2markdown(url, outputFile = null) {
    try {
        // Download HTML content
        const response = await axios.get(url);
        const html = response.data;

        // Convert HTML to Markdown
        const turndownService = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced',
            remove: ['script'] // Remove script tags and their contents
        });
        
        // Remove any remaining script tags manually
        const { JSDOM } = jsdom;
        const dom = new JSDOM(html);
        const scripts = dom.window.document.getElementsByTagName('script');
        while(scripts.length > 0){
            scripts[0].parentNode.removeChild(scripts[0]);
        }
        
        const markdown = turndownService.turndown(dom.window.document.body.innerHTML);

        // Generate filename from URL if not provided
        const filename = outputFile || (() => {
            const urlObj = new URL(url);
            const hostname = urlObj.hostname.replace(/[^a-zA-Z0-9]/g, '-');
            const timestamp = new Date().toISOString().replace(/[^0-9]/g, '');
            return `${hostname}-${timestamp}.md`;
        })();

        // Save to file
        await fs.writeFile(filename, markdown, 'utf8');
        console.log(`Markdown saved to: ${filename}`);

        return markdown;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = html2markdown;
