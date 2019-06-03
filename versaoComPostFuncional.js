const path = require('path')
  merge = require('merge-img')
  pdf = require('pdf-poppler')
  bodyParser = require('body-parser')
  multiparty = require('connect-multiparty')
  fs = require('fs')

const multipartMiddleware = multiparty({ uploadDir: 'uploads/'}) // ou na raiz  APICONVERSOR

const cors = require('cors')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
// usando o middleware multiparty para tratar os arquivos que chega

app.post('/pdfFile', multipartMiddleware, (req, res) => {
  console.log(req.files.arquivo)
  arquivoPDF = req.files.arquivo
  // passo o nome do arquivo como parameto uma vez que o arquivo esta na pasta
  converterMerge(req.files.arquivo.name)
})

// ver para colocar no final
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// função para converter, separar e fazer o merge dos arquivos
function converterMerge(file) {
   console.log(file)
  //let file = 'aline.pdf' 

  let opts = {
    format: 'jpg',
    out_dir: path.dirname(file),
    out_prefix: file.replace(".",""),
    page: null
  }


  let listFIle = [] 
  // funcao para conversao do pdf e merge
  async function paginas (page) {
    //console.log(page)
    for(let i = 1; i <= page; i++) {
      let nomeFile = `${file.replace(".","")}-${i}.jpg`
      listFIle.push(nomeFile)
    }

    // espero pela conversão para depois fazer o merge
    await pdf.convert(file, opts)
      .then(res => {
        //res.sendFile(res)
          console.log('Convertido com sucesso!');
      })
      .catch(error => {
        console.error(error);
    })

    merge(listFIle,
      Option = {
      direction: true,
      })
        // Salvar imagem como um arquivo
      .then((img) => {
        link = 'Convertido_'+file.replace(" ","_").replace(".pdf","")+'.jpg'
        img.write(link, _ => console.log('Feito com sucesso!'))
    })  
  }

  // método criado para acessar o número de páginas para gerar o loop
  pdf.info(file)
    .then(resul => {
      paginas(resul.pages)
  })
}
