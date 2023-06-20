const { Router } = require('express');
const { Dogis, Temperament } = require('../db');
const { API_KEY } = process.env;
const express = require('express');
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

let apiLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`

const getApiData = async() => {
    
    const apiData = await axios.get(apiLink);
    const apiInfo = await apiData.data.map(element => {
    let temperamentArray = [];
    if (element.temperament) {//pregunto si existe el temperamento y lo devuelvo en un arreglo
        temperamentArray = element.temperament.split(", ");
    }
    
    let heightArray = [];
    if (element.height.metric) {//pregunto si existe el alto y lo devuelvo en un arreglo
        heightArray = element.height.metric.split(" - ");
    }

    let weightArray = [];
    if (element.weight.metric) {//pregunto si existe el peso y lo devuelvo en un arreglo
        weightArray = element.weight.metric.split(" - ");
    }
        return {
            id: element.id,
            image: element.image.url,
            name: element.name,
            height: heightArray,
            weight: weightArray,
            life_span: element.life_span,
            temperaments: temperamentArray,
            
        }
    })
return apiInfo;
}

//-- trayendo la data de la base de datos posgrest--//
const getFromDb = async () => {
    return await Dogis.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], //selecciono el atributo que quiero extraer del array Temperament, el id lo trae automatico
            through: {
                attributes: [],
            },
        }
    })
};

//combino toda la data de la base de datos con la data de la Api
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
}

router.get('/dogs', async(req, res) => {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));//si el perro existe guardame sus parametros aca.
        dog.length ? res.status(200).send(dog) : res.status(404).send("el perro no existe"); 
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:idRaza", async(req, res) => {//traer la info de un perro por su id, del modelo raza
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(element => element.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Perro no encontrado en la base de datos");
    }
});

router.get("/temperament", async (req, res) => {
    const temperamentsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(element => {
        let i = element.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
});

router.post("/dog", async (req, res) => {
    let {
     name,
     min_height,
     max_height,
     min_weight,
     max_weight,
     life_span,
     temperaments,
     image
    } = req.body
 
    const fixedHeight = []
    const minHeight = min_height;
    const maxHeight = max_height;
    fixedHeight.push(minHeight, maxHeight)
 
    const fixedWeight = []
    const minWeight = min_weight;
    const maxWeight = max_weight;
    fixedWeight.push(minWeight, maxWeight)
 
    let dog = await Dogis.create({
     name,
     height: fixedHeight,
     weight: fixedWeight,
     life_span,
     image: image ? image : "https://www.publicdomainpictures.net/pictures/220000/velka/chiens-chiots-golden-retriever.jpg",
     
    })
 
    let associatedTemp = await Temperament.findAll({
        where: { name: temperaments},
    })
 
    dog.addTemperament(associatedTemp);
 
    res.status(200).send("Mascota creada correctamente")
})

router.use(express.json());

module.exports = router;
