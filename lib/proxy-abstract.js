/**
 *
 * @constructor
 */
function ProxyAbstract() {
}

/**
 * should return Request
 * @return {Request}
 */
ProxyAbstract.prototype.request = function () {
    throw new Error('Not implemented');
};

module.exports = ProxyAbstract;
