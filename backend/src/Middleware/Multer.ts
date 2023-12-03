import multer from "multer";


function errorHandle () {
  console.log('Error')
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'src/public')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
const upload = multer({ storage: storage })

export {upload};
