import fs from 'fs';
import path from 'path';
import csvtojson from 'csvtojson';

/**
 * Checks if a file has a specific extension.
 * @param {string} ext - The target file extension to check against (e.g., ".txt", ".pdf").
 * @param {string} filePath - The path to the file including its name and extension.
 * @returns {boolean} - Returns true if the file's extension matches the provided extension; otherwise, false.
 */
export const isFileOfType = (ext: string, filePath: string): boolean => {
  const extension = path.extname(filePath).toLowerCase();
  return extension === ext;
};

/**
 * Converts a CSV file to JSON format.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<string>} - A Promise that resolves to a JSON string representing the data from the CSV file.
 */
export const jsonFromCsvFile = async (filePath: string): Promise<string> => {
  try {
    if (isFileOfType('.csv', filePath)) {
      return JSON.stringify(await csvtojson().fromFile(filePath));
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Parses a JSON string and converts it into a JavaScript object.
 * @param {string} jsonData - The JSON string to parse.
 * @returns {Promise<object>} - A Promise that resolves to a JavaScript object parsed from the JSON string.
 */
export const jsonToObject = async (jsonData: string): Promise<object> => {
  try {
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Converts a CSV file to a JavaScript object.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<object>} - A Promise that resolves to a JavaScript object representing the data from the CSV file.
 */
export const csvToJsObject = async (filePath: string): Promise<object> => {
  try {
    const data = await jsonFromCsvFile(filePath);
    return await jsonToObject(data);
  } catch (error) {
    console.error(error);
  }
};

/**
 * Recursively searches for files with specified extensions in a directory. `Hidden files are ignored`.
 * @param {string} directory - The directory to start the search from.
 * @param {string[]} extensions - An array of file extensions to search for.
 * @param {string[]} [ignoredDirectories=[]] - An optional array of directory names to ignore.
 * @param {string[]} [storeDirectories=[]] - An optional array to store the found file paths.
 * @returns {string[]} An array of file paths matching the specified extensions.
 */
export const searchFiles = (directory: string, extensions: string[], ignoredDirectories: string[] = [], storeDirectories: string[] = []): string[] => {
  if (extensions.length === 0) return [];

  try {
    const files = fs.readdirSync(directory);

    files.forEach((file) => {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);
      const isIgnoredDirectory = ignoredDirectories.find((directory) => stats.isDirectory() && file.includes(directory));

      if (stats.isDirectory() && !isIgnoredDirectory) {
        searchFiles(filePath, extensions, ignoredDirectories, storeDirectories);
      } else if (extensions.find((ext) => path.extname(filePath) === ext)) {
        storeDirectories.push(filePath);
      }
    });

    return storeDirectories;
  } catch (error) {
    console.log(error);
  }
};

export const toBoolean = (bool: string): boolean => {
  if (bool === 'true') return true;
  else if (bool === 'false') return false;
  else return undefined;
};
