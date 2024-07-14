import path from 'path';
import { searchFiles } from './util/util';

export type FileInfo = {
  baseName: string;
  mockFileName: string;
  fileType: string;
  filePath: string;
};

export interface FileLoaderInterface {
  objectPropertyFilter(data: Object[], { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] }): Object[];
  arrayFilter(data: Object[], { reverse, include, exclude }: { reverse?: boolean; include?: string[]; exclude?: string[] }): Object[];
}

export default class FileLoader implements FileLoaderInterface {
  private prefix: string;
  private searchDirectory: string;

  constructor({ prefix, searchDirectory }: { prefix: string; searchDirectory?: string }) {
    this.prefix = prefix;
    this.searchDirectory = searchDirectory || 'default';
  }

  protected loadFiles({ searchDirectory = 'default', fileTypes, excludeDirectories }: { searchDirectory: string | 'default'; fileTypes: string[]; excludeDirectories: string[] }) {
    try {
      let directoryPath: string;

      if (searchDirectory === 'default') {
        // load project root directory
        directoryPath = path.resolve(process.cwd());
      } else {
        directoryPath = searchDirectory;
      }

      const files = searchFiles(directoryPath, fileTypes, excludeDirectories);

      const prefixedFiles = files.filter((file) => {
        const splitName = path.basename(file).split('.');
        return splitName[splitName.length - 2] === this.prefix;
      });

      return prefixedFiles.map((file) => {
        const baseName = path.basename(file);
        const extension = path.extname(file);
        const fileName = baseName.replace('.' + this.prefix, '').replace(extension, '');

        return {
          baseName: baseName,
          mockFileName: fileName,
          fileType: extension.replace('.', ''),
          filePath: file
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  objectPropertyFilter(data: Object[], { reverse, include, exclude }: { reverse: boolean; include: string[]; exclude: string[] }): Object[] {
    try {
      const includeList = data.map((data) => {
        const mappedData = {};
        for (const [key, value] of Object.entries(data)) {
          if (include?.length > 0 && !include.includes(key)) {
            continue;
          }

          mappedData[key] = value;
        }
        return mappedData;
      });

      const excludeList = includeList.map((data) => {
        const mappedData = {};
        for (const [key, value] of Object.entries(data)) {
          if (exclude?.includes(key)) {
            continue;
          }

          mappedData[key] = value;
        }

        return mappedData;
      });

      return reverse ? excludeList.reverse() : excludeList;
    } catch (error) {
      console.log('Failed to apply filters to mock data');
    }
  }

  arrayFilter(data: Object[], { reverse, include, exclude }: { reverse: boolean; include: string[]; exclude: string[] }): object[] {
    return data;
  }
}
