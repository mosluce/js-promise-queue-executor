
/**
 * promise queue
 * 
 * @export
 * @param {(() => Promise<any>)[]} promiseFuncs 
 * @returns {Promise<Array<any>>} 
 */
export function queue(promiseFuncs: (() => Promise<any>)[]): Promise<Array<any>> {

  var chain: Promise<any>
  var out: Array<any> = []

  promiseFuncs.forEach(func => {
    if (!chain) {
      chain = func()
      return
    }

    chain = chain.then(t => {
      out.push(t)
      return func()
    })
  })

  return chain.then(t => {
    out.push(t)
    return out
  })
}