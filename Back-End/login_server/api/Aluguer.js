const express = require('express');
const router = express.Router();

// mongodb Bicicleta model
const Aluguer = require('../models/Aluguer');

// mongodb Bicicleta model
const Bicicleta = require('../models/Bicicleta');

// mongodb User model
const User = require('./../models/User');

const globalMQTT = require('../server');
const { bulkWrite } = require('../models/Aluguer');

//Adicionar Bicicleta e User
router.post('/addAlugar', (req, res) => {
    let { bike, user } = req.body;
    bike = bike.trim();
    user = user.trim();

    if (!/^[a-zA-Z ]*$/.test(bike)) {
        res.json({
            status: "FAILED",
            message: "Bike introduzida inválida!"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user)) {
        res.json({
            status: "FAILED",
            message: "User introduzido inválido!"
        })
    } else {
        // Verificar se o Aluguer já existe
        Aluguer.find({ bike , available: "false"}).then(result => {
            if (result.length) {
                //já existe o Aluguer 
                res.json({
                    status: "FAILED",
                    message: "Já existe um Aluguer a essa bicicleta."
                })
            } else {
                // Tenta criar um novo aluguer
                const newAluguer = new Aluguer({
                    name: null,
                    bike,
                    user,
                    startHour: Date.now(),
                    endHour: null,
                    hoursUsed: null,
                    price: 0,
                    available: false,
                });

                Bicicleta.find({ name: bike })
                    .then(data => {
                        if (data.length) {
                            Bicicleta.updateOne({ "name": bike }, { "available": false })
                                .then(

                            )
                                .catch((error) => {
                                    console.log(error);
                                });
                        }
                    })

                newAluguer.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "Aluguer guardado com sucesso!",
                        data: result,
                    })
                }).catch(err => {
                    console.log(err);
                    res.json({
                        status: "FAILED",
                        message: "Ocorreu um erro ao criar o aluguer"
                    })
                })
            }

        }).catch(err => {
            console.log(err);
        })
    }
})

router.post('/verificaAluger', (req, res) => {
    let { bike, user } = req.body;
    bike = bike.trim();
    user = user.trim();

    Aluguer.find({ bike, available: "false" })
        .then(data => {
            if (data.length) {
                if (data[0].user != user) {
                    res.json({
                        status: "UNAVAILABLE",
                        message: "A bicicleta já está a ser alugada por outro utilizador!"
                    })
                } else if (data[0].user = user) {
                    if (data[0].available = "false") {
                        res.json({
                            status: "USING",
                            message: "Você já esta a alugar esta bicicleta!"
                        })
                    }
                }
            }else{
                res.json({
                    status: "SUCCESS",
                    message: "Bicicleta disponivel para aluger!"
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
})


router.post('/closeAlugar', (req, res) => {
    let { bike, user } = req.body;
    bike = bike.trim();
    user = user.trim();
    Bicicleta.find({ name: bike }).then(data1 => {

    var oldHoursUsed = data1[0].hoursUsed;
    var priceHour = data1[0].priceHour;
    
    // Check if Bicicleta exist
    Aluguer.find({ bike, available: "false" })
        .then(data => {
            if (data.length) {
                if(data[0].user != user){
                    res.json({
                        message: "Utilizador não autorizado a cancelar este aluger"
                    })
                }
                //Aluguer exists
                const startHour = data[0].startHour;
                const hoursUsed = Math.round(Math.abs(Date.now() - startHour) / 60000)
                const precoTotal = (priceHour * hoursUsed)
                Aluguer.updateOne({ bike, available: "false" }, { "available": true, endHour: Date.now(), hoursUsed: hoursUsed, price: precoTotal })
                    .then(
                        Bicicleta.updateOne({ name: bike }, { "hoursUsed": oldHoursUsed + hoursUsed, "available": true }).
                            then(
                                res.json({
                                    status: "SUCCESS",
                                    message: "Data do Aluguer atualizada",
                                    precoTotal,
                                    hoursUsed
                                }
                                ))
                    )
                    .catch((error) => {
                        console.log(error);
                        res.json({
                            status: "FAILED",
                            message: "Erro ao atualizar data",
                        });
                    });

                Bicicleta.updateOne({ available: true });
            } else {
                res.json({
                    status: "FAILED",
                    message: "Este aluger já não está ativo!"
                })
            }
        })
    .catch(err => {
        console.log(err);
    })
})
})

router.get("/", function (req, res, next) {
    console.log("Aluguer ROUTE!");
    Aluguer.find({}, function (err, allAluguer) {
        if (err) return handleError(err);
        res.json(
            allAluguer
        )
    })
});

module.exports = router;
