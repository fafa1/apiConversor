const path = require('path')
  merge = require('merge-img')
  pdf = require('pdf-poppler')
  bodyParser = require('body-parser')
  multiparty = require('connect-multiparty')
  fs = require('fs')

const cors = require('cors')
const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('uploads/', express.static('public'))

app.post('/pdfFile', multiparty(), (req, res) => {
  let tmp_path = req.files.arquivo.path
  let target_path = '' + req.files.arquivo.name

  // mudar o local do arquivo
  fs.rename(tmp_path, target_path, err => {
    if (err) console.log(err)
  })
  let nomeArquivo = req.files.arquivo.originalFilename

  let opts = {
    format: 'jpg',
    out_dir: path.dirname(nomeArquivo),
    out_prefix: nomeArquivo.replace(".",""),
    page: null
  }
  
  // funcao para conversao do pdf e merge
  async function paginas (page) {
    let listFIle = [] 
    for(let i = 1; i <= page; i++) {
      let nomeFile = `${nomeArquivo.replace(".","")}-${i}.jpg`
      if (i <= 9  && page > 9) {
      nomeFile = `${nomeArquivo.replace(".","")}-0${i}.jpg`
      }
      listFIle.push(nomeFile)
    }
    
    await pdf.convert(nomeArquivo, opts)
    .then(res => {
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
        link = 'uploads/Convertido_'+nomeArquivo.replace(" ","_").replace(".pdf","")+'.jpg'
        img.write(link, _ => console.log('Feito com sucesso!'))
        res.send(`Convertido_${nomeArquivo.replace(" ","_").replace("pdf", "jpg")}`)
        
        console.log("para apagar")
        listFIle.push(nomeArquivo)
        // remover arquivo pdf e as imagens particionadas
        listFIle.forEach(elemento => {
          fs.unlinkSync(`${elemento}`, err => {
            if(err) return console.log(err)
            console.log(target_path + 'removidos com sucesso')
          })
        })
      }).catch(error => {
        console.log(error)
        res.status(500).send('Sem sucesso!!')
      })
    }
    
    pdf.info(nomeArquivo)
    .then(resul => { 
      paginas(resul.pages)
    })
})

  app.listen(4004, function () {
    console.log('Example app listening on port 4004!')
  })