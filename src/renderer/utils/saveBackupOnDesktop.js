import util from 'util'
import glob from 'glob'
import path from 'path'
import fs from 'fs'
import getPath from 'platform-folders'
import JSZip from 'jszip'
import electron from 'electron'
const zip = new JSZip()

export default function () {
  const userDataPath = (electron.app || electron.remote.app).getPath('userData')
  const passwords = zip.folder('passwords')
  return util
    .promisify(glob)(path.join(userDataPath, '/passwords/*'), null)
    .then((files) => {
      for (const file of files.filter((file) => file.endsWith('.json'))) {
        const { name, ext } = path.parse(file)
        passwords.file(`${name}${ext}`, fs.readFileSync(file))
      }
      zip.generateAsync({ type: 'uint8array' }).then(function (content) {
        let index = 0
        const desktopPath = getPath('desktop')
        let passwordsPath = `${desktopPath}/lp-passwords (${index}).zip`
        while (fs.existsSync(passwordsPath)) {
          index++
          passwordsPath = `${desktopPath}/lp-passwords (${index}).zip`
        }
        util.promisify(fs.writeFile)(passwordsPath, content)
      })
    })
}
