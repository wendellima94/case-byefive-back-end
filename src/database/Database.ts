import mongoose from 'mongoose';

type TInput = {
  db: string;
}

export default ({db}: TInput) => {
  
  const connect = () => {
    mongoose
      .connect(
        db,
        {
          useNewUrlParser: true,        
          useUnifiedTopology: true,
          useFindAndModify: false,
          useCreateIndex: true
        }
      )
      .then(() => {
        return console.log(`Conexão com MongoDB realizada com sucesso! ${db}`);
      })
      .catch(error => {
        console.error('Conexão com MongoDB não foi realizada: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
