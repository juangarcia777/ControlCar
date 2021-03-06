const connection = require("../config/db");
const requestStatus = require("../utils/requestStatus");
//let User = require('./user.model');

exports.getCars = async (req, res) => {
  try {
    connection.getConnection((error, tempCont) => {
      if (!!error) {
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      } else {
        console.log("Conected! 🚀 ");

        tempCont.query("SELECT * FROM cars", (error, rows, fields) => {
          //tempCont.release();
          if (!!error) {
            return res
              .status(requestStatus.BAD_REQUEST) 
              .json({ message: "Erro ao tentar buscar no banco" });
          } else {
            return res.status(requestStatus.OK).json(rows);
          }
        });
      }
    });
  } catch (error) {
    return res.status(requestStatus.BAD_REQUEST).json(error);
  }
};

exports.getCarsById = async (req, res) => {
    try {
      connection.getConnection((error, tempCont) => {
        if (!!error) {
          tempCont.release();
          return res
            .status(requestStatus.BAD_REQUEST)
            .json({ message: "Erro ao conectar no banco" });
        } else {
          console.log("Conected! 🚀 ");

          var id= req.params.id;
  
          tempCont.query(`SELECT A.*,C.* FROM users AS A INNER JOIN cars_users AS B ON A.id = B.user INNER JOIN cars AS C ON B.car = C.id WHERE A.id='${id}'`, (error, rows, fields) => {
            //tempCont.release();
            if (!!error) {
              return res
                .status(requestStatus.BAD_REQUEST)
                .json({ message: "Erro ao tentar buscar no banco" });
            } else {
              return res.status(requestStatus.OK).json(rows); 
            }
          });
        }
      });
    } catch (error) {
      return res.status(requestStatus.BAD_REQUEST).json(error);
    }
  };


exports.createCars = async (req, res)=>{
  try {

    const recebe = req.body;

    connection.getConnection((error, tempCont)=>{
      if(!!error){
        tempCont.release();
        return res
          .status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco" });
      }else{
        console.log('Conected!  🚀');
        //console.log('Dentro do else', recebe);
        try {
          recebe.map(async(value) => {
            await tempCont.query(`INSERT INTO cars (carro, placa, cor, foto ) VALUES ('${value.carro}', '${value.placa}','${value.cor}','${value.foto}')`, (error, rows, fields)=>{})
           });

          res.status(requestStatus.CREATED_STATUS).json({"MESSAGE":"Gravado com Sucesso !"});


           tempCont.release();
        } catch (error) {
          return res.status(requestStatus.BAD_REQUEST)
          .json({ message: "Erro ao conectar no banco try" });
        } 

      }
});

  } catch (error) {
    return res.status(400).json(error);
  }
}

  


