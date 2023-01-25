const qrcode = require('qrcode-terminal')
const { Client, LocalAuth, MessageMedia, Buttons } = require('whatsapp-web.js');
const { Configuration, OpenAIApi } = require("openai")

const ytdl = require('ytdl-core');
const fs = require('fs');
const QRD = require('qrcode');
const { encode } = require('url-encode-decode');

var qrCode = require('qrcode-reader');
var path = require("path")
const jimp = require("jimp");

const keynya = "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"  //Input your OpenAI api-Key -> https://beta.openai.com/account/api-keys
const configuration = new Configuration({
  apiKey: keynya,
});

const NMTM = require('./Neams/neams.json');

const msg = "اشتغل بوتك";
const AdminMSG = '966531684687@c.us';



const client = new Client({
    restartOnAuthFail: true,
    puppeteer: {
        headless: true,
        executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        args: [ '--no-sandbox', '--disable-setuid-sandbox' ]
    },
    authStrategy: new LocalAuth({ clientId: "client" })
});
const openai = new OpenAIApi(configuration);

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
const readQRCode = async (fileName) => {
    const filePath = path.join(__dirname, fileName)
    try {
        if (fs.existsSync(filePath)) {
            const img = await jimp.read(fs.readFileSync(filePath));
            const qr = new qrCode();
            const value = await new Promise((resolve, reject) => {
                qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
                qr.decode(img.bitmap);
            });
            return  value.result;
        }
    } catch (error) {
        return error.message
    }
}

//----------------------------------------ForCopy---------------------------------------------
/*
client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{



			// Enable GRB thinks
			


		}catch(e){
			console.log(e);
		}
	}
});

client.on('message', async message => {
	let Admins = JSON.parse(fs.readFileSync('admin.json'));
	let contact = await message.getContact();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsAdmin = chkN(Admins,contact.number);
	console.log(contact.number);
	
	if(IsAdmin) {
		try{


			// admin thinks


		}catch(e){
			console.log(e);
		}
	}
});
*/
//---------------------------------------------------------------------------------------
let engrb;
//------------------------AskEnable----------------------------

client.on('message', async message => {
	
	let chat = await message.getChat();
	
	if(message.body === 'طلب تفعيل'){
		engrb = chat.id._serialized;
		client.sendMessage(message.from , 'تم ارسال طلب التفعيل سيتم تفعيل البوت في حال تم قبول الطلب')
		let button = new Buttons(`يريد المستخدم ${chat.id.user} استخدام البوت`,[{ id: 'en', body: 'قبول' }, { id: 'dis', body: 'رفض' }]);
		await client.sendMessage(AdminMSG, button);
		await message.react('⏳');
	}else {
		if (message.type == 'buttons_response') {
			const { selectedButtonId: buttonid } = message;
			if (buttonid == 'en') {
				await message.react('⏳');
				try {
						  
	  				let cchats = JSON.parse(fs.readFileSync('chats.json'));
	 				client.sendMessage(engrb , 'تم قبول طلب التفعيل بالقروب الان يمكنكم استخدام البوت');
	  				cchats.push(engrb);
  
	  				fs.writeFileSync('chats.json', JSON.stringify(cchats));
					await message.react('✅');
  
				} catch {
					await message.react('❌');
				}
			} else if (buttonid == 'dis') {
				await message.react('❌');				try {
					client.sendMessage(engrb ,'نعتذر ولكن تم رفض طلب تفعيل البوت');
				} catch {
					await message.react('❌');
				}
			}
		}
	}


	let chta = JSON.parse(fs.readFileSync('chats.json'));
	
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{
      
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



			// Enable GRB thinks
			


		}catch(e){
			console.log(e);
		}
	}
});



//------------------------------admin--------------------------------------------



//---------------------------------teams-----------------------------------------



//-------------------------------------enableS-----------------------------------

client.on('message', async (message) => {
	let contact = await message.getContact();

	if(contact.number === "966531684687") {
	  try{
		if(message.body.startsWith('ادمن')){
	  
	  let Admins = JSON.parse(fs.readFileSync('admin.json'));
	  let asm = message.body.slice(5);
	  let snding = asm+'@c.us'
	  client.sendMessage(snding , 'مبروك لقد اصبحت مديراً 🎉');
	  Admins.push(asm);
	  Admins.sort();
  
	  fs.writeFileSync('admin.json', JSON.stringify(Admins));
	  client.sendMessage(message.from , '👍🏻تم اضافتة كمدير')
  }} catch(e){
	console.log(e);
  }
	}

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

//--------------------------GroubList--------------------------------------------
let adminGrb = ['966551581988-1520100562@g.us','966531684687@c.us','966530566588@c.us'];
let kth;
let kth3=' حتى يتم اضافة سعر الملعب';
let tmrn = ' ';
let mygrb = '966551581988-1520100562@g.us';
let sts = 'on';
client.on('message', async (message) => {
    let contact = await message.getContact();
    let names = JSON.parse(fs.readFileSync('names.json'));
    let ksmh = names.length+1;
	const cont = await message.getContact()
    let kth2 = parseInt(kth, 10) / ksmh;
    kth3 = Math.ceil(kth2);
    let chat = await message.getChat();
    let msg = 'قم بالرد على هذه الرسالة بكتابة معلومات التمرين';
    let msg2 = ' قم بالرد على هذه الرسالة بالمعلومات الجديدة';
    const RD = await message.getQuotedMessage();
   
    if(contact.number === '966531684687'){
        if (message.body.startsWith('Pass')){
            client.sendMessage(message.from,'تم تغيير رمز التفعيل');
            PassWord = message.body.slice(4);
        }else if(message.body.startsWith('Pass1')){
            client.sendMessage(message.from,'تم تغيير رمز التفعيل');
            PassWord1 = message.body.slice(5);
        }else if(message.body === 'Menu'){
            client.sendMessage(message.from,menu);
        }
    }
    if(message.from == adminGrb[0]){
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
    console.log(adminGrb[0]);
    function chkN(arr, str) {
        return arr.includes(str);
      }
    let IsTmren = chkN(adminGrb,chat.id._serialized);
    if(message.hasQuotedMsg){
        let button3 = new Buttons(`تم انشاء تمرين هل تريد التسجيل ؟`,[{ id: 'yp', body: ' َسجلن ' },{ id: 'la', body: 'كسل الصدز'}]);

        if(IsTmren){
        let tst = RD.body
        if(tst === msg){
            if(IsTmren){
                    const chat = await message.getChat();
                    for(let participant of chat.participants) {
                        const contact = await client.getContactById(participant.id._serialized);
						setTimeout(() => {
							client.sendMessage(contact.id._serialized,button3);
						  }, 500);
                    }
            tmrn = message.body;
            fs.writeFileSync('names.json', '[]');
            kth3=' حتى يتم اضافة سعر الملعب';
                setTimeout(() => {
                let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
                client.sendMessage(adminGrb[0] , tmren);
                sts = 'on';
                client.sendMessage(adminGrb[0],' تم تفعيل التسجيل تلقائيا');
                }, 1500);
        }}else if( msg2 ===  tst ){
            if(IsTmren){
            let names = JSON.parse(fs.readFileSync('names.json'));
            tmrn=message.body;
            let nms = [];
            let n = 1;
            for(let i of names){
      
               nms.push('\n'+n+' - '+i)
               n++;
            }
            let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
            client.sendMessage(adminGrb[0] , tmren);
        }}
        
    }}
    if(message.body.startsWith('احسب')){
        kth = message.body.slice(5);

        client.sendMessage(message.from , ' تم اضافة الحسبة سيتم حساب القطة مع كل تسجيل جديد');
    
      }else if(IsTmren){
        if(message.body.startsWith('احذف')){
    
            let asm = message.body.slice(5);
            let names = JSON.parse(fs.readFileSync('names.json'));
        
            const index = names.indexOf(asm);
          
            if (index > -1) {
              names.splice(index, 1);
            }
            fs.writeFileSync('names.json', JSON.stringify(names));
            let nms = [];
            let n = 1;
            for(let i of names){
        
               nms.push('\n'+n+' - '+i)
               n++;
            }
          
            let tmren = ` ${tmrn}\n القطة : ${kth3} \n -------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
        
            client.sendMessage(adminGrb[0] , tmren);
        
        
          }

      }


   if(message.body.startsWith('تمرين')){
    if(IsTmren){
    let button = new Buttons(`وش تبي تسوي ؟\n\n اوامر اخرى للمدراء\n\n لاضافة القطة اكتب احسب ثم سعر الملعب\n\n  لحذف شخص اكتب احذف ثم اسم الشخص المراد حذفة`,[{ id: 'list', body: 'انشاء لستة جديدة' },{ id: 'sts', body: 'تعديل حالة التسجيل'},{ id: 'edit', body: 'تعديل معلومات اللستة' }]);
    await client.sendMessage(message.from , button);
   }}else {
    if (message.type == 'buttons_response') {
        const { selectedButtonId: buttonid } = message;
        if (buttonid == 'list') {
            try {

                client.sendMessage(message.from ,msg);

                  //list
            } catch {
                await message.react('❌');
            }
        } else if (buttonid == 'sts') {
                try {
                    let button2 = new Buttons(`تريد تفعيل التسجيل ام تعطيله ؟`,[{ id: 'f3l', body: 'تفعيل' },{ id: 'atl', body: 'تعطيل'}]);
                    await client.sendMessage(message.from , button2);

                    //sts

            } catch {
                await message.react('❌');
            }
        }else if (buttonid == 'edit') {
                try {
                    client.sendMessage(message.from , msg2);
            } catch {
                await message.react('❌');
            }
        }else if (buttonid == 'f3l') {
            try {
                //on
                sts = 'on';
                client.sendMessage(adminGrb[0] , 'تم تفعيل التسجيل في اللستة');
        } catch {
            await message.react('❌');
        }
    }else if (buttonid == 'atl') {
        try {
            //off
            sts = 'off';
            client.sendMessage(adminGrb[0] , 'تم تعطيل التسجيل في اللستة');
    } catch {
        await message.react('❌');
    }
    }
}
}
if(!chat.isGroup && sts === "on") {
    let names = JSON.parse(fs.readFileSync('names.json'));
	let nm = cont.id._serialized;
    let asm = NMTM[nm];
    if (message.type == 'buttons_response') {
        const { selectedButtonId: buttonid } = message;
      
      if(buttonid == 'yp') {
        let msgl = message.from.slice(0,12);
        names.push(asm);
        names.sort();
        fs.writeFileSync('names.json', JSON.stringify(names));
        let nms = [];
      let n = 1;
      for(let i of names){
         nms.push('\n'+n+' - '+i)
         n++;
      }
      let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
      client.sendMessage(adminGrb[0] , tmren);
      client.sendMessage(adminGrb[0] , "تعديل : "+msgl);



      } else if(buttonid == 'la'){
        client.sendMessage(message.from, 'يا سفابك');

      }
    }
	
	if(message.body.startsWith('لعب')){
		let button3 = new Buttons(`تم انشاء تمرين هل تريد التسجيل ؟`,[{ id: 'yp', body: ' َسجلن ' },{ id: 'la', body: 'كسل الصدز'}]);
		client.sendMessage(message.from,button3);
	}


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
        let nms = [];
      let n = 1;
      for(let i of names){
         nms.push('\n'+n+' - '+i)
         n++;
      }
      let tmren = ` ${tmrn}\n القطة : ${kth3} \n --------------\n${nms} \n --------------\n للتسجيل ارسلي بالخاص كلمة سجل ثم اسمك \n \n  مثال: سجل يزيد`;
      client.sendMessage(adminGrb[0] , tmren);
      client.sendMessage(adminGrb[0] , "تعديل : "+msgl);
      }}
    }
    });
//-------------------------------------------------------------------------------

client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{
      
            let chat = await message.getChat();
            let {from} = message
            try {
                const body = message.body.toLowerCase()
                
                const prefix = '%';
                
                const isCmd = body.startsWith(prefix);
                
                
                
                let contact = await message.getContact();
                await client.sendSeen(from) 
                if (isCmd) {
                    
                    const response = await openai.createImage({
                        prompt: body.slice(1),
                        n: 1,
                        size: "1024x1024",
                      });
                    image_url = response.data.data[0].url;


                    console.log(image_url);
                    let media = await MessageMedia.fromUrl(image_url);
                    client.sendMessage(message.from, media);
                    
                } 
            } catch (err) {
                console.log(err)
            }
                    
        
        
                }catch(e){
                    console.log(e);
                }
	}
});

//-------------------------------------------imagetest---------------------------

client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{
			let contact = await message.getContact();
			const RD = await message.getQuotedMessage();
		
			if(message.body.startsWith('ms')){
				let msg = message.body.slice(2);
				let cod = encode(msg);
				let url = `https://wa.me/?text=${cod}`;
				client.sendMessage(message.from , url);
			}
			let chat = await message.getChat();
			
			if(message.body === 'اصنع لي رابط'){
		
				let button = new Buttons(`تريد رابط مع ارفاق رسالة للمحادثة ؟`,[{ id: 'yes', body: 'ايه' }, { id: 'no', body: 'لا' }]);
				await client.sendMessage(message.from , button);
				await message.react('⏳');
			}else {
				if (message.type == 'buttons_response') {
					const { selectedButtonId: buttonid } = message;
					if (buttonid == 'yes') {
						await message.react('⏳');
						try {
							let rfk = 'قم بالرد على هذه الرسالة بالرسالة المطلوب ارفاقها';
		
							client.sendMessage(message.from , rfk);
		  
						} catch {
							await message.react('❌');
						}
					} else if (buttonid == 'no') {
						await message.react('⏳');			
							try {
								let numb = contact.number;
		
							client.sendMessage(message.from ,`اليك الرابط المطلوب : \n https://wa.me/${numb} `);
						} catch {
							await message.react('❌');
						}
					}
				}
			}
			let numb = contact.number;
			let rfk = 'قم بالرد على هذه الرسالة بالرسالة المطلوب ارفاقها';
			if(message.hasQuotedMsg){
				let tst = RD.body;
			if(tst === rfk){
				let msgg = message.body;
				let cod = encode(msgg);
				client.sendMessage(message.from ,`اليك الرابط المطلوب : \n https://wa.me/${numb}?text=${cod}`);
		
			}
				
			}
			if (message.body.toLowerCase() === "rd" &&  message.type == 'image') {
				let imageBuffer = await message.downloadMedia();
				fs.writeFileSync('./image.jpg', JSON.stringify(imageBuffer.data), "base64", (err) => {
					if (err) {
						console.error(err);
						return;
					}
				});
		
				let msg = await readQRCode('./image.jpg');
				await client.sendMessage(message.from,msg);
		  
		
			}
		
			
			if (message.body.startsWith('qr')){

				let qd = message.body.slice(2);
				await message.react('⏳');
				let qr = await QRD.toFile('./img.png',qd ,{ scale: '100' });
				let meda =  MessageMedia.fromFilePath('./img.png');
				await client.sendMessage(message.from, meda).then(async () => {
					await message.react('✅');
				});
				
		
			}
			



		}catch(e){
			console.log(e);
		}
	}
});

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
client.on('message', async message => {

	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{
      if(message.body === 'الجميع') {
        const chat = await message.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }




			// Enable GRB thinks
			


		}catch(e){
			console.log(e);
		}
	}
});


//---------------------youtupe-----------------------------------------------
const config = require('./config/config.json');
let data;
client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{
			let url = message.body;
			let chatId = message.from;
		
				if (ytdl.validateURL(url)) {
					let button = new Buttons(`تبيي تحمل *فيديو* ولا *صوت* ؟`,[{ id: 'mp3', body: 'صوت' }, { id: 'mp4', body: 'فيديو' }]);
					data = url;
					await client.sendMessage(chatId, button);
				} else {
					if (message.type == 'buttons_response') {
						const { selectedButtonId: buttonid } = message;
						if (buttonid == 'mp3' && !data == '') {
							await message.react('⏳');
							try {
								ytdl(data, { filter: 'audioonly', format: 'mp3', quality: 'highest' }).pipe(fs.createWriteStream(`./database/download.mp3`)).on('finish', async () => {
									const media = await MessageMedia.fromFilePath("./database/download.mp3");
									media.filename = `${config.filename.mp3}.mp3`;
									await client.sendMessage(chatId, media, { sendMediaAsDocument: true,sendAudioAsVoice:true });
									await message.react('✅');
								});
							} catch {
								await message.react('❌');
							}
						} else if (buttonid == 'mp4' && !data == '') {
							await message.react('⏳');
							try {
								ytdl(data, { filter: 'audioandvideo', format: 'mp4', quality: 'highest' }).pipe(fs.createWriteStream(`./database/download.mp4`)).on('finish', async () => {
									const media = MessageMedia.fromFilePath("./database/download.mp4");
									media.filename = `${config.filename.mp4}.mp4`;
									await client.sendMessage(chatId, media, { sendMediaAsDocument: true });
									await message.react('✅');
								});
							} catch {
								await message.react('❌');
							}
						}
					}
				}			


		}catch(e){
			console.log(e);
		}
	}
});

//----------------------------------------------------------------------------

client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		try{

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



			// Enable GRB thinks
			


		}catch(e){
			console.log(e);
		}
	}
});

//---------------------------------------------------------------------------

client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	console.log(IsEnable);
	if(IsEnable) {
		try{
			let contact = await message.getContact();
			let config = {
				name: contact.pushname,
				author: "YzyzBot"
			  }
			if (message.body.toLowerCase() === "s") {
				const RD = await message.getQuotedMessage();
				
				if (RD.type == "image") {
					await message.react('⏳');
					try {
						const media = await RD.downloadMedia();
						client.sendMessage(message.from, media, {
							sendMediaAsSticker: true,
							stickerName: config.name, 
							stickerAuthor: config.author 
						}).then(async () => {
							await message.react('✅');
						});
					} catch {
						await message.react('❌');
					}
				}  else if (RD.type == "sticker") {
					await message.react('⏳');
					try {
						const media = await RD.downloadMedia();
						client.sendMessage(message.from, media).then(async () => {
							await message.react('✅');
						});  
					} catch {
						await message.react('❌');
					}
				} else {
					client.getChatById(message.id.remote).then(async (chat) => {
						await chat.sendSeen();
					});
				}
			}
		}catch(e){
			console.log(e);
		}
	}
});

client.on('message', async message => {
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
	  
	let Admins = JSON.parse(fs.readFileSync('admin.json'));
	let contact = await message.getContact();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsAdmin = chkN(Admins,contact.number);
	console.log(contact.number);
  let config = {
    name: contact.pushname,
    author: "YzyzBot"
    }
	
	if(IsAdmin) {
		try{
			if(message.body.toLowerCase() === "اسرق"){
			const RD = await message.getQuotedMessage();
			if (RD.type == "sticker") {
				await message.react('⏳');
				try {
						const media = await RD.downloadMedia();
						client.sendMessage(message.from, media, {
							sendMediaAsSticker: true,
							stickerName: config.name, 
							stickerAuthor: config.author 
						}).then(async () => {
							await message.react('✅');
						});
				} catch(e) {
          console.log(e);
					await message.react('❌');
				}
			}}

		}catch(e){
			console.log(e);
		}
	}
});

client.on('message', async message => {
	let chta = JSON.parse(fs.readFileSync('chats.json'));
	let chat = await message.getChat();
	function chkN(arr, str) {
	return arr.includes(str);
  }
	let IsEnable = chkN(chta,chat.id._serialized);
	
	if(IsEnable) {
		const replyss = fs.readFileSync('replys.json');
        let replys = JSON.parse(replyss);

        let jsonData = fs.readFileSync('replys.json');
        let data = JSON.parse(jsonData);
        data.contacts = data.contacts || {};
        const RD = await message.getQuotedMessage();
        let mesg = 'قم بالرد على هذة الرسالة بالكلمة المطلوبة ثم انزل سطر و قم بوضع الرد';
        let contact = await message.getContact();
        let num = contact.number;
        let msg = message.body;
        try{
        client.sendMessage(message.from ,replys['contacts'][num][msg]);

        }catch(e){
            console.log('er hhhhh');
        }
        if(msg === 'رد'){
            if(!data.contacts[num]){
                data.contacts[num] = {}
                }
            client.sendMessage(message.from ,mesg);
        }
        let ms1 ;
        let ms2 ;
        if(message.hasQuotedMsg){
            let tst = RD.body;
            if(tst===mesg){
            let savew = message.body;
            let line = savew.split("\n");
             ms1 = line[0];
             ms2 = line[1];
             if(ms1.endsWith(' ')){
                ms1 = ms1.slice(0, -1);
             }
            if(!data.contacts[num]){
                data.contacts[num] = {}
            }
            Object.assign(data.contacts[num], { [ms1]: ms2 });
            let modifiedData = JSON.stringify(data);
            fs.writeFileSync('replys.json', modifiedData);
            client.sendMessage(message.from ,`تم اضافة الرد بنجاح \n\n الكلمة: *"${ms1}"* \n الرد : *"${ms2}"*`);
            
        }}
		try{
			let config = {
				name: contact.pushname,
				author: "YzyzBot"
			  }
			if (message.body.toLowerCase() === "s") {
				if (message.type == "image") {
					await message.react('⏳');
					try {
						const media = await message.downloadMedia();
						client.sendMessage(message.from, media, {
							sendMediaAsSticker: true,
							stickerName: config.name, 
							stickerAuthor: config.author 
						}).then(async () => {
							await message.react('✅');
						});
					} catch {
						await message.react('❌');
					}
				} else {
					client.getChatById(message.id.remote).then(async (chat) => {
						await chat.sendSeen();
					});
				}
			}
		}catch(e){
			console.log(e);
		}
	}
});





client.initialize();