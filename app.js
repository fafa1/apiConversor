const path = require('path')
  merge = require('merge-img')
  pdf = require('pdf-poppler')

const express = require('express')
const app = express()

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

app.use(express.static('template'))

app.get('/imagem', function(req, res) {
  res.send('teste imagem')
})

app.post('/pdfFile', upload.single('filePDF'),
  (req, res) => res.send('<h3>Upload realizado com sucesso</h3>'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
/* Valor recebido pelo post
  #nome do arquivo
  #formato do arquivo defaul jpg
*/

// a variável file recebe o nome do arquivo por meio da rota post
// let file = 'emanuel.pdf' 

// // opção de setar o formato vai ser passado pelo post por default vai ser jpg
// let opts = {
//   format: 'jpg',
//   out_dir: path.dirname(file),
//   out_prefix: file.replace(".",""),
//   page: null
// }

// pdf.info(file)
//   .then(resul => {
//     console.log(resul)
// })

// // faz a conversão e usa o res.sendFile do express para mandar para a página
// pdf.convert(file, opts)
//     .then(res => {
//       //res.sendFile(res)
//         console.log('Convertido com sucesso!');
//     })
//     .catch(error => {
//       console.error(error);
// })



// 2 Parte

// Recebe o arquivos pelo post em um objeto e acesso cada um e passo na função merge
// o formato da imagem tem que ser setado pelo usuario logo recebe pelo post também
/*
merge(['0001.jpg', '0002.jpg', '0003.jpg', '0004.jpg','0005.jpg', '0006.jpg'],
  Option = {
  // vertical
  direction: true,
  })
  .then((img) => {
    console.log(img)
    // Salvar imagem como um arquivo
    img.write('merge.jpg', () => console.log('Feito com sucesso!'));
  })
*/