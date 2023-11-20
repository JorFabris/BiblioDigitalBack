import { Request, Response, Router, raw } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { Books, InterfaceBooks } from '../models/books.model';
import { STATUSES } from '../constants/statuses';
import FileSystem from '../classes/fileSystem';

require('dotenv').config();

const booksRoute = Router();

interface FileUpload {
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

const fileSystem = new FileSystem();

booksRoute.get('/get-books', [verifyToken], async (_: Request, res: Response) => {

    try {
        const books = await Books.find();
        res.status(STATUSES[200].code).json({
            status: STATUSES[200].status,
            body: books
        });
    } catch (error) {
        res.status(500).json({
            status: STATUSES[500].status,
            msg: STATUSES[500].msg
        });
    }

});

const validateFields = (currentValue: any) => currentValue !== undefined


booksRoute.post('/create-book', [verifyToken], async (req: any, res: Response) => {
    const rawBook: InterfaceBooks = {}
    let path: string = '';
    try {

        if (!req.files) {
            return res.status(400).json({
                error: 9003,
                msg: 'No se subio ningun archivo'
            })
        }

        const file: FileUpload = req.files.pdf;
        if (!file) {
            res.json({
                error: 9003,
                msg: 'No se subio ningun archivo - PDF'
            })
        }

        if (!file.mimetype.includes('pdf')) {
            res.json({
                error: 9004,
                msg: 'El archivo tiene que ser un PDF'
            })
        }

        path = await fileSystem.saveFile(file);

    } catch (error) {
        console.log('ERROR FILE UPLOAD', error);

    }

    rawBook.title = req.body.title;
    rawBook.description = req.body.description;
    rawBook.path = path;

    if (Object.values(rawBook).every(validateFields)) {
        try {
            const book = await Books.create(rawBook);
            res.status(STATUSES[200].code).json({
                status: STATUSES[200].status,
                body: book
            });
        } catch (error) {
            console.log('ERROR SAVE', error);

            res.status(500).json({
                status: STATUSES[500].status,
                msg: STATUSES[500].msg
            });
        }
    } else {
        res.status(500).json({
            status: STATUSES[500].status,
            msg: "Todos los campos son necesarios"
        });
    }

});


booksRoute.delete('/delete-book', [verifyToken], async (req: Request, res: Response) => {
    const id = req.query.id;
    try {
        const book = await Books.findById(id);
        const deletedFile = fileSystem.deleteFile(book?.path!)
        if (!deletedFile) {
            return res.status(500).json({
                status: STATUSES[500].status,
                msg: STATUSES[500].msg
            });
        }

        await Books.findByIdAndDelete({ _id: id });
        res.status(STATUSES[200].code).json({
            status: STATUSES[200].status,
            msg: "Libro eliminado con exito"
        });

    } catch (error) {
        res.status(500).json({
            status: STATUSES[500].status,
            msg: STATUSES[500].msg
        });
    }

});

booksRoute.get('/files', [verifyToken], (req: Request, res: Response) => {
    const fileName = String(req.query.fileName)!;
    const filePath = fileSystem.getFile(fileName);
    res.sendFile(filePath);
});



export default booksRoute;