const client = require('./client')

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('views', path.join(__dirname,'views'))
app.set('view engine','hbs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    client.getAll(null, (err,data)=>{
        if(!err){
            res.render("pacientes",{
                results:data.pacientes
            })
            console.log(data.pacientes)
        }
    })
})

app.post('/save',(req,res)=>{
    let novoPaciente = {
        nome: req.body.nome,
        cartaoSus: req.body.cartaoSus,
        dataNascimento: req.body.dataNascimento
    }
    client.insert(novoPaciente, (err,data)=>{
        if(err) throw err;

        console.log("Paciente Inserido com sucesso", data);
        res.redirect('/')
    })
})

app.post('/update', (req,res)=>{
    const novoPaciente ={
        id:req.body.id,
        nome:req.body.nome,
        cartaoSus:req.body.cartaoSus,
        dataNascimento:req.body.dataNascimento
    }
    client.update(novoPaciente,(err,data)=>{
        if(err) throw err;

        console.log('Paciente atualidado com sucesso',data)
        res.redirect('/')
    })
})
app.post('/remove',(req,res)=>{
    client.remove({id:req.body.paciente_id}, (err, _)=>{
        if(err) throw err;
    
        console.log('Paciente removido com sucesso')
        res.redirect('/')
    })
   
})
app.listen(4000,()=>{
    console.log("Client Rodando na porta 4000")
})