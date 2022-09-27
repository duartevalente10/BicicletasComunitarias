const express = require('express');
const router = express.Router();

// mongodb Bicicleta model
const Bicicleta = require('./../models/Bicicleta');


const globalMQTT = require('../server');

//Adicionar Bicicleta
router.post('/addBike', (req, res) => {
    let { name, priceHour, imageUrl } = req.body;
    name = name.trim();
    priceHour = priceHour.trim();
    imageUrl = imageUrl.trim();
    

    if (name == "" || priceHour == "" || imageUrl == "") {
        res.json({
            status: "FAILED",
            message: "Tem campos em branco!"
        });
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Nome introduzido inválido!"
        })
    } else if (!/^[-+]?[0-9]+\.[0-9]+$/ .test(priceHour)) {
        res.json({
            status: "FAILED",
            message: "Preço por hora introduzido inválido!"
        })
    } else {
        // Verificar se a bicicleta já existe
        Bicicleta.find({ name }).then(result => {
            if (result.length) {
                //Ja existe a bicicleta
                res.json({
                    status: "FAILED",
                    message: "Já existe uma bicicleta com esse nome."
                })
            } else {
                // Tenta criar uma nova bicicleta
                const newBicicleta = new Bicicleta({
                    name,
                    priceHour,
                    latitude: '39.60199',
                    longitude: '-8.40924',
                    hoursUsed: '0',
                    available: true,
                    imageUrl
                });

                newBicicleta.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "Bicicleta criada com sucesso!",
                        data: result,
                    })
                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "Ocorreu um erro ao criar a bicicleta"
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: "FAILED",
                message: "Ocorreu um erro ao procurar a bicicleta existente!"
            })
        })
    }
})

router.post('/DataReload', (req, res) => {
    let { name } = req.body;
    name = name.trim();
    // Check if Bicicleta exist
    Bicicleta.find({ name })
        .then(data => {
            if (data.length) {
                //Bicicleta exists

                Bicicleta.updateOne({name: name}, {latitude: 6.5652}, {longitude: 56.255})
                    .then(
                        res.json({
                            message: "Data da bicicleta atualizada",
                        })
                    )
                    .catch((error) => {
                        console.log(error);
                        res.json({
                            status: "FAILED",
                            message: "Erro ao atualizar data",
                        }); 
                    });

}else {
    res.json({
        status: "FAILED",
        message: "Bicicleta não existe!"
    })
}
    })
    .catch(err => {
        res.json({
            status: "FAILED",
            message: "Ocorreu um erro ao procurar por bicicleta existente."
        })
    })
})

router.get("/", function (req, res, next) {
    console.log("Bike ROUTE!");
    Bicicleta.find({}, function (err, allBikes) {
        if (err) return handleError(err);
        res.json(
            allBikes
        )
      })
  });

module.exports = router;

