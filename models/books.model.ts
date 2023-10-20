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
        petitioner: {
            type: String,
            require: [true, 'Solicitante es requerido']
        },
        rack: {
            type: Number,
            require: [true, 'Estante es requerido']
        },
        row: {
            type: Number,
            require: [true, 'Fila es requerido']
        },
    },
    { versionKey: false }
);

booksScheme.pre<IBooks>('save', function (next) {

    next();
});

export interface IBooks extends Document {
    title: string;
    description: string;
    petitioner: string;
    rack: string;
    row: number
}

export interface InterfaceBooks {
    id?: string
    title?: string;
    description?: string;
    petitioner?: string;
    rack?: number;
    row?: number
}


export const Books = model<IBooks>('Books', booksScheme);
