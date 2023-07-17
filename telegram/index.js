const TelegramBot = require("node-telegram-bot-api");
const axios = require('axios');


const token = "6081196761:AAHTUAfSnOG9PyLWh7kt46lZsnsbWY_IjiI";
const bot = new TelegramBot(token,{polling:true})

async function getUser(tgID){
  try{
    const response = await axios.get(`http://localhost:3000/api/user/get?id=${tgID}`);
    console.log(response);
    return response;
  } catch (err){
   // console.error(err);
    return err;
  }
}

async function createUser(tgID, username){
  axios.post('http://localhost:3000/api/user/create', {
    "id": tgID,
    "name": username,
    "number": 111,
    "spent": 11 
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}



bot.on("polling_error", console.log);

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    if(msg.text == "/start"){
      async function check(){
        const response = await getUser(chatId);
        let role = '';
        if(response.status == 200){
          if(response.data.role == "CUSTOMER"){
            role = "Клиент";
          }
          else if (response.data.role == "ADMIN"){
            role = "Администратор";
          }

          if(role == "Клиент"){
            var options = {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{text: 'Пироги', callback_data: "1" },
                   {text: "Торты", callback_data: "2"}]
                ]
              })
            }
            bot.sendMessage(msg.chat.id, "Меню:", options)
          }

          if(role == "Администратор"){
            var options = {
              reply_markup: JSON.stringify({
                inline_keyboard: [
                  [{text: "Заказы", callback_data: "99"}]
                ]
              })
            };
            bot.sendMessage(msg.chat.id, "Меню администратора:", options);
          }

          //bot.sendMessage(msg.chat.id, `Добро пожаловать, ${response.data.name}, ваша роль: ${role}`);
        }
        else if(response.code == "ERR_BAD_REQUEST"){
          console.log("work")
          createUser(chatId, msg.chat.username);
          check()
        }

        return role;
      }
      check();
    
      
      
    }
    
    });

    bot.on('callback_query', function onCallbackQuery(callbackQuery) {
      const action = callbackQuery.data;
      const msg = callbackQuery.message;
      const opts = {
        chat_id: msg.chat.id,
        message_id: msg.message_id,
      };



    })
