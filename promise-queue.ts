
/**
 * promise queue
 * 
 * @export
 * @param {(() => Promise<any>)[]} promiseFuncs 
 * @returns {Promise<Array<any>>} 
 */
export function queue(promiseFuncs: ((result: any) => Promise<any>)[]): Promise<Array<any>> {

  var chain: Promise<any>
  var out: Array<any> = []

  promiseFuncs.forEach(func => {
    if (!chain) {
      chain = func(null)
      return
    }

    chain = chain.then(t => {
      out.push(t)
      return func(t)
    })
  })

  return chain.then(t => {
    out.push(t)
    return out
  })
}