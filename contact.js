import { MVContactBot } from "mvcontact-bot";

const configData = await Bun.file("./config.json").json();

const WorldTrackBot = new MVContactBot(configData);

export async function runBot() {
    await WorldTrackBot.login()
        .catch(err => {console.error(err);}
    );

    await WorldTrackBot.start()
        .catch(err => {console.error(err);}
    );
}

WorldTrackBot.on("receiveRawMessage", (messageData) => {
    if (messageData.messageType == "SessionInvite"){
        
    }
});