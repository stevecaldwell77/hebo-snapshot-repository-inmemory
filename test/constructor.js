const test = require('ava');
const SnapshotRepositoryInmemory = require('..');

test('constructor - aggregates is required', t => {
    t.throws(
        () => new SnapshotRepositoryInmemory(),
        /aggregates required/,
        'aggregates required',
    );

    t.throws(
        () => new SnapshotRepositoryInmemory({ aggregates: null }),
        /aggregates required/,
        'aggregates cannot be null',
    );

    t.throws(
        () => new SnapshotRepositoryInmemory({ aggregates: undefined }),
        /aggregates required/,
        'aggregates cannot be undefined',
    );
});

test('constructor - aggregates must be array', t => {
    t.throws(
        () => new SnapshotRepositoryInmemory({ aggregates: { foo: {} } }),
        /aggregates must be an array/,
        'aggregates cannot be an object',
    );
});
