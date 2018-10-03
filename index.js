const assert = require('assert');
const isArray = require('lodash/isArray');
const autoBind = require('auto-bind');
const uniq = require('lodash/uniq');

class SnapshotRepositoryInmemory {
    constructor({ aggregates } = {}) {
        assert(aggregates, 'SnapshotRepositoryInmemory: aggregates required');
        assert(
            isArray(aggregates),
            'SnapshotRepositoryInmemory: aggregates must be an array',
        );
        this.aggregates = uniq(aggregates).reduce(
            (accum, aggregate) => ({ ...accum, [aggregate]: {} }),
            {},
        );
        autoBind(this);
    }

    assertValidAggregate(label, aggregateName) {
        assert(
            this.aggregates[aggregateName],
            `event respository: ${label}: unknown aggregate "${aggregateName}"`,
        );
    }

    // eslint-disable-next-line require-await
    async getSnapshot(aggregateName, aggregateId) {
        this.assertValidAggregate('getSnapshot', aggregateName);
        return this.aggregates[aggregateName][aggregateId];
    }

    // eslint-disable-next-line require-await
    async writeSnapshot(aggregateName, aggregateId, snapshot) {
        this.assertValidAggregate('writeSnapshot', aggregateName);
        this.aggregates[aggregateName][aggregateId] = snapshot;
        return true;
    }
}

module.exports = SnapshotRepositoryInmemory;
