import fs from 'fs';
import path from 'path';
import uniqid from 'uniqid';


export interface FileUpload {
    name: string;
    data: any;
    encoding: string;
    size: number;
    tempFilePath: string;
    trucated: boolean;
    mimetype: string;
    md5: string;
    mv: Function;
}

export default class FileSystem {
    constructor() { }


    saveFile(file: FileUpload) {

        return new Promise<string>((resolve, reject) => {

            //Creacion de carpetas
            const pathDir = path.resolve(__dirname, '../books');

            //nombre de archivo
            const nombreArchivo = this.generateUniqueName(file.name);

            //Mover el archivo a nuestro temp
            file.mv(`${pathDir}/${nombreArchivo}`, (err: any) => {
                if (err) {//no se pudo mover
                    reject(err);
                } else { //Todo salio bien
                    resolve(nombreArchivo)
                }
            });

        })

    }

    deleteFile(fileName: string) {

        return new Promise<boolean>((resolve, reject) => {
            const pathDir = path.resolve(__dirname, '../books', fileName);
            if (fs.existsSync(pathDir)) {
                fs.rmSync(pathDir);
                resolve(true);
            } else {
                reject(false)
            }
        })

    }

    private generateUniqueName(originalName: string) {

        const nombreSplited = originalName.split('.');
        const extension = nombreSplited[nombreSplited.length - 1];

        const nombreUnico = uniqid();

        return `${nombreUnico}.${extension}`;

    }


    getFile(fileName: string) {
        const pathFile = path.resolve(__dirname, '../books', fileName);

        return pathFile;
    }
}