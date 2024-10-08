import fs from 'fs';
import path from 'path';

export const createDirectorySync = (directoryPath: string): boolean => {
  try {
    fs.statSync(directoryPath);
    // console.log(`Directory already exists!: ${directoryPath}`);
    return false;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      try {
        fs.mkdirSync(directoryPath);
        // console.log(`Successfully created directory: ${directoryPath}`);
        return true;
      } catch (err) {
        console.log(`Failed to create directory! ${err}`);
      }
    } else {
      console.log(`Error encountered while checking directory: ${err}`);
    }
  }

  return false;
};

export const createDirectory = async (directoryPath: string) => {
  try {
    await fs.promises.access(directoryPath, fs.constants.F_OK);
    const stats = await fs.promises.stat(directoryPath);
    if (stats.isDirectory()) return false;
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.promises.mkdir(directoryPath, { recursive: true });
      return true;
    } else {
      console.log(error);
    }
  }

  return false;
};

export const createFileSync = (fileName: string, filePath: string) => {
  try {
    if (!fs.existsSync(filePath + '/' + fileName)) {
      fs.writeFileSync(filePath + '/' + fileName, '');
      return true;
    }

    return false;
  } catch (error) {
    console.log(`Error encountered while creating directory: ${error}`);
    console.log(error);
  }
};

export const createFile = async (fileName: string, filePath: string) => {
  try {
    if (await isFilePresent(filePath + '/' + fileName)) {
      console.log(`File already exists. File Name: ${fileName} - File Path: ${filePath}`);
    } else {
      await fs.promises.writeFile(filePath + '/' + fileName, '');
    }
  } catch (error) {
    console.log(`Error encountered while creating directory: ${error}`);
    console.log(error);
  }
};

export const copyFileToDirectorySync = (sourceFile: string, destinationDirectory: string) => {
  try {
    const destinationPath = path.join(destinationDirectory, path.basename(sourceFile));
    if (fs.existsSync(destinationPath)) {
      console.log(`File already exists. Aborting copy operation...`);
    } else {
      fs.copyFileSync(sourceFile, destinationPath);
      console.log(`File successfully copied from: ${sourceFile} to: ${destinationDirectory}`);
    }
  } catch (error) {
    console.log(`Error encountered while copying file...`);
    console.log(error);
  }
};

export const copyFileToDirectory = async (sourceFile: string, destinationDirectory: string) => {
  try {
    const destinationPath = path.join(destinationDirectory, path.basename(sourceFile));

    if (await isFilePresent(destinationPath)) {
      console.log(`File already exists. Aborting copy operation...`);
    } else {
      await fs.promises.copyFile(sourceFile, destinationPath);
      console.log(`File successfully copied from: ${sourceFile} to: ${destinationDirectory}`);
    }
  } catch (error) {
    console.log(`Error encountered while copying file...`);
    console.log(error);
  }
};

export const renameFileSync = (oldFilePath: string, newFilePath: string): boolean => {
  try {
    if (fs.existsSync(newFilePath)) {
      console.log(`Renamed file already exists. Aborting renaming operation...`);
    } else {
      fs.renameSync(oldFilePath, newFilePath);
      console.log(`Successfully renamed file from: ${oldFilePath} to: ${newFilePath}`);
      return true;
    }
  } catch (error) {
    console.log(`Failed to rename file...`);
  }

  return false;
};

export const renameFile = async (oldFilePath: string, newFilePath: string): Promise<boolean> => {
  try {
    if (await isFilePresent(newFilePath)) {
      console.log(`Renamed file already exists. Aborting renaming operation...`);
    } else {
      await fs.promises.rename(oldFilePath, newFilePath);
      console.log(`Successfully renamed file from: ${oldFilePath} to: ${newFilePath}`);
      return true;
    }
  } catch (error) {
    console.log(`Failed to rename file...`);
  }

  return false;
};

export const writeToFileSync = (filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content, { flag: 'a' });
  } catch (error) {
    console.log(`Failed to write to file: ${filePath}`);
  }
};

export const writeToFile = async (filePath: string, content: string) => {
  try {
    await fs.promises.writeFile(filePath, content, { flag: 'a' });
    console.log(`Added content: ${content} - FilePath: ${filePath}`);
  } catch (error) {
    console.log(`Failed to write to file: ${filePath}`);
  }
};

export const overwriteFileContentSync = (filePath: string, content: string) => {
  try {
    fs.writeFileSync(filePath, content);
  } catch (error) {
    console.log(`Failed to write to file: ${filePath}`);
  }
};

export const overwriteFileContent = async (filePath: string, content: string) => {
  try {
    await fs.promises.writeFile(filePath, content);
    console.log(`Added content: ${content} - FilePath: ${filePath}`);
  } catch (error) {
    console.log(`Failed to write to file: ${filePath}`);
  }
};

export const isDirectoryPresentSync = (directoryPath: string): boolean => {
  return fs.existsSync(directoryPath) ? true : false;
};

export const isDirectoryPresent = async (directoryPath: string): Promise<boolean> => {
  try {
    await fs.promises.access(directoryPath, fs.promises.constants.F_OK);
    const stats = await fs.promises.stat(directoryPath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
};

export const isFilePresentSync = (filePath: string) => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    const stats = fs.statSync(filePath);
    return stats.isFile();
  } catch (error) {
    return false;
  }
};

export const isFilePresent = async (filePath: string) => {
  try {
    await fs.promises.access(filePath, fs.promises.constants.F_OK);
    const stats = await fs.promises.stat(filePath);
    return stats.isFile();
  } catch (error) {
    return false;
  }
};

export const deleteDirectorySync = (directoryPath: string) => {
  try {
    if (fs.existsSync(directoryPath)) {
      const files = fs.readdirSync(directoryPath);

      for (const file of files) {
        const fullPath = path.join(directoryPath, file);

        if (fs.lstatSync(fullPath).isDirectory()) {
          deleteDirectorySync(fullPath);
        } else {
          fs.unlinkSync(fullPath);
        }
      }

      fs.rmdirSync(directoryPath);
      console.log(`Successfully deleted directory: ${directoryPath}`);
    } else {
      console.log(`No such directory exists. Attempted to delete: ${directoryPath}`);
      console.log(`No such directory exists. Attempted to delete: ${directoryPath}`);
    }
  } catch (error) {
    console.log(`Error encountered while deleting directory: ${directoryPath}. Error: ${error}`);
    console.log(error);
  }
};

export const deleteDirectory = async (directoryPath: string) => {
  try {
    if (await isDirectoryPresent(directoryPath)) {
      const files = await fs.promises.readdir(directoryPath);

      for (const file of files) {
        const fullPath = path.join(directoryPath, file);

        if ((await fs.promises.lstat(fullPath)).isDirectory()) {
          await deleteDirectory(fullPath);
        } else {
          await fs.promises.unlink(fullPath);
        }
      }

      await fs.promises.rmdir(directoryPath);
      console.log(`Successfully deleted directory: ${directoryPath}`);
    } else {
      console.log(`No such directory exists. Attempted to delete: ${directoryPath}`);
      console.log(`No such directory exists. Attempted to delete: ${directoryPath}`);
    }
  } catch (error) {
    console.log(`Error encountered while deleting directory: ${directoryPath}. Error: ${error}`);
    console.log(error);
  }
};

export const deleteFileSync = (filePath: string) => {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`File: ${filePath} - successfully deleted`);
    } else {
      console.log(`No such file exists. File Path: ${filePath}`);
    }
  } catch (error) {
    console.log(`Error encountered while deleting file: ${error}`);
  }
};
