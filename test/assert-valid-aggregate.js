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

    await t.notThrowsAsync(
        repo.writeSnapshot('book', shortid.generate(), snapshot),
        'able to call writeSnapshot to first aggregate',
    );

    await t.notThrowsAsync(
        repo.writeSnapshot('author', shortid.generate(), snapshot),
        'able to call writeSnapshot to second aggregate',
    );

    await t.throwsAsync(
        repo.writeSnapshot('publisher', shortid.generate(), snapshot),
        /unknown aggregate "publisher"/,
        'error thrown when writeSnapshot called with unknown aggregate',
    );
});

test('getEvents() - aggregate must be defined in constructor', async t => {
    const repo = new SnapshotRepositoryInmemory({
        aggregates: ['book', 'author'],
    });

    await t.notThrowsAsync(
        repo.getSnapshot('book', shortid.generate()),
        'able to call getSnapshot to first aggregate',
    );

    await t.notThrowsAsync(
        repo.getSnapshot('author', shortid.generate()),
        'able to call getSnapshot to second aggregate',
    );

    await t.throwsAsync(
        repo.getSnapshot('publisher', shortid.generate()),
        /unknown aggregate "publisher"/,
        'error thrown when getSnapshot called with unknown aggregate',
    );
});
