import { arr2text, arr2hex, hex2bin, bin2hex, randomBytes } from 'uint8-util'

(async () => {
  if (process.argv.length<4){
    console.log("usage: buroinfohash appId roomName")
    process.exit(1)
  }
  const libName = "Trystero" // https://github.com/dmotz/trystero/blob/90efaa193c3a7382a70c38e302f15910aff83447/src/utils.js#L47
  const appId = process.argv[2]
  const roomName = process.argv[3]
  const hashLimit = 20

  const encodeBytes = txt => new TextEncoder().encode(txt)

  try {
    const hash = await crypto.subtle
      .digest('SHA-1', encodeBytes(`${libName}:${appId}:${roomName}`))
      .then(buffer =>
        Array.from(new Uint8Array(buffer))
          .map(b => b.toString(36))
          .join('')
          .slice(0, hashLimit)
      )
    const hexHash = bin2hex(hash)
    console.log(hexHash)
  } catch (e) {
    throw e
    // Deal with the fact the chain failed
  }
  // `text` is not available here
})();
