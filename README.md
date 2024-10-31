
# CSV-to-JSON Converter

A command-line interface (CLI) tool for converting CSV files to JSON format and vice versa, with additional options for merging multiple CSV or JSON files. This package facilitates easy data manipulation and integration into larger projects.

## Features

- 🛠 **Convert CSV to JSON**
- 🔄 **Convert JSON to CSV**
- 📂 **Merge Multiple CSV Files into One**
- 🗂 **Merge Multiple JSON Files into One**

---

## Installation

To install the package, run:

```bash
npm install convertcsvtojson
```

---

## CLI Usage

### Convert CSV to JSON
```bash
convertcsvtojson csv2json <inputFile> <outputFile>
```

**Example:**
```bash
convertcsvtojson csv2json data.csv data.json
```

### Convert JSON to CSV
```bash
convertcsvtojson json2csv <inputFile> <outputFile>
```

**Example:**
```bash
convertcsvtojson json2csv data.json data.csv
```

### Merge Multiple CSV Files
```bash
convertcsvtojson mergeCSV <outputFile> <inputFiles...>
```

**Example:**
```bash
convertcsvtojson mergeCSV merged.csv file1.csv file2.csv
```

### Merge Multiple JSON Files
```bash
convertcsvtojson mergeJSON <outputFile> <inputFiles...>
```

**Example:**
```bash
convertcsvtojson mergeJSON merged.json file1.json file2.json
```

---

## Programmatic Usage

You can also import and use the functions directly in your Node.js project.

### Importing Functions

```javascript
import {
    convertCsvToJson,
    convertJsonToCsv,
    mergeCsvFiles,
    mergeJsonFiles
} from 'convertcsvtojson';
```

### Using the Functions

#### Convert CSV to JSON
```javascript
convertCsvToJson('data.csv', 'data.json')
    .then(() => console.log('CSV successfully converted to JSON!'))
    .catch(err => console.error('Error converting CSV to JSON:', err));
```

#### Convert JSON to CSV
```javascript
convertJsonToCsv('data.json', 'data.csv')
    .then(() => console.log('JSON successfully converted to CSV!'))
    .catch(err => console.error('Error converting JSON to CSV:', err));
```

#### Merge Multiple CSV Files
```javascript
mergeCsvFiles(['file1.csv', 'file2.csv'], 'merged.csv')
    .then(() => console.log('CSV files successfully merged!'))
    .catch(err => console.error('Error merging CSV files:', err));
```

#### Merge Multiple JSON Files
```javascript
mergeJsonFiles(['file1.json', 'file2.json'], 'merged.json')
    .then(() => console.log('JSON files successfully merged!'))
    .catch(err => console.error('Error merging JSON files:', err));
```

---

## License

This project is licensed under the MIT License.

--- 

## Contribution

Contributions are welcome! Feel free to submit issues or pull requests.

