// Idee und Implementierung durch Adam
import {serial, text, pgTable } from 'drizzle-orm/pg-core';

const cards = pgTable('vocabulary', {
    id: serial('id').primaryKey(),
    question: text('question'),
    answer: text('answer'),
    set: text('set'),
    status: text('status'),
})

export default  cards;