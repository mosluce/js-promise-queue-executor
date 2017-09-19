"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * promise queue
 *
 * @export
 * @param {(() => Promise<any>)[]} promiseFuncs
 * @returns {Promise<Array<any>>}
 */
function queue(promiseFuncs) {
    var chain;
    var out = [];
    promiseFuncs.forEach(func => {
        if (!chain) {
            chain = func();
            return;
        }
        chain = chain.then(t => {
            out.push(t);
            return func();
        });
    });
    return chain.then(t => {
        out.push(t);
        return out;
    });
}
exports.queue = queue;
