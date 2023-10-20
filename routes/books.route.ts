import { Request, Response, Router } from 'express';
import { verifyToken } from '../middlewares/verifyToken';
import { Books, InterfaceBooks } from '../models/books.model';
import { STATUSES } from '../constants/statuses';

require('dotenv').config();

const booksRoute = Router();


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


booksRoute.post('/create-book', [verifyToken], async (req: Request, res: Response) => {
    const rawBook: InterfaceBooks = {}
    rawBook.title = req.body.title;
    rawBook.description = req.body.description;
    rawBook.petitioner = req.body.petitioner;
    rawBook.rack = Number(req.body.rack);
    rawBook.row = Number(req.body.row);

    if (Object.values(rawBook).every(validateFields)) {
        try {
            const book = await Books.create(rawBook);
            res.status(STATUSES[200].code).json({
                status: STATUSES[200].status,
                body: book
            });
        } catch (error) {
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

booksRoute.put('/update-book', [verifyToken], async (req: Request, res: Response) => {
    const rawBook: InterfaceBooks = {}
    rawBook.title = req.body.title;
    rawBook.description = req.body.description;
    rawBook.petitioner = req.body.petitioner;
    rawBook.rack = Number(req.body.rack);
    rawBook.row = Number(req.body.row);

    if (Object.values(rawBook).every(validateFields)) {
        try {
            const book = await Books.findByIdAndUpdate({ _id: req.body._id }, rawBook, { new: true });
            res.status(STATUSES[200].code).json({
                status: STATUSES[200].status,
                body: book
            });
        } catch (error) {
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


export default booksRoute;