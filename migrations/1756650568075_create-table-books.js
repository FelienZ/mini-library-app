export const shorthands = undefined;
export const up = (pgm) => {
    pgm.createTable('books', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true
        },
        title: {
            type: 'VARCHAR(50)',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(50)',
            notNull: true 
        },
        year: {
            type: 'INT',
            notNull: true
        },
        description: {
            type: 'TEXT'
        }
    })
};

export const down = (pgm) => {
    pgm.dropTable('books')
};
