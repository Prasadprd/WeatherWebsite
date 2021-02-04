const path = require('path')

const express = require('express')
const hbs = require('hbs')

const Geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')

//Setup the port number 
const port = process.env.PORT || 3000

//Define paths for Express config
const pubicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../template/views')
const partialsPath = path.join(__dirname,'../template/partials')


//setup handlebars engine and views location
const app =express()
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(pubicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name:'Prasad Chaudhari'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'This is about ',
        name : 'Prasad Chaudhari'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'This is Help Page.Hello',
        name :'Prasad Chaudhari'
    })
})



app.get('/weather',(req,res)=>{
    const address=req.query.address
    if(!req.query.address){
       return res.send({error :'You must provide an address'})
    }
    Geocode(address,(err,{location, Latitude, Longitude}={})=>{
        if(err){
            return res.send({
                error : err
            })
        }
    
        forecast(Latitude,Longitude,(err,foreCastData)=>{
            if(err){
                return res.send({
                    error : err
                })
            }
            res.send({
                location :location,
                forecast: foreCastData,
                address
            })
        })
    })   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error :'Please provide a search term'
        })
    }
    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req,res)=>{
    res.render('404Error',{
        title : 'This is Error page',
        name :'Prasad Chaudhari',
        errorMessage: 'Help article not found.'
    })
})

app.listen(port,()=>{
    console.log('Server is running')
})