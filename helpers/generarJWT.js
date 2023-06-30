const jwt = require('jsonwebtoken');


const generarJWT = (uid = "") => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPUBLICKEY, {
           expiresIn: '4h'
        },(err, token)=>{
            if(err){
                console.log(err)
                reject('Token incorrecto o caducado')
            }
            else{
                resolve(token)
            }
        })

    })


}




module.exports = generarJWT;