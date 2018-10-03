const test = require('ava');
const shortid = require('shortid');
const SnapshotRepositoryInmemory = require('..');

test('writeSnapshot(), getSnapshot()', async t => {
    const repo = new SnapshotRepositoryInmemory({
        aggregates: ['book', 'author'],
    });

    const bookId = shortid.generate();

    t.deepEqual(
        await repo.getSnapshot('book', bookId),
        undefined,
        'getSnapshot returns undefined if no snapshot exists',
    );

    const snapshot = {
        version: 4,
        state: {
            bookName: 'Ulysses',
            author: 'Joyce',
            yearPublished: 1922,
        },
    };

    t.true(
        await repo.writeSnapshot('book', bookId, snapshot),
        'writeSnapshot returns true after writing snapshot',
    );

    t.deepEqual(
        await repo.getSnapshot('book', bookId),
        snapshot,
        'getSnapshot() finds snapshot stored by writeSnapshot()',
    );

    t.deepEqual(
        await repo.getSnapshot('book', shortid.generate()),
        undefined,
        'getSnapshot() respects aggregate ID',
    );

    t.deepEqual(
        await repo.getSnapshot('author', bookId),
        undefined,
        'getSnapshot() respects aggregate name',
    );
});
