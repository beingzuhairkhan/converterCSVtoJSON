#!/usr/bin/env node

import fs from 'fs';
import csv from 'csv-parser';
import { parse } from 'json2csv';
import { Command } from 'commander';

const program = new Command();

const convertCsvToJson = (inputFile, outputFile) => {
    const results = [];
    fs.createReadStream(inputFile)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
            console.log(`Converted ${inputFile} to ${outputFile}`);
        });
};

const convertJsonToCsv = (inputFile, outputFile) => {
    const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
    const csvData = parse(jsonData);
    fs.writeFileSync(outputFile, csvData);
    console.log(`Converted ${inputFile} to ${outputFile}`);
};

const mergeCsvFiles = (inputFiles, outputFile) => {
    const results = [];
    const promises = inputFiles.map(inputFile => {
        return new Promise((resolve, reject) => {
            fs.createReadStream(inputFile)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', resolve)
                .on('error', reject);
        });
    });

    Promise.all(promises)
        .then(() => {
            const csvData = parse(results);
            fs.writeFileSync(outputFile, csvData);
            console.log(`Merged ${inputFiles.join(', ')} into ${outputFile}`);
        })
        .catch(error => console.error(`Error merging files: ${error}`));
};

const mergeJsonFiles = (inputFiles, outputFile) => {
    const mergedData = [];

    inputFiles.forEach(inputFile => {
        const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
        mergedData.push(...jsonData);
    });

    fs.writeFileSync(outputFile, JSON.stringify(mergedData, null, 2));
    console.log(`Merged ${inputFiles.join(', ')} into ${outputFile}`);
};


// Command to CSV to JSON converter
program
    .command('csv2json <inputFile> <outputFile>')
    .description('Convert CSV to JSON')
    .action(convertCsvToJson);

// Command to JSON to CSV converter
program
    .command('json2csv <inputFile> <outputFile>')
    .description('Convert JSON to CSV')
    .action(convertJsonToCsv);

// Command to merge CSV files
program
    .command('mergeCSV <outputFile> <inputFiles...>')
    .description('Merge multiple CSV files into one')
    .action((outputFile, inputFiles) => {
        mergeCsvFiles(inputFiles, outputFile);
    });    


// Command to merge JSON files
program
    .command('mergeJSON <outputFile> <inputFiles...>')
    .description('Merge multiple JSON files into one')
    .action((outputFile, inputFiles) => {
        mergeJsonFiles(inputFiles, outputFile);
    });    

program.parse(process.argv);
