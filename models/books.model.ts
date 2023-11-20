import { Schema, Document, model } from 'mongoose';

const booksScheme = new Schema(
    {
        title: {
            type: String,
            require: [true, 'Título es requerido']
        },
        description: {
            type: String,
            require: [true, 'Descripción es requerido']
        },
        path: {
            type: String,
            require: [true, 'Es necesario el path del libro']
        }
    },
    { versionKey: false }
);

booksScheme.pre<IBooks>('save', function (next) {

    next();
});

export interface IBooks extends Document {
    title: string;
    description: string;
    path: string;
}

export interface InterfaceBooks {
    id?: string
    title?: string;
    description?: string;
    path?: string;
}


export const Books = model<IBooks>('Books', booksScheme);
