const qrcode = require('qrcode-terminal')
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require("openai")
const mime = require('mime-types');
const chromium = require('chromium');
const request = require('request');
const {execFile} = require('child_process');
const ytdl = require('ytdl-core');
const path = require('path');
const fetch = require('node-fetch');
const fs = require('fs');
(async () => {
  const fetch = await import('node-fetch');
  // use fetch here
})();

const keynya = "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"  //Input your OpenAI api-Key -> https://beta.openai.com/account/api-keys
const configuration = new Configuration({
  apiKey: keynya,
});

const msg = "اشتغل بوتك";

const PathGOG = 'C:\Program Files\Google\Chrome\Application\chrome.exe';
const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        executablePath: chromium.path,
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
    authStrategy: new LocalAuth({ clientId: "client" })
});
const openai = new OpenAIApi(configuration);
let { ucaphalo } = require('./lib');
const { on } = require('events');

const config = {
  name: "XD1",
  author: "Yzyz-AI-Bot"
}

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('message', async (message) => {
    let chat = await message.getChat();
    let {from} = message
    try {
        const body = message.body.toLowerCase()
        const prefix = '#';
		const args = body.trim().split(/ +/).slice(1);
        const isCmd = body.startsWith(prefix);
        let contact = await message.getContact();
        await client.sendSeen(from) 
        if (isCmd) {
			
            const response = await openai.createCompletion({
              model: "text-davinci-003",
              prompt: body.slice(1),
              temperature: 0,
              max_tokens: 1000,
              top_p: 1,
              frequency_penalty: 0.2,
              presence_penalty: 0,
            });
            const resultnya = response.data.choices[0].text;
            client.sendMessage(from ,"YZYZ-AI-BOT " + '\n' + resultnya);
            console.log(`[!] Message From (${contact.pushname}) ~> ${message.body}`)
        } else if (args.length < 2) {
            console.log('recover MSG');
        } 
    } catch (err) {
        console.log(err)
    }
});


//------------------------------admin--------------------------------------------

client.on('message', async (message) => {
  console.log(message.from);
  if(message.from == "966531684687@c.us") {
    try{
      if(message.body.startsWith('ادمن')){
    
    let Admins = JSON.parse(fs.readFileSync('admin.json'));
    let asm = message.body.slice(5);
    Admins.push(asm +'@c.us');
    Admins.sort();

    fs.writeFileSync('admin.json', JSON.stringify(Admins));
    client.sendMessage(message.from , ' تم ادمنته')
}} catch(e){
  console.log(e);
}
  }
});
let Admins = JSON.parse(fs.readFileSync('admin.json'));

client.on('message', async (message) => {
  let Admins = JSON.parse(fs.readFileSync('admin.json'));


  for(let i of Admins){
    if(message.from == i) {
    try{
      if(message.body.startsWith('من الفخم ؟')){
        client.sendMessage(message.from , 'انت افخم واحد بالعالم كله يا حلو')
    

}} catch(e){
  console.log(e);
}
  }}
});
//---------------------------------teams-----------------------------------------


client.on('message', async (message) => {

  try{
    if(message.from == "966551581988-1520100562@g.us"){
      if(message.body === 'فرق'){
        let arr = JSON.parse(fs.readFileSync('names.json'));
        let shuffled = arr.sort(() => 0.5 - Math.random());

        let halfLength = Math.ceil(arr.length / 2);
        let firstHalf = shuffled.slice(0, halfLength);
        let secondHalf = shuffled.slice(halfLength);

        client.sendMessage(message.from ,"الفرق الاول : "+firstHalf);
        client.sendMessage(message.from,"الفرق الثاني : " +secondHalf);
      }
    }
}catch(e){
    console.log(e);
}

});
//-------------------------------------enableS-----------------------------------

client.on('message', async (message) => {
if (message.from === "966551581988-1520100562@g.us" ){  
  if(message.body === 'فعل'){
    client.sendMessage(message.from, 'تم تفعيل التسجيل في اللستة');
    fs.writeFile('./sts.txt', 'on', (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('The file has been updated');
      }
    });

  }else if(message.body === 'عطل'){
    client.sendMessage(message.from, 'تم تعطيل التسجيل في اللستة');
    fs.writeFile('./sts.txt', 'off', (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('The file has been updated');
      }
    });
  }
}
});

//--------------------------GroubList--------------------------------------------

client.on('message', async (message) => {
  let chat = await message.getChat();
  
try{ 

    let sts = fs.readFileSync('./sts.txt', 'utf8');
   if(!chat.isGroup && sts === "on") {
    let info = fs.readFileSync('./info.txt', 'utf8');
    let names = JSON.parse(fs.readFileSync('names.json'));
    if(message.body.startsWith('سجل')){
      let asm = message.body.slice(4);
      let msgl = message.from.slice(0,12);

      console.log(asm);


      if (names.includes(asm)) {
        client.sendMessage(message.from,'موجود بالفعل');
      } else {
        names.push(asm);
        names.sort();
    
        fs.writeFileSync('names.json', JSON.stringify(names));
      }
      let nms = [];

      let n = 1;
      for(let i of names){

         nms.push('\n'+n+' - '+i)
         n++;
      }
 
      let tmren = ` ${info} \n -------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;

      let GRB = `966551581988-1520100562@g.us`;
      client.sendMessage(GRB , tmren);
      client.sendMessage(GRB , "تعديل : "+msgl);



    }
    }} catch(e){
    console.log(e);
  }
});
client.on('message', async (message) => {
  for(let i of Admins){
   if (message.from == i ) {
    if(message.body.startsWith('احذف')){
    
    let asm = message.body.slice(5);
    let info = fs.readFileSync('./info.txt', 'utf8');
    let names = JSON.parse(fs.readFileSync('names.json'));

    // Find the index of the name in the array
    const index = names.indexOf(asm);
  
    // Remove the name from the array
    if (index > -1) {
      names.splice(index, 1);
    }
    // Write the modified array back to the file
    fs.writeFileSync('names.json', JSON.stringify(names));
    let nms = [];
    let n = 1;
    for(let i of names){

       nms.push('\n'+n+' - '+i)
       n++;
    }
    let tmren = ` ${info} \n -------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;

    let GRB = `966551581988-1520100562@g.us`;
    client.sendMessage(GRB , tmren);


  } else if(message.body.startsWith('جدد')){
    let tmrn = message.body.slice(4)
    fs.writeFileSync('names.json', '[]');
    fs.writeFile('./info.txt', tmrn, (error) => {
      if (error) {
        console.error(error);
      } else {
        console.log('The file has been updated');
      }
    });
    

    setTimeout(() => {
      let info = fs.readFileSync('./info.txt', 'utf8');
      let tmren = `${info} \n -------------\n \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;

      let GRB = `966551581988-1520100562@g.us`;
      client.sendMessage(GRB , tmren);

    }, 1500);
  }}
  }
});

//-------------------------------------------------------------------------------

client.on('message', async (message) => {
    let chat = await message.getChat();
    let {from} = message
    try {
        const body = message.body.toLowerCase()
		
        const prefix = '%';
		
        const isCmd = body.startsWith(prefix);
		
		
		
        let contact = await message.getContact();
        await client.sendSeen(from) 
        if (isCmd) {
            let apiKey = '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';
            const headers = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            };
            const moderator = await fetch('https://api.openai.com/v1/images/generations', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        prompt: body.slice(1),
                        n: 1,
                        size: '1024x1024',
                    }),
            });
            const data = await moderator.json();
            console.log(data.data[0].url);
			let media = await MessageMedia.fromUrl(data.data[0].url);
			client.sendMessage(message.from, media);
            
        } 
    } catch (err) {
        console.log(err)
    }
});
//-------------------------------------------imagetest---------------------------


//-------------------------------------------------------------------------------

client.on("ready", () => {
    console.log("Client is ready!");

    setTimeout(() => {
      let chatId = `966531684687@c.us`;
        client.sendMessage(chatId, msg).then((response) => {
            if (response.id.fromMe) {
                console.log("It works!");
            }
        })
    }, 500);
});
//---------------------------test----------------------


//-----------------------------------------------------

client.on('message', async (msg) => {
    if(msg.body === 'الجميع') {
        const chat = await msg.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});
//---------------------youtupe-----------------------------------------------
client.on('message', async (message) => {
    if(message.body.startsWith("ytp")) {
        try {
            const url = message.body.slice(4); // ytp and space : 4 character
            if (ytdl.validateURL(url)) {
				
                ytdl(url, { filter: 'audioonly' }).pipe(fs.createWriteStream('Yzyz-AI-Bot.mp3')).on('finish', () => {
					const bth ='./Yzyz-AI-Bot.mp3';
                    let media = MessageMedia.fromFilePath(bth);
					const PRVT = message.from;
					
                    client.sendMessage(PRVT, media, { sendMediaAsDocument: true });
					console.log(PRVT);
                })
            } else {
                client.sendMessage(message.from, "به بلا رابطك تاكد منه");
            }
        } catch (e){
            console.log(e);
        }
    }
});
//----------------------------------------------------------------------------


client.on('message', async (message) => {
    
    if(message.body.startsWith("شغل")) {

        try {

            const run = message.body.split(' ')[1]; // ytp and space : 4 character
            let sec = message.body.split(' ')[2];
            let num = Number(run);
            let kmtby = num;


            if (typeof num === "number") {
                if (kmtby < 26){
					const min = 0;
					const max = 26;
					const hrof = 'د ط ظ ج ك ز ح م و خ ن ه ت ع ا ل ر ف ب ق ي ث س ص ش ض ذ';
					let hrofary = hrof.split(' ');
					let hrofy = [];
					for(let i =0; i < kmtby; i++){
					let hrf = hrofary[Math.floor(Math.random() * (max - min + 1)) + min];
					hrofy.unshift(hrf)
					}
					let game = 'اللعبة كالتالي حاول تكتب اكثر عدد ممكن من الكلمات باستخدام الحروف التالية: \n ---------------------\n'+hrofy.join(' ')+"\n----------------------";
					client.sendMessage(message.from, game);
          if(typeof sec === "string"){
            client.sendMessage(message.from, 'بدا الوقت');

            const delayInSeconds = sec - 5;
            const codeToExecute = () => {
              client.sendMessage(message.from, 'الوقت سينتهي ........');
            };
            setTimeout(codeToExecute, delayInSeconds * 1000);

            const delayInnSeconds = sec;
            const codeTooExecute = () => {
              client.sendMessage(message.from, 'خلص الوقت!!!!');
              console.log("game run!");
            };
            setTimeout(codeTooExecute, delayInnSeconds * 1000);
            

          }
				}else{
					client.sendMessage(message.from, 'لا تبالغ اكتب رقم اقل من 26 الله لا يهينك  و اكتب الرقم بالانقلش');
				}

            } else {
				
                client.sendMessage(message.from, 'مب تسذا لازم تكتب شغل همن رقم الحروف الي تبي\n مثال : شغل 3');
            }
        } catch (e){
            console.log(e);
        }
    }
});
//---------------------------------------------------------------------------

client.on('message', async (message) => {
  if (message.hasMedia){
    try{
    if (message.body.toLowerCase() === "s") {
      client.sendMessage(message.from, "[⏳] اصبر ..");
      try {
          const media = await message.downloadMedia();
          client.sendMessage(message.from, media, {
              sendMediaAsSticker: true,
              stickerName: config.name, // Sticker Name = Edit in 'config/config.json'
              stickerAuthor: config.author // Sticker Author = Your Whatsapp BOT Number
          }).then(() => {
              client.sendMessage(message.from, "[✅] تم !");
          });
      } catch(e) {
        console.log(e);
          client.sendMessage(message.from, "[❎] به مشكله!");
      }


  } else {
      client.getChatById(message.id.remote).then(async (chat) => {
          await chat.sendSeen();
      });
  }
  }catch(e){
    console.log(e);
  }}
   
});


client.on('message', message => {
  
  // Check if the message body contains "where are you"
  if (message.body.toLowerCase() === "...") {
    // Send a "I'm on my way" message in response
    client.sendMessage(message.from, "اجراء اختبار اتصال !! ");
  }
  
  if (message.body.toLowerCase() === "جدولي") {
    // Get the current day of the week
    const today = new Date().getDay();
    
    // Check the day of the week and send the appropriate response
    if (today === 0) {
      client.sendMessage(message.from, 'اليوم الاحد : لديك محاضرة *تشغيل مركز البيانات* 2 \n موعد المحاضرة الساعة : 4:30 - 7:00 \n القاعة : *1040230112* \n \n المحاضرة الثانية : *انتر نت الأشياء* \n موعد المحاضرة الساعة : 7:03 - 10:22 \n القاعة : *1040210107*');
    } else if (today === 1) {
      client.sendMessage(message.from, 'اليوم الاثنين : لديك محاضرة *تشغيل مركز البيانات* 2 \n موعد المحاضرة الساعة : 4:30 - 7:00 \n القاعة : *1040230112*\n  \n المحاضرة الثانية : *فيزياء* \n موعد المحاضرة الساعة : 7:01 - 9:30 \n القاعة : *1040120112*');
    } else if (today === 2) {
      client.sendMessage(message.from, 'اليوم الثلاثاء : لديك محاضرة *اخلاقيات العمل في تقنية المعلومات* \n موعد المحاضرة الساعة : 4:30 - 6:10  \n القاعة : *1040210112*\n   \n المحاضرة الثانية: *تشغيل مركز البيانات* \n موعد المحاضرة الساعة : 6:12 - 7:50 \n  القاعة : *1040230113*  \n   \n المحاضرة الثالثة : *لغة انجليزية 2* \n موعد المحاضرة الساعة : 7:52 - 10:22 \n القاعة : *1040120107*');
    } else if (today === 3) {
      client.sendMessage(message.from, 'اليوم الاربعاء : لديك محاضرة *فيزياء* \n موعد المحاضرة الساعة : 4:30 - 7:00 \n القاعة : *1040120108* \n  \n المحاضرة الثانية : *لغة انجليزية 2* \n موعد المحاضرة الساعة : 7:03 - 9:34 \n القاعة : *1040120109*');
    } else {
      client.sendMessage(message.from, 'اليوم اجازة لكن تأكد من اذا كان يوجد واجب');
    }
  }
});


client.initialize();