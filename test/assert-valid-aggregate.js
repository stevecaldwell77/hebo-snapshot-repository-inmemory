const test = require('ava');
const shortid = require('shortid');
const SnapshotRepositoryInmemory = require('..');

test('writeSnapshot() - aggregate must be defined in constructor', async t => {
    const repo = new SnapshotRepositoryInmemory({
        aggregates: ['book', 'author'],
    });

    const snapshot = {
        version: 4,
        state: {
            bookName: 'Ulysses',
            author: 'Joyce',
            yearPublished: 1922,
        },
    };

    await t.notThrows(
        repo.writeSnapshot('book', shortid.generate(), snapshot),
        'able to call writeSnapshot to first aggregate',
    );

    await t.notThrows(
        repo.writeSnapshot('author', shortid.generate(), snapshot),
        'able to call writeSnapshot to second aggregate',
    );

    await t.throws(
        repo.writeSnapshot('publisher', shortid.generate(), snapshot),
        /unknown aggregate "publisher"/,
        'error thrown when writeSnapshot called with unknown aggregate',
    );
});

test('getEvents() - aggregate must be defined in constructor', async t => {
    const repo = new SnapshotRepositoryInmemory({
        aggregates: ['book', 'author'],
    });

    await t.notThrows(
        repo.getSnapshot('book', shortid.generate()),
        'able to call getSnapshot to first aggregate',
    );

    await t.notThrows(
        repo.getSnapshot('author', shortid.generate()),
        'able to call getSnapshot to second aggregate',
    );

    await t.throws(
        repo.getSnapshot('publisher', shortid.generate()),
        /unknown aggregate "publisher"/,
        'error thrown when getSnapshot called with unknown aggregate',
    );
});
